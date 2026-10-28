/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { KitchenScreen } from './components/KitchenScreen';
import { FoodRescueScreen } from './components/FoodRescueScreen';
import { ImpactScreen } from './components/ImpactScreen';

import { ListSurplusModal } from './components/modals/ListSurplusModal';
import { ScanLabelModal } from './components/modals/ScanLabelModal';
import { HandoverModal } from './components/modals/HandoverModal';
import { PickupHoursModal } from './components/modals/PickupHoursModal';
import { CertificateModal } from './components/modals/CertificateModal';
import { AddItemModal } from './components/modals/AddItemModal';

import {
  TabType,
  RoleMode,
  InventoryItem,
  RescueBatch,
  SafetyAlert,
} from './types/rescue';
import {
  INITIAL_INVENTORY,
  INITIAL_RESCUE_BATCHES,
  INITIAL_ALERTS,
} from './data/seedData';
import { advanceHandoff, SafetyChecklistState } from './utils/rescueLogic';
import { CheckCircle2, Bell } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [roleMode, setRoleMode] = useState<RoleMode>('staff');

  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [batches, setBatches] = useState<RescueBatch[]>(INITIAL_RESCUE_BATCHES);
  const [alerts, setAlerts] = useState<SafetyAlert[]>(INITIAL_ALERTS);

  // Modal visibility states
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isPickupHoursModalOpen, setIsPickupHoursModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isPdfView, setIsPdfView] = useState(false);

  const [selectedHandoverBatch, setSelectedHandoverBatch] = useState<RescueBatch | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleRole = () => {
    setRoleMode((prev) => {
      const nextRole = prev === 'staff' ? 'charity' : 'staff';
      showToast(
        nextRole === 'staff'
          ? 'Switched to Kitchen Staff View'
          : 'Switched to Charity Shelter View'
      );
      return nextRole;
    });
  };

  const handleRescueItem = (item: InventoryItem) => {
    // Open listing modal or directly stage
    setIsListModalOpen(true);
    showToast(`Prepared "${item.name}" for Food Rescue listing.`);
  };

  const handlePublishQuickList = (checklist: SafetyChecklistState) => {
    // Publish Batch B-408 to network
    const newBatch: RescueBatch = {
      id: `batch-${Date.now()}`,
      batchNumber: 'B-408',
      title: 'Fresh Croissants & Pastries Box',
      shortTitle: 'Fresh Croissants & ...',
      quantityUnits: '18 units • Surplus morning display',
      sourceNote: 'Bakery run: 06:00 AM • Verified compliant',
      category: 'Bakery & Breads',
      storageProtocol: 'Bakery / Ambient',
      pickupWindow: 'Today 3:30 - 5:00 PM',
      timeRemaining: '1h 30m remaining',
      status: 'active',
      handoffStage: 1,
      listedTime: 'Just now',
      portionEstimate: '18 breakfast units',
      image:
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
    };

    setBatches((prev) => [newBatch, ...prev]);
    showToast('Batch #B-408 published to 3 verified shelters!');
  };

  const handleReserveBatch = (batchId: string) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id === batchId) {
          return {
            ...advanceHandoff(b),
            reservedBy: {
              name: 'City Hope Shelter',
              shelterName: 'City Hope Shelter',
              volunteer: 'David M.',
              volunteerId: 'ID: #CH-402',
              phone: '+1 (555) 890-1234',
              avatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
              distanceKm: 2.1,
            },
          };
        }
        return b;
      })
    );
    showToast('Batch reserved for City Hope Shelter! Pickup window is active.');
  };

  const handleConfirmHandoff = (batchId: string) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id === batchId) {
          return advanceHandoff(b);
        }
        return b;
      })
    );

    const newAlert: SafetyAlert = {
      id: `alert-${Date.now()}`,
      title: 'Handover Verified & Archived',
      timeLabel: 'Just now',
      type: 'verified',
      description: `Surplus custody safely transferred to volunteer driver. Receipt #WB-${Math.floor(
        1000 + Math.random() * 9000
      )} signed & archived.`,
    };

    setAlerts((prev) => [newAlert, ...prev]);
    showToast('Handover confirmed! Receipt signed and logged.');
  };

  const handleBoostAlert = (batchId: string) => {
    showToast('Surplus priority alert dispatched to 3 partner shelters!');
  };

  const handleContactVolunteer = (name: string, phone: string) => {
    showToast(`Connecting call to volunteer ${name} (${phone})...`);
  };

  const handleAddBatch = (newBatch: Partial<RescueBatch>) => {
    const fullBatch: RescueBatch = {
      id: `batch-${Date.now()}`,
      batchNumber: `B-${Math.floor(412 + Math.random() * 50)}`,
      title: newBatch.title || 'Surplus Food Batch',
      shortTitle: newBatch.shortTitle || newBatch.title || 'Surplus Batch',
      quantityUnits: newBatch.quantityUnits || '5 kg',
      sourceNote: newBatch.sourceNote || 'Kitchen batch',
      category: newBatch.category || 'Bakery & Breads',
      storageProtocol: newBatch.storageProtocol || 'Ambient',
      pickupWindow: newBatch.pickupWindow || 'Today 3:30 - 5:00 PM',
      timeRemaining: 'Active',
      status: 'active',
      handoffStage: 1,
      listedTime: 'Just now',
      image: newBatch.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    };

    setBatches((prev) => [fullBatch, ...prev]);
    showToast(`"${fullBatch.title}" listed for verified shelters!`);
  };

  const handleAddItem = (item: Partial<InventoryItem>) => {
    const fullItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      name: item.name || 'New Kitchen Item',
      shortName: item.shortName || item.name || 'New Item',
      category: item.category || 'Prepared Dishes',
      quantity: item.quantity || 1,
      unit: item.unit || 'kg',
      location: item.location || 'Walk-in Fridge',
      batchTimestamp: item.batchTimestamp || 'Batch: Today',
      expiryUrgency: item.expiryUrgency || 'today',
      expiryLabel: item.expiryLabel || 'Expires Tonight',
      storageProtocol: item.storageProtocol || 'Chilled (< 4°C)',
      status: 'in_kitchen',
      allergens: [],
      useItUpIdea: item.useItUpIdea || 'Chef family meal recommendation',
      image: item.image || 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
    };

    setInventory((prev) => [fullItem, ...prev]);
    showToast(`Added "${fullItem.name}" to Kitchen Inventory.`);
  };

  // Badge count for Food Rescue tab
  const activeRescueCount = batches.filter(
    (b) => b.status === 'active' || b.status === 'reserved'
  ).length;

  return (
    <div className="min-h-screen bg-[#f7fbeb] text-[#181d14] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        roleMode={roleMode}
        onToggleRole={handleToggleRole}
        onOpenPickupHours={() => setIsPickupHoursModalOpen(true)}
        activeTab={activeTab}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-md mx-auto pt-2">
        {activeTab === 'home' && (
          <HomeScreen
            inventory={inventory}
            batches={batches}
            alerts={alerts}
            onNavigateTab={setActiveTab}
            onOpenListModal={() => setIsListModalOpen(true)}
            onOpenHandoverModal={(batch) => setSelectedHandoverBatch(batch)}
            onBoostAlert={handleBoostAlert}
            onRescueItem={handleRescueItem}
            onContactVolunteer={handleContactVolunteer}
          />
        )}

        {activeTab === 'inventory' && (
          <KitchenScreen
            inventory={inventory}
            onOpenAddModal={() => setIsAddItemModalOpen(true)}
            onOpenScanModal={() => setIsScanModalOpen(true)}
            onRescueItem={handleRescueItem}
          />
        )}

        {activeTab === 'rescue' && (
          <FoodRescueScreen
            batches={batches}
            roleMode={roleMode}
            onToggleRole={handleToggleRole}
            onPublishQuickList={handlePublishQuickList}
            onOpenHandoverModal={(batch) => setSelectedHandoverBatch(batch)}
            onReserveBatch={handleReserveBatch}
            onContactVolunteer={handleContactVolunteer}
          />
        )}

        {activeTab === 'impact' && (
          <ImpactScreen
            onOpenPdfModal={() => {
              setIsPdfView(true);
              setIsCertificateModalOpen(true);
            }}
            onOpenCertificateModal={() => {
              setIsPdfView(false);
              setIsCertificateModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Floating Bottom Nav */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        rescueBadgeCount={activeRescueCount}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 inset-x-0 z-50 flex justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-[#2f3923] text-white px-4 py-2.5 rounded-full shadow-lg border border-[#455038] text-[12px] font-medium flex items-center space-x-2 pointer-events-auto">
            <CheckCircle2 className="w-4 h-4 text-[#d8e8c9] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Modals */}
      <ListSurplusModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onAddBatch={handleAddBatch}
      />

      <ScanLabelModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanResult={handleAddItem}
      />

      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onAddItem={handleAddItem}
      />

      <HandoverModal
        isOpen={selectedHandoverBatch !== null}
        batch={selectedHandoverBatch}
        onClose={() => setSelectedHandoverBatch(null)}
        onConfirmHandoff={handleConfirmHandoff}
      />

      <PickupHoursModal
        isOpen={isPickupHoursModalOpen}
        onClose={() => setIsPickupHoursModalOpen(false)}
      />

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        isPdfView={isPdfView}
      />
    </div>
  );
}
