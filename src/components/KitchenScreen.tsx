import React, { useState } from 'react';
import {
  PlusCircle,
  Scan,
  Calendar,
  Clock,
  Thermometer,
  Lightbulb,
  HandHeart,
  Archive,
  Leaf,
  CheckCircle2,
  Snowflake,
} from 'lucide-react';
import { InventoryItem } from '../types/rescue';

interface KitchenScreenProps {
  inventory: InventoryItem[];
  onOpenAddModal: () => void;
  onOpenScanModal: () => void;
  onRescueItem: (item: InventoryItem) => void;
}

export const KitchenScreen: React.FC<KitchenScreenProps> = ({
  inventory,
  onOpenAddModal,
  onOpenScanModal,
  onRescueItem,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | '2days' | 'week'>('all');

  const todayItems = inventory.filter((i) => i.expiryUrgency === 'today');
  const twoDayItems = inventory.filter((i) => i.expiryUrgency === '2days');
  const weekItems = inventory.filter((i) => i.expiryUrgency === 'week');

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-4 pt-2">
      {/* Title & Top Bar */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading font-bold text-[24px] text-[#181d14] tracking-tight leading-none">
              Kitchen Inventory
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fee9ce] text-[#784f22] border border-[#f0dac0]">
              DEMO DATA
            </span>
          </div>
          <p className="text-[12px] text-[#55624b] mt-1 leading-snug">
            Prioritizing commercial shelf-life & zero-waste kitchen prep
          </p>
        </div>
        <button
          className="p-2 rounded-xl bg-[#ebf0e0] hover:bg-[#e0e7d5] transition-colors text-[#2f3923] cursor-pointer"
          aria-label="View Kitchen Archive"
          title="Archive & History"
        >
          <Archive className="w-5 h-5" />
        </button>
      </div>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={onOpenAddModal}
          className="py-2.5 px-3 bg-[#2f3923] hover:bg-[#404434] transition-all text-white rounded-2xl font-semibold text-[13px] flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer active:scale-[0.99]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Item Manually</span>
        </button>
        <button
          onClick={onOpenScanModal}
          className="py-2.5 px-3 bg-[#f1f6e6] hover:bg-[#e5eada] transition-all text-[#2f3923] border border-[#c6c7bd]/60 rounded-2xl font-semibold text-[13px] flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer active:scale-[0.99]"
        >
          <Scan className="w-4 h-4 text-[#55624b]" />
          <span>Scan Label (Simulated)</span>
        </button>
      </div>

      {/* Filter Chips Horizontal Strip */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#2f3923] text-white shadow-xs'
              : 'bg-white text-[#55624b] border border-[#c6c7bd]/60 hover:bg-[#f1f6e6]'
          }`}
        >
          All ({inventory.length + 10})
        </button>
        <button
          onClick={() => setActiveFilter('today')}
          className={`shrink-0 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
            activeFilter === 'today'
              ? 'bg-[#2f3923] text-white shadow-xs'
              : 'bg-white text-[#55624b] border border-[#c6c7bd]/60 hover:bg-[#f1f6e6]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#c25e3e]"></span>
          <span>Expires Today ({todayItems.length + 1})</span>
        </button>
        <button
          onClick={() => setActiveFilter('2days')}
          className={`shrink-0 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
            activeFilter === '2days'
              ? 'bg-[#2f3923] text-white shadow-xs'
              : 'bg-white text-[#55624b] border border-[#c6c7bd]/60 hover:bg-[#f1f6e6]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#d97706]"></span>
          <span>In 2 Days ({twoDayItems.length + 2})</span>
        </button>
        <button
          onClick={() => setActiveFilter('week')}
          className={`shrink-0 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
            activeFilter === 'week'
              ? 'bg-[#2f3923] text-white shadow-xs'
              : 'bg-white text-[#55624b] border border-[#c6c7bd]/60 hover:bg-[#f1f6e6]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#455038]"></span>
          <span>This Week ({weekItems.length + 7})</span>
        </button>
      </div>

      {/* SECTION 1: Urgent • Expires Today */}
      {(activeFilter === 'all' || activeFilter === 'today') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c25e3e]"></span>
              <span className="font-heading font-semibold text-[14px] text-[#ba1a1a]">
                Urgent • Expires Today
              </span>
              <span className="text-[#55624b] text-[12px]">3 critical lots</span>
            </div>
            <span className="text-[11px] font-semibold text-[#c25e3e]">
              Action Required
            </span>
          </div>

          {/* Item 1: Cooked Jasmine Rice */}
          <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <img
                  src={todayItems[0]?.image}
                  alt="Cooked Jasmine Rice"
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#c6c7bd]/40"
                />
                <div>
                  <h3 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                    {todayItems[0]?.name || 'Cooked Jasmine Rice'}
                  </h3>
                  <p className="text-[12px] text-[#55624b] mt-0.5">
                    {todayItems[0]?.quantity} kg • {todayItems[0]?.location}
                  </p>
                  <p className="text-[11px] text-[#76786f] flex items-center space-x-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>Batch: Yesterday 2:00 PM</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold">
                End of Day
              </span>
            </div>

            {/* High-risk banner */}
            <div className="bg-[#f1f6e6] rounded-xl px-3 py-2 flex items-center space-x-2 text-[11px] text-[#2f3923] font-medium border border-[#e0e7d5]">
              <Thermometer className="w-3.5 h-3.5 text-[#455038] shrink-0" />
              <span>High-risk prepared food: Must maintain &lt; 4°C</span>
            </div>

            {/* Chef suggestion banner */}
            <div className="bg-[#fee9ce]/60 rounded-xl px-3 py-2 flex items-start space-x-2 text-[11px] text-[#524531] border border-[#f0dac0]">
              <Lightbulb className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-[#181d14]">Use-it-up Idea (Suggestion):</strong>{' '}
                Arancini rice balls special, fried rice batch, or staff family meal special.
              </span>
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center space-x-1 text-[#76786f] text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Est. rescue window: 4 hrs</span>
              </div>
              <button
                onClick={() => todayItems[0] && onRescueItem(todayItems[0])}
                className="flex items-center space-x-1.5 px-4 py-2 bg-[#2f3923] hover:bg-[#404434] text-white text-[12px] font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
              >
                <HandHeart className="w-3.5 h-3.5" />
                <span>Rescue This</span>
              </button>
            </div>
          </div>

          {/* Item 2: Artisan Butter Croissants */}
          <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <img
                  src={todayItems[1]?.image}
                  alt="Artisan Butter Croissants"
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#c6c7bd]/40"
                />
                <div>
                  <h3 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                    {todayItems[1]?.name || 'Artisan Butter Croissants'}
                  </h3>
                  <p className="text-[12px] text-[#55624b] mt-0.5">
                    {todayItems[1]?.quantity} pcs • {todayItems[1]?.location}
                  </p>
                  <p className="text-[11px] text-[#76786f] flex items-center space-x-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>Baked Today: 6:00 AM</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#fee9ce] text-[#784f22] text-[11px] font-bold">
                Expires Tonight
              </span>
            </div>

            {/* Chef suggestion banner */}
            <div className="bg-[#fee9ce]/60 rounded-xl px-3 py-2 flex items-start space-x-2 text-[11px] text-[#524531] border border-[#f0dac0]">
              <Lightbulb className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-[#181d14]">Use-it-up Idea (Suggestion):</strong>{' '}
                Almond croissant syrup rebake, baked savory bread pudding, or staff morning perk.
              </span>
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#55624b] text-[11px]">
                Ready for donation bundle
              </span>
              <button
                onClick={() => todayItems[1] && onRescueItem(todayItems[1])}
                className="flex items-center space-x-1.5 px-4 py-2 bg-[#2f3923] hover:bg-[#404434] text-white text-[12px] font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
              >
                <HandHeart className="w-3.5 h-3.5" />
                <span>Rescue This</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: Expires in 2 Days */}
      {(activeFilter === 'all' || activeFilter === '2days') && (
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]"></span>
              <span className="font-heading font-semibold text-[14px] text-[#181d14]">
                Expires in 2 Days
              </span>
              <span className="text-[#55624b] text-[12px]">4 items</span>
            </div>
            <span className="text-[11px] font-medium text-[#55624b]">
              Plan Ahead
            </span>
          </div>

          {/* Item 3: Barista Oat & Almond Milk */}
          <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <img
                  src={twoDayItems[0]?.image}
                  alt="Barista Oat & Almond Milk"
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#c6c7bd]/40"
                />
                <div>
                  <h3 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                    {twoDayItems[0]?.name || 'Barista Oat & Almond Milk'}
                  </h3>
                  <p className="text-[12px] text-[#55624b] mt-0.5">
                    {twoDayItems[0]?.quantity} cartons • {twoDayItems[0]?.storageProtocol}
                  </p>
                  <p className="text-[11px] text-[#76786f] flex items-center space-x-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>Best Before: Oct 26</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#d97706] text-[11px] font-bold">
                48h Left
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#55624b] text-[11px] flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-[#455038]" />
                <span>Sealed factory stock</span>
              </span>
              <button
                onClick={() => twoDayItems[0] && onRescueItem(twoDayItems[0])}
                className="flex items-center space-x-1.5 px-4 py-2 bg-[#f1f6e6] hover:bg-[#e0e7d5] text-[#2f3923] text-[12px] font-semibold rounded-full border border-[#c6c7bd]/60 transition-colors cursor-pointer"
              >
                <HandHeart className="w-3.5 h-3.5" />
                <span>Rescue This</span>
              </button>
            </div>
          </div>

          {/* Item 4: Fresh Romaine & Butter Lettuce */}
          <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <img
                  src={twoDayItems[1]?.image}
                  alt="Fresh Romaine & Butter Lettuce"
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#c6c7bd]/40"
                />
                <div>
                  <h3 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                    {twoDayItems[1]?.name || 'Fresh Romaine & Butter Lettuce'}
                  </h3>
                  <p className="text-[12px] text-[#55624b] mt-0.5">
                    {twoDayItems[1]?.quantity} kg • {twoDayItems[1]?.location}
                  </p>
                  <p className="text-[11px] text-[#76786f] flex items-center space-x-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>Farm Harvested: Oct 21</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#d97706] text-[11px] font-bold">
                In 2 Days
              </span>
            </div>

            {/* Chef suggestion banner */}
            <div className="bg-[#fee9ce]/60 rounded-xl px-3 py-2 flex items-start space-x-2 text-[11px] text-[#524531] border border-[#f0dac0]">
              <Lightbulb className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-[#181d14]">Use-it-up Idea (Suggestion):</strong>{' '}
                Cold green gazpacho base, roasted Caesar wedges, or juicing shots.
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#55624b] text-[11px]">
                High moisture content
              </span>
              <button
                onClick={() => twoDayItems[1] && onRescueItem(twoDayItems[1])}
                className="flex items-center space-x-1.5 px-4 py-2 bg-[#f1f6e6] hover:bg-[#e0e7d5] text-[#2f3923] text-[12px] font-semibold rounded-full border border-[#c6c7bd]/60 transition-colors cursor-pointer"
              >
                <HandHeart className="w-3.5 h-3.5" />
                <span>Rescue This</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: This Week (Safe) */}
      {(activeFilter === 'all' || activeFilter === 'week') && (
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#455038]"></span>
              <span className="font-heading font-semibold text-[14px] text-[#181d14]">
                This Week (Safe)
              </span>
              <span className="text-[#55624b] text-[12px]">9 lots optimal</span>
            </div>
            <span className="text-[11px] font-medium text-[#455038]">
              Normal Status
            </span>
          </div>

          {/* Item 5: Marinated Chicken Breasts */}
          <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <img
                  src={weekItems[0]?.image}
                  alt="Marinated Chicken Breasts"
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#c6c7bd]/40"
                />
                <div>
                  <h3 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                    {weekItems[0]?.name || 'Marinated Chicken Breasts'}
                  </h3>
                  <p className="text-[12px] text-[#55624b] mt-0.5">
                    {weekItems[0]?.quantity} kg • {weekItems[0]?.location}
                  </p>
                  <p className="text-[11px] text-[#76786f] flex items-center space-x-1 mt-0.5">
                    <Snowflake className="w-3 h-3 text-[#55624b]" />
                    <span>Herb & Citrus vacuum sealed</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d8e8c9] text-[#2f3923] text-[11px] font-bold">
                5 Days Left
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#55624b] text-[11px]">
                Thaw window: 12 hrs
              </span>
              <button
                onClick={() => weekItems[0] && onRescueItem(weekItems[0])}
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-[#f1f6e6] text-[#2f3923] text-[11px] font-semibold rounded-full border border-[#c6c7bd]/60 transition-colors cursor-pointer"
              >
                <span>Pre-list Rescue</span>
              </button>
            </div>
          </div>

          {/* Item 6: Whole Milk Yogurt Tubs */}
          <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <img
                  src={weekItems[1]?.image}
                  alt="Whole Milk Yogurt Tubs"
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#c6c7bd]/40"
                />
                <div>
                  <h3 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                    {weekItems[1]?.name || 'Whole Milk Yogurt Tubs'}
                  </h3>
                  <p className="text-[12px] text-[#55624b] mt-0.5">
                    {weekItems[1]?.quantity} units (1 kg ea) • {weekItems[1]?.location}
                  </p>
                  <p className="text-[11px] text-[#76786f] flex items-center space-x-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#455038]" />
                    <span>Unopened commercial seal</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d8e8c9] text-[#2f3923] text-[11px] font-bold">
                6 Days Left
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#55624b] text-[11px]">
                High par stock
              </span>
              <button
                onClick={() => weekItems[1] && onRescueItem(weekItems[1])}
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-[#f1f6e6] text-[#2f3923] text-[11px] font-semibold rounded-full border border-[#c6c7bd]/60 transition-colors cursor-pointer"
              >
                <span>Pre-list Rescue</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Weekly Rescue Streak Banner */}
      <div className="bg-[#ebf0e0] rounded-2xl p-3.5 border border-[#d8e0ce] flex items-start space-x-3 mt-3">
        <div className="w-7 h-7 rounded-full bg-[#d8e8c9] text-[#2f3923] flex items-center justify-center shrink-0 mt-0.5">
          <Leaf className="w-4 h-4 text-[#455038]" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-[13px] text-[#181d14]">
            Weekly Rescue Streak: 100%
          </h3>
          <p className="text-[12px] text-[#55624b] mt-0.5 leading-snug">
            Zero organic waste logged to compost this week. Sunrise Café is on track for City Green Partner certification.
          </p>
        </div>
      </div>
    </div>
  );
};
