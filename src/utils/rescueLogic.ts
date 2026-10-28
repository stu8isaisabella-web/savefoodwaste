import { InventoryItem, RescueBatch, ExpiryUrgency } from '../types/rescue';

export interface SafetyChecklistState {
  storedSafeTemp: boolean;
  strictUseByPassed: boolean;
  sealedFoodPackaging: boolean;
  allergensDeclared: boolean;
}

export function filterInventoryByUrgency(
  items: InventoryItem[],
  filter: 'all' | 'today' | '2days' | 'week'
): InventoryItem[] {
  if (filter === 'all') return items;
  return items.filter((item) => item.expiryUrgency === filter);
}

export function filterRescueBatches(
  batches: RescueBatch[],
  filter: 'active' | 'reserved' | 'collected'
): RescueBatch[] {
  return batches.filter((b) => b.status === filter);
}

export function advanceHandoff(batch: RescueBatch): RescueBatch {
  if (batch.status === 'active') {
    return {
      ...batch,
      status: 'reserved',
      handoffStage: 2,
      reservedTime: '1:15 PM',
    };
  }
  if (batch.status === 'reserved') {
    return {
      ...batch,
      status: 'collected',
      handoffStage: 3,
      collectedTime: '3:45 PM',
    };
  }
  return batch;
}

export function validateSafetyChecklist(checklist: SafetyChecklistState): boolean {
  return (
    checklist.storedSafeTemp &&
    checklist.strictUseByPassed &&
    checklist.sealedFoodPackaging &&
    checklist.allergensDeclared
  );
}

export function getCheckedCount(checklist: SafetyChecklistState): number {
  return Object.values(checklist).filter(Boolean).length;
}

export function formatWeight(kg: number): string {
  return `${kg.toFixed(1).replace(/\.0$/, '')} kg`;
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function calculateSummaryTotals(
  baseMeals: number,
  baseKg: number,
  baseValue: number,
  baseCo2: number,
  additionalBatchesCount: number
) {
  const mealMultiplier = 20; // ~20 meals per rescue batch
  const kgMultiplier = 9.5; // ~9.5 kg average batch
  const valueMultiplier = 50; // ~$50 per batch
  const co2Multiplier = 24; // ~24 kg CO2e per batch

  return {
    mealsRescued: baseMeals + additionalBatchesCount * mealMultiplier,
    savedLandfillKg: +(baseKg + additionalBatchesCount * kgMultiplier).toFixed(1),
    estimatedValueUsd: baseValue + additionalBatchesCount * valueMultiplier,
    co2AvoidedKg: Math.round(baseCo2 + additionalBatchesCount * co2Multiplier),
  };
}
