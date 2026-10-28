import React, { useState } from 'react';
import { X, PlusCircle, Thermometer, Clock } from 'lucide-react';
import { FoodCategory, InventoryItem, ExpiryUrgency } from '../../types/rescue';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Partial<InventoryItem>) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Prepared Dishes');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [location, setLocation] = useState('Fridge (Chiller 2)');
  const [urgency, setUrgency] = useState<ExpiryUrgency>('today');
  const [useItUpIdea, setUseItUpIdea] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quantity) return;

    onAddItem({
      name,
      shortName: name.length > 20 ? name.slice(0, 18) + '...' : name,
      category,
      quantity: parseFloat(quantity),
      unit,
      location,
      batchTimestamp: 'Batch: Today ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expiryUrgency: urgency,
      expiryLabel: urgency === 'today' ? 'End of Day' : urgency === '2days' ? 'In 2 Days' : '5 Days Left',
      storageProtocol: location.includes('Chiller') || location.includes('Fridge') ? 'Chilled (< 4°C)' : 'Ambient',
      useItUpIdea: useItUpIdea || 'Chef family meal or daily special rotation.',
      status: 'in_kitchen',
      allergens: [],
      image:
        category === 'Prepared Dishes'
          ? 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80'
          : category === 'Bakery & Breads'
          ? 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'
          : category === 'Produce & Greens'
          ? 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-[#e5eada] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f1f6e6] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#2f3923] text-white flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-[17px] text-[#181d14]">
                Add Kitchen Inventory Lot
              </h2>
              <p className="text-[11px] text-[#55624b]">
                Log batch shelf life and zero-waste suggestions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1f6e6] hover:bg-[#e5eada] text-[#55624b] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#181d14] mb-1">
              Ingredient / Prepared Item Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Steamed Basmati Rice, Herb Focaccia..."
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
                <option value="Prepared Dishes">Prepared Dishes</option>
                <option value="Bakery & Breads">Bakery & Breads</option>
                <option value="Produce & Greens">Produce & Greens</option>
                <option value="Dairy & Pantry">Dairy & Pantry</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#181d14] mb-1">
                Quantity
              </label>
              <div className="flex space-x-1.5">
                <input
                  type="number"
                  step="0.1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 3.5"
                  className="w-20 px-2 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="flex-1 px-2 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
                >
                  <option value="kg">kg</option>
                  <option value="units">units</option>
                  <option value="pcs">pcs</option>
                  <option value="cartons">cartons</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[12px] font-semibold text-[#181d14] mb-1">
                Location in Kitchen
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Walk-in Pan #2"
                className="w-full px-3 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#181d14] mb-1">
                Shelf-Life Urgency
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as ExpiryUrgency)}
                className="w-full px-3 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
              >
                <option value="today">Expires Today</option>
                <option value="2days">Expires in 2 Days</option>
                <option value="week">Safe This Week</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#181d14] mb-1">
              Chef Use-it-up Idea (Zero Waste Suggestion)
            </label>
            <input
              type="text"
              value={useItUpIdea}
              onChange={(e) => setUseItUpIdea(e.target.value)}
              placeholder="e.g. Arancini rice balls, roasted croutons..."
              className="w-full px-3 py-2 bg-[#f4efe6] border border-[#c6c7bd]/50 rounded-xl text-[13px] text-[#181d14] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f3923]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#2f3923] hover:bg-[#404434] text-white font-heading font-semibold text-[14px] rounded-full shadow-xs transition-colors cursor-pointer mt-2"
          >
            Add to Kitchen Inventory
          </button>
        </form>
      </div>
    </div>
  );
};
