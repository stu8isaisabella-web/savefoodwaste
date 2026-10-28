import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Phone,
  PlusCircle,
  ShieldCheck,
  Leaf,
  Share2,
  CheckCircle2,
  QrCode,
  Sparkles,
} from 'lucide-react';
import {
  InventoryItem,
  RescueBatch,
  SafetyAlert,
  TabType,
} from '../types/rescue';

interface HomeScreenProps {
  inventory: InventoryItem[];
  batches: RescueBatch[];
  alerts: SafetyAlert[];
  onNavigateTab: (tab: TabType) => void;
  onOpenListModal: () => void;
  onOpenHandoverModal: (batch: RescueBatch) => void;
  onBoostAlert: (batchId: string) => void;
  onRescueItem: (item: InventoryItem) => void;
  onContactVolunteer: (volunteerName: string, phone: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  inventory,
  batches,
  alerts,
  onNavigateTab,
  onOpenListModal,
  onOpenHandoverModal,
  onBoostAlert,
  onRescueItem,
  onContactVolunteer,
}) => {
  // Urgent items needing action
  const urgentItems = inventory.slice(0, 3);
  // Pickups due today
  const activeBatches = batches.filter(
    (b) => b.status === 'reserved' || b.status === 'active'
  );

  return (
    <div className="space-y-5 pb-24 max-w-md mx-auto px-4 pt-2">
      {/* 3 Items Need Action Today Card */}
      <section className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15">
        <div className="flex items-start justify-between mb-3.5">
          <div className="flex items-start space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#faece7] text-[#c25e3e] flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-[17px] text-[#181d14] tracking-tight leading-snug">
                3 Items Need Action Today
              </h2>
              <p className="text-[12px] text-[#55624b] leading-tight mt-0.5">
                Expiring before close or reaching batch safety window
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="shrink-0 flex items-center space-x-1 px-3 py-1.5 bg-[#2f3923] hover:bg-[#404434] transition-colors text-white text-[11px] font-semibold rounded-full shadow-xs cursor-pointer"
          >
            <span>Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item 1 */}
        <div className="space-y-2.5">
          <div className="bg-[#f7fbeb] rounded-2xl p-2.5 flex items-center justify-between border border-[#e5eada]">
            <div className="flex items-center space-x-3 min-w-0">
              <img
                src={urgentItems[0]?.image}
                alt={urgentItems[0]?.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#c6c7bd]/30"
              />
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a]">
                    CRITICAL
                  </span>
                  <p className="font-heading font-semibold text-[13px] text-[#181d14] truncate">
                    {urgentItems[0]?.shortName || 'Cooked Jasmine Rice'}
                  </p>
                </div>
                <p className="text-[11px] text-[#55624b] mt-0.5 truncate">
                  5.0 kg • Walk-in Pan #2 •{' '}
                  <span className="text-[#ba1a1a] font-medium">Expires today (4h left)</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => urgentItems[0] && onRescueItem(urgentItems[0])}
              className="shrink-0 ml-2 px-3 py-1.5 bg-white hover:bg-[#f1f6e6] transition-colors rounded-full border border-[#c6c7bd]/70 text-[11px] font-semibold text-[#181d14] shadow-xs cursor-pointer"
            >
              Log / Rescue
            </button>
          </div>

          {/* Item 2 */}
          <div className="bg-[#f7fbeb] rounded-2xl p-2.5 flex items-center justify-between border border-[#e5eada]">
            <div className="flex items-center space-x-3 min-w-0">
              <img
                src={urgentItems[1]?.image}
                alt={urgentItems[1]?.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#c6c7bd]/30"
              />
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#fee9ce] text-[#784f22]">
                    TODAY
                  </span>
                  <p className="font-heading font-semibold text-[13px] text-[#181d14] truncate">
                    {urgentItems[1]?.shortName || 'Fresh Butter Croissants...'}
                  </p>
                </div>
                <p className="text-[11px] text-[#55624b] mt-0.5 truncate">
                  18 units • Counter Basket • End of shift
                </p>
              </div>
            </div>
            <span className="shrink-0 ml-2 px-3 py-1.5 bg-white text-[11px] font-semibold text-[#55624b] rounded-full border border-[#c6c7bd]/60 shadow-xs">
              Listed
            </span>
          </div>

          {/* Item 3 */}
          <div className="bg-[#f7fbeb] rounded-2xl p-2.5 flex items-center justify-between border border-[#e5eada]">
            <div className="flex items-center space-x-3 min-w-0">
              <img
                src={urgentItems[2]?.image}
                alt={urgentItems[2]?.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#c6c7bd]/30"
              />
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#d8e8c9] text-[#2f3923]">
                    2 DAYS
                  </span>
                  <p className="font-heading font-semibold text-[13px] text-[#181d14] truncate">
                    {urgentItems[2]?.shortName || 'Barista Oat Milk...'}
                  </p>
                </div>
                <p className="text-[11px] text-[#55624b] mt-0.5 truncate">
                  12 cartons • Dry Bar Storage
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('inventory')}
              className="shrink-0 ml-2 px-3 py-1.5 bg-white hover:bg-[#f1f6e6] transition-colors rounded-full border border-[#c6c7bd]/70 text-[11px] font-semibold text-[#181d14] shadow-xs cursor-pointer"
            >
              Prioritize
            </button>
          </div>
        </div>
      </section>

      {/* Pickups Due Today Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-[17px] text-[#181d14] tracking-tight">
              Pickups Due Today
            </h2>
            <p className="text-[12px] text-[#55624b]">
              2 active community rescue batches
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#d8e8c9] text-[#2f3923] text-[11px] font-semibold border border-[#bccbae]">
            2 active
          </span>
        </div>

        {/* Pickup Card 1: Artisan Croissants (Reserved) */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={batches[2]?.image || batches[0]?.image}
                alt="Artisan Croissants"
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#c6c7bd]/30"
              />
              <div>
                <h3 className="font-heading font-semibold text-[14px] text-[#181d14]">
                  Artisan Croissants & Pastries Box
                </h3>
                <p className="text-[11px] text-[#55624b]">
                  18 units • Safe temp verified (Ambient)
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#d8e8c9] text-[#2f3923] text-[11px] font-bold">
              Reserved
            </span>
          </div>

          {/* Charity detail container */}
          <div className="bg-[#f7fbeb] rounded-2xl p-3 border border-[#e5eada] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5 font-medium text-[#181d14]">
                <Leaf className="w-3.5 h-3.5 text-[#455038]" />
                <span className="font-semibold text-[12px]">Hope Community Food Bank</span>
              </div>
              <span className="text-[11px] font-medium text-[#55624b]">
                Pickup in 1h 15m
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#55624b] text-white flex items-center justify-center text-[10px] font-bold">
                  MD
                </div>
                <span className="text-[12px] text-[#181d14] font-medium">
                  Marcus D. (Volunteer)
                </span>
              </div>
              <button
                onClick={() =>
                  onContactVolunteer('Marcus D.', '+1 (555) 234-8910')
                }
                className="flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-[#f1f6e6] transition-colors rounded-full border border-[#c6c7bd]/70 text-[11px] font-semibold text-[#181d14] shadow-xs cursor-pointer"
              >
                <Phone className="w-3 h-3 text-[#55624b]" />
                <span>Contact</span>
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center space-x-1 text-[#55624b] text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              <span>Slot: 3:30 PM – 5:00 PM</span>
            </div>
            <button
              onClick={() => onOpenHandoverModal(batches[2] || batches[0])}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#2f3923] hover:bg-[#404434] text-white text-[12px] font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Hand Over & Scan</span>
            </button>
          </div>
        </div>

        {/* Pickup Card 2: Organic Crisp Lettuce (Awaiting Claim) */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={batches[3]?.image || inventory[3]?.image}
                alt="Organic Crisp Lettuce"
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#c6c7bd]/30"
              />
              <div>
                <h3 className="font-heading font-semibold text-[14px] text-[#181d14]">
                  Organic Crisp Lettuce & Microgreens
                </h3>
                <p className="text-[11px] text-[#55624b]">
                  4.0 kg • Chilled storage (3°C)
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#fee9ce] text-[#784f22] text-[11px] font-bold">
              Awaiting Claim
            </span>
          </div>

          <div className="bg-[#f7fbeb] rounded-2xl p-3 border border-[#e5eada] flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-[11px] text-[#55624b]">
              <Clock className="w-3.5 h-3.5" />
              <span>Available for pickup until 7:00 PM</span>
            </div>
            <button
              onClick={() => onBoostAlert('batch-4')}
              className="px-3.5 py-1.5 bg-white hover:bg-[#f1f6e6] transition-colors rounded-full border border-[#c6c7bd]/70 text-[11px] font-semibold text-[#181d14] shadow-xs cursor-pointer flex items-center space-x-1"
            >
              <Share2 className="w-3 h-3 text-[#55624b]" />
              <span>Boost Alert</span>
            </button>
          </div>
        </div>
      </section>

      {/* Primary Action Button: List New Surplus Food */}
      <button
        onClick={onOpenListModal}
        className="w-full py-3.5 px-4 bg-[#2f3923] hover:bg-[#404434] transition-all duration-200 text-white rounded-full font-heading font-semibold text-[15px] flex items-center justify-center space-x-2 shadow-[0_4px_16px_-2px_rgba(47,57,35,0.25)] cursor-pointer active:scale-[0.99]"
      >
        <PlusCircle className="w-5 h-5" />
        <span>List New Surplus Food</span>
      </button>

      {/* Kitchen Log & Safety Alerts Section */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-[16px] text-[#181d14] tracking-tight">
            Kitchen Log & Safety Alerts
          </h2>
          <span className="text-[11px] text-[#55624b]">Updated 5m ago</span>
        </div>

        {/* Alert 1 */}
        <div className="bg-[#f1f6e6] rounded-2xl p-3.5 border border-[#e0e7d5] flex items-start space-x-3">
          <div className="w-7 h-7 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-[13px] text-[#181d14]">
                48h Safety Limit Approaching
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fee9ce] text-[#784f22]">
                9:00 PM
              </span>
            </div>
            <p className="text-[12px] text-[#55624b] mt-1 leading-snug">
              Cooked Chicken Breasts (3.5kg) in Walk-in Chiller reaches 48h shelf life tonight. List before 6:00 PM for compliant cold-chain handover.
            </p>
          </div>
        </div>

        {/* Alert 2 */}
        <div className="bg-[#f1f6e6] rounded-2xl p-3.5 border border-[#e0e7d5] flex items-start space-x-3">
          <div className="w-7 h-7 rounded-full bg-[#d8e8c9] text-[#2f3923] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-[13px] text-[#181d14]">
                Handover Verified
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#d8e8c9] text-[#2f3923]">
                11:20 AM
              </span>
            </div>
            <p className="text-[12px] text-[#55624b] mt-1 leading-snug">
              St. Jude Shelter verified receipt of Morning Bagels (5kg). Receipt #WB-8492 archived.
            </p>
          </div>
        </div>
      </section>

      {/* Weekly Rescue Impact Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-[16px] text-[#181d14] tracking-tight">
              Weekly Rescue Impact
            </h2>
            <p className="text-[12px] text-[#55624b]">
              Sunrise Café cumulative estimates (Past 7 days)
            </p>
          </div>
          <Leaf className="w-4 h-4 text-[#455038]" />
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#f1f6e6] rounded-2xl p-3 text-center border border-[#e0e7d5]">
            <p className="font-heading font-bold text-[18px] text-[#181d14] leading-tight">
              48kg
            </p>
            <p className="text-[11px] font-medium text-[#55624b] mt-0.5">
              Food Rescued
            </p>
            <span className="text-[10px] text-[#76786f] block mt-0.5">
              ~96 meals
            </span>
          </div>

          <div className="bg-[#f1f6e6] rounded-2xl p-3 text-center border border-[#e0e7d5]">
            <p className="font-heading font-bold text-[18px] text-[#181d14] leading-tight">
              $240
            </p>
            <p className="text-[11px] font-medium text-[#55624b] mt-0.5">
              Cost Salvaged
            </p>
            <span className="text-[10px] text-[#76786f] block mt-0.5">
              Est. value
            </span>
          </div>

          <div className="bg-[#f1f6e6] rounded-2xl p-3 text-center border border-[#e0e7d5]">
            <p className="font-heading font-bold text-[18px] text-[#181d14] leading-tight">
              120kg
            </p>
            <p className="text-[11px] font-medium text-[#55624b] mt-0.5">
              CO<sub className="text-[9px] -bottom-0.5">2</sub>e Avoided
            </p>
            <span className="text-[10px] text-[#76786f] block mt-0.5">
              Emissions
            </span>
          </div>
        </div>

        {/* UN SDG Alignment Tags */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#76786f]">
            United Nations SDG Alignment
          </p>
          <div className="flex flex-col space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#fee9ce]/60 border border-[#f0dac0] text-[11px] font-medium text-[#181d14]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]"></span>
              <span>SDG 2: Zero Hunger</span>
            </div>
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#fee9ce]/60 border border-[#f0dac0] text-[11px] font-medium text-[#181d14]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b58b27]"></span>
              <span>SDG 12: Responsible Consumption</span>
            </div>
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#d8e8c9]/60 border border-[#bccbae] text-[11px] font-medium text-[#181d14]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#455038]"></span>
              <span>SDG 13: Climate Action</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
