import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterInventoryByUrgency,
  filterRescueBatches,
  advanceHandoff,
  validateSafetyChecklist,
  getCheckedCount,
  formatWeight,
  formatCurrency,
  calculateSummaryTotals,
} from './rescueLogic';
import { InventoryItem, RescueBatch } from '../types/rescue';

const mockItemToday: InventoryItem = {
  id: '1',
  name: 'Cooked Jasmine Rice',
  shortName: 'Cooked Jasmine...',
  category: 'Prepared Dishes',
  quantity: 5.0,
  unit: 'kg',
  location: 'Fridge (Chiller 2)',
  batchTimestamp: 'Yesterday 2:00 PM',
  expiryUrgency: 'today',
  expiryLabel: 'End of Day',
  storageProtocol: 'Walk-in Chiller',
  status: 'in_kitchen',
  allergens: [],
  image: '/assets/sample.jpg',
};

const mockItem2Days: InventoryItem = {
  id: '2',
  name: 'Barista Oat Milk',
  shortName: 'Barista Oat...',
  category: 'Dairy & Pantry',
  quantity: 12,
  unit: 'cartons',
  location: 'Walk-in Fridge',
  batchTimestamp: 'Best Before: Oct 26',
  expiryUrgency: '2days',
  expiryLabel: '48h Left',
  storageProtocol: 'Chilled',
  status: 'in_kitchen',
  allergens: [],
  image: '/assets/sample.jpg',
};

test('filterInventoryByUrgency filters correctly', () => {
  const items = [mockItemToday, mockItem2Days];
  assert.equal(filterInventoryByUrgency(items, 'all').length, 2);
  assert.equal(filterInventoryByUrgency(items, 'today').length, 1);
  assert.equal(filterInventoryByUrgency(items, 'today')[0].id, '1');
  assert.equal(filterInventoryByUrgency(items, 'week').length, 0);
});

test('safety checklist validation requires all 4 criteria', () => {
  assert.equal(
    validateSafetyChecklist({
      storedSafeTemp: true,
      strictUseByPassed: true,
      sealedFoodPackaging: true,
      allergensDeclared: true,
    }),
    true
  );

  assert.equal(
    validateSafetyChecklist({
      storedSafeTemp: true,
      strictUseByPassed: false,
      sealedFoodPackaging: true,
      allergensDeclared: true,
    }),
    false
  );

  assert.equal(
    getCheckedCount({
      storedSafeTemp: true,
      strictUseByPassed: true,
      sealedFoodPackaging: false,
      allergensDeclared: false,
    }),
    2
  );
});

test('advanceHandoff advances active to reserved and reserved to collected', () => {
  const batch: RescueBatch = {
    id: 'b1',
    batchNumber: 'B-101',
    title: 'Morning Croissants',
    shortTitle: 'Croissants',
    quantityUnits: '18 units',
    sourceNote: 'Bakery surplus',
    category: 'Bakery & Breads',
    storageProtocol: 'Ambient',
    pickupWindow: 'Today 3:30 - 5:00 PM',
    timeRemaining: '1h 15m',
    status: 'active',
    handoffStage: 1,
    listedTime: '11:00 AM',
    image: '/assets/croissant.jpg',
  };

  const reserved = advanceHandoff(batch);
  assert.equal(reserved.status, 'reserved');
  assert.equal(reserved.handoffStage, 2);

  const collected = advanceHandoff(reserved);
  assert.equal(collected.status, 'collected');
  assert.equal(collected.handoffStage, 3);
});

test('formatting utilities format weights and currencies properly', () => {
  assert.equal(formatWeight(5), '5 kg');
  assert.equal(formatWeight(156.4), '156.4 kg');
  assert.equal(formatCurrency(840), '$840.00');
  assert.equal(formatCurrency(24.5), '$24.50');
});

test('calculateSummaryTotals increments values consistently', () => {
  const totals = calculateSummaryTotals(312, 156.4, 840, 391, 1);
  assert.equal(totals.mealsRescued, 332);
  assert.equal(totals.savedLandfillKg, 165.9);
  assert.equal(totals.estimatedValueUsd, 890);
  assert.equal(totals.co2AvoidedKg, 415);
});
