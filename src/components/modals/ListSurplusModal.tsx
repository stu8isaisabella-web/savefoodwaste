import React, { useState } from 'react';
import { X, Check, ShieldCheck, Clock, Share2, AlertCircle } from 'lucide-react';
import { FoodCategory, RescueBatch } from '../../types/rescue';
import { SafetyChecklistState, getCheckedCount } from '../../utils/rescueLogic';

interface ListSurplusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBatch: (batch: Partial<RescueBatch>) => void;
}

export const ListSurplusModal: React.FC<ListSurplusModalProps> = ({
  isOpen,
  onClose,
  onAddBatch,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Bakery & Breads');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('units');
  const [storageProtocol, setStorageProtocol] = useState('Bakery / Ambient');
  const [pickupWindow, setPickupWindow] = useState('Today 3:30 - 5:00 PM');
  const [checklist, setChecklist] = useState<SafetyChecklistState>({
    storedSafeTemp: true,
    strictUseByPassed: true,
    sealedFoodPackaging: true,
    allergensDeclared: true,
  });

  if (!isOpen) return null;

  const checkedCount = getCheckedCount(checklist);
  const isFullyChecked = checkedCount === 4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !quantity || !isFullyChecked) return;

    onAddBatch({
      title,
      shortTitle: title.length > 22 ? title.slice(0, 20) + '...' : title,
      category,
      quantityUnits: `${quantity} ${unit} • Safe temp verified`,
      sourceNote: `Kitchen batch prep • Verified compliant`,
      storageProtocol,
      pickupWindow,
      timeRemaining: 'Pickup window active',
      status: 'active',
      handoffStage: 1,
      listedTime: 'Just now',
      image:
        category === 'Bakery & Breads'
          ? 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'
          : category === 'Prepared Dishes'
          ? 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=400&q=80'
          : category === 'Produce & Greens'
          ? 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    });
    onClose();
  };

  const toggleCheck = (key: keyof SafetyChecklistState) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-5 shadow-2xl border border-[#e5eada] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f1f6e6] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#2f3923] text-white flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-[17px] text-[#181d14]">
                List Surplus Food Batch
              </h2>
              <p className="text-[11px] text-[#55624b]">
                Publish to verified shelters on WiseBite
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1f6e6] hover:bg-[#e5eada] text-[#55624b] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[12px] font-semibold text-[#181d14] mb-1">
              Food Item or Batch Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sourdough Loaves, Cooked Brown Rice..."
              className="w-full px-3 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[12px] font-semibold text-[#181d14] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FoodCategory)}
                className="w-full px-3 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
              >
                <option value="Bakery & Breads">Bakery & Breads</option>
                <option value="Prepared Dishes">Prepared Dishes</option>
                <option value="Produce & Greens">Produce & Greens</option>
                <option value="Dairy & Pantry">Dairy & Pantry</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#181d14] mb-1">
                Quantity & Unit
              </label>
              <div className="flex space-x-1.5">
                <input
                  type="number"
                  step="0.5"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-20 px-2.5 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="flex-1 px-2.5 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
                >
                  <option value="units">units</option>
                  <option value="kg">kg</option>
                  <option value="cartons">cartons</option>
                  <option value="pcs">pcs</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[12px] font-semibold text-[#181d14] mb-1">
                Storage Protocol
              </label>
              <input
                type="text"
                value={storageProtocol}
                onChange={(e) => setStorageProtocol(e.target.value)}
                placeholder="e.g. Chilled (< 4°C)"
                className="w-full px-3 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#181d14] mb-1">
                Pickup Window
              </label>
              <input
                type="text"
                value={pickupWindow}
                onChange={(e) => setPickupWindow(e.target.value)}
                placeholder="e.g. Today 3:30 - 5:00 PM"
                className="w-full px-3 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
              />
            </div>
          </div>

          {/* Safety Verification Requirements */}
          <div className="bg-[#f7fbeb] rounded-2xl p-3 border border-[#e5eada] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#181d14] flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#455038]" />
                <span>Food Safety Checklist</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#d8e8c9] text-[#2f3923]">
                {checkedCount}/4
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.storedSafeTemp}
                  onChange={() => toggleCheck('storedSafeTemp')}
                  className="rounded text-[#2f3923] focus:ring-[#2f3923]"
                />
                <span className="text-[11px] text-[#181d14]">
                  Stored at safe temperature (&lt; 4°C or dry ambient)
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.strictUseByPassed}
                  onChange={() => toggleCheck('strictUseByPassed')}
                  className="rounded text-[#2f3923] focus:ring-[#2f3923]"
                />
                <span className="text-[11px] text-[#181d14]">
                  Within strict use-by date & sensory check passed
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.sealedFoodPackaging}
                  onChange={() => toggleCheck('sealedFoodPackaging')}
                  className="rounded text-[#2f3923] focus:ring-[#2f3923]"
                />
                <span className="text-[11px] text-[#181d14]">
                  Sealed in food-grade container / tamper evident
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.allergensDeclared}
                  onChange={() => toggleCheck('allergensDeclared')}
                  className="rounded text-[#2f3923] focus:ring-[#2f3923]"
                />
                <span className="text-[11px] text-[#181d14]">
                  Major food allergens clearly declared
                </span>
              </label>
            </div>
          </div>

          {!isFullyChecked && (
            <p className="text-[11px] text-[#ba1a1a] flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>All 4 food safety checkpoints must be validated before listing.</span>
            </p>
          )}

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={!isFullyChecked}
              className={`w-full py-3 px-4 rounded-full font-heading font-semibold text-[14px] flex items-center justify-center space-x-2 shadow-xs transition-colors cursor-pointer ${
                isFullyChecked
                  ? 'bg-[#2f3923] hover:bg-[#404434] text-white'
                  : 'bg-[#c6c7bd] text-white/80 cursor-not-allowed opacity-75'
              }`}
            >
              <span>Publish to Rescue Network</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
