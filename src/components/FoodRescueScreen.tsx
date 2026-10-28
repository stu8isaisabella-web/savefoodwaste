import React, { useState } from 'react';
import {
  Share2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Phone,
  QrCode,
  Check,
  CheckCircle2,
  Lock,
  Recycle,
  Building2,
  ChefHat,
  HeartHandshake,
  Sparkles,
  Info,
} from 'lucide-react';
import { RescueBatch, RoleMode } from '../types/rescue';
import { SafetyChecklistState, getCheckedCount } from '../utils/rescueLogic';

interface FoodRescueScreenProps {
  batches: RescueBatch[];
  roleMode: RoleMode;
  onToggleRole: () => void;
  onPublishQuickList: (checklist: SafetyChecklistState) => void;
  onOpenHandoverModal: (batch: RescueBatch) => void;
  onReserveBatch: (batchId: string) => void;
  onContactVolunteer: (name: string, phone: string) => void;
}

export const FoodRescueScreen: React.FC<FoodRescueScreenProps> = ({
  batches,
  roleMode,
  onToggleRole,
  onPublishQuickList,
  onOpenHandoverModal,
  onReserveBatch,
  onContactVolunteer,
}) => {
  const [feedFilter, setFeedFilter] = useState<'all' | 'active' | 'reserved' | 'collected'>('active');

  // Interactive 4-point safety verification checklist state
  const [checklist, setChecklist] = useState<SafetyChecklistState>({
    storedSafeTemp: true,
    strictUseByPassed: true,
    sealedFoodPackaging: true,
    allergensDeclared: true,
  });

  const checkedCount = getCheckedCount(checklist);
  const isFullyChecked = checkedCount === 4;

  const toggleCheck = (key: keyof SafetyChecklistState) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const activeCount = batches.filter((b) => b.status === 'active').length;
  const reservedCount = batches.filter((b) => b.status === 'reserved').length;
  const collectedCount = batches.filter((b) => b.status === 'collected').length;

  const filteredBatches = batches.filter((b) => {
    if (feedFilter === 'all') return true;
    return b.status === feedFilter;
  });

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-4 pt-2">
      {/* Title */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="font-heading font-bold text-[24px] text-[#181d14] tracking-tight leading-none">
            Food Rescue Hub
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fee9ce] text-[#784f22] border border-[#f0dac0]">
            Demo Data
          </span>
        </div>
        <p className="text-[12px] text-[#55624b] mt-1 leading-snug">
          Sunrise Café surplus redistribution & food safety handoff network
        </p>
      </div>

      {/* Switcher Pills (Staff View vs Charity View) */}
      <div className="grid grid-cols-2 gap-2 bg-[#ebf0e0] p-1 rounded-2xl border border-[#d8e0ce]">
        <button
          onClick={() => roleMode !== 'staff' && onToggleRole()}
          className={`py-2 px-3 rounded-xl font-semibold text-[12px] flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            roleMode === 'staff'
              ? 'bg-[#2f3923] text-white shadow-xs'
              : 'text-[#55624b] hover:text-[#181d14]'
          }`}
        >
          <ChefHat className="w-3.5 h-3.5" />
          <span>Staff View: List Surplus</span>
        </button>
        <button
          onClick={() => roleMode !== 'charity' && onToggleRole()}
          className={`py-2 px-3 rounded-xl font-semibold text-[12px] flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            roleMode === 'charity'
              ? 'bg-[#2f3923] text-white shadow-xs'
              : 'text-[#55624b] hover:text-[#181d14]'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Charity View: Rescue</span>
        </button>
      </div>

      {/* Active Mode Notice Banner */}
      <div className="bg-[#f1f6e6] rounded-2xl p-3 border border-[#e0e7d5] flex items-start space-x-2.5">
        <ShieldCheck className="w-4 h-4 text-[#455038] shrink-0 mt-0.5" />
        <div className="text-[12px] text-[#2f3923]">
          <strong className="font-semibold">
            Active Mode: {roleMode === 'staff' ? 'Sunrise Kitchen Staff' : 'Registered Charity Shelter'}
          </strong>
          <p className="text-[#55624b] mt-0.5 leading-snug">
            {roleMode === 'staff'
              ? 'Prepare kitchen surplus, log safety compliance, and confirm handoff with verified local shelters.'
              : 'Browse compliant kitchen surplus batches and reserve pickup slots for your shelter kitchen.'}
          </p>
        </div>
      </div>

      {/* Quick List Surplus Item Card (Staff mode) */}
      <section className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#d8e8c9] text-[#2f3923] flex items-center justify-center">
              <Share2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                Quick List Surplus Item
              </h2>
              <p className="text-[11px] text-[#55624b]">
                Synchronized with daily prep inventory
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#d8e8c9] text-[#2f3923] text-[11px] font-bold">
            Ready
          </span>
        </div>

        {/* Item Batch Details Card */}
        <div className="bg-[#f7fbeb] rounded-2xl p-3 border border-[#e5eada] space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"
              alt="Fresh Croissants & Pastries"
              className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#c6c7bd]/30"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#76786f]">
                KITCHEN BATCH #B-408
              </span>
              <h3 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                Fresh Croissants & Pastries
              </h3>
              <p className="text-[11px] text-[#55624b] mt-0.5">
                18 units • Surplus from morning display
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white rounded-xl p-2 border border-[#e5eada]">
              <span className="text-[10px] text-[#76786f] block">Storage Protocol</span>
              <span className="font-medium text-[#181d14] text-[11px] flex items-center space-x-1 mt-0.5">
                <span>🥐 Bakery / Ambient</span>
              </span>
            </div>
            <div className="bg-white rounded-xl p-2 border border-[#e5eada]">
              <span className="text-[10px] text-[#76786f] block">Pickup Window</span>
              <span className="font-medium text-[#181d14] text-[11px] flex items-center space-x-1 mt-0.5">
                <Clock className="w-3 h-3 text-[#55624b]" />
                <span>Today 3:30 - 5:00 PM</span>
              </span>
            </div>
          </div>
        </div>

        {/* 4-Point Safety Checklist */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs text-[#181d14] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#455038]" />
              <span>Food Safety Verification Checklist</span>
            </div>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isFullyChecked
                  ? 'bg-[#d8e8c9] text-[#2f3923]'
                  : 'bg-[#fee9ce] text-[#784f22]'
              }`}
            >
              {checkedCount}/4 Checked
            </span>
          </div>
          <p className="text-[11px] text-[#76786f] leading-snug">
            All hygiene conditions must be verified under local food safety ordinance before publishing.
          </p>

          {/* Checklist interactive items */}
          <div className="space-y-1.5 pt-1">
            {/* Check 1 */}
            <button
              type="button"
              onClick={() => toggleCheck('storedSafeTemp')}
              className={`w-full p-2.5 rounded-xl border text-left flex items-start space-x-2.5 transition-colors cursor-pointer ${
                checklist.storedSafeTemp
                  ? 'bg-[#f1f6e6] border-[#d8e0ce]'
                  : 'bg-white border-[#c6c7bd]/60'
              }`}
            >
              <div
                className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                  checklist.storedSafeTemp
                    ? 'bg-[#2f3923] text-white'
                    : 'border border-[#76786f]'
                }`}
              >
                {checklist.storedSafeTemp && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#181d14] leading-tight">
                  Stored at safe temperature
                </p>
                <p className="text-[11px] text-[#55624b] mt-0.5">
                  &lt; 4°C for chilled ingredients or verified dry ambient (&lt; 21°C)
                </p>
              </div>
            </button>

            {/* Check 2 */}
            <button
              type="button"
              onClick={() => toggleCheck('strictUseByPassed')}
              className={`w-full p-2.5 rounded-xl border text-left flex items-start space-x-2.5 transition-colors cursor-pointer ${
                checklist.strictUseByPassed
                  ? 'bg-[#f1f6e6] border-[#d8e0ce]'
                  : 'bg-white border-[#c6c7bd]/60'
              }`}
            >
              <div
                className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                  checklist.strictUseByPassed
                    ? 'bg-[#2f3923] text-white'
                    : 'border border-[#76786f]'
                }`}
              >
                {checklist.strictUseByPassed && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#181d14] leading-tight">
                  Within strict use-by date & sensory check passed
                </p>
                <p className="text-[11px] text-[#55624b] mt-0.5">
                  Texture, aroma, and color inspection completed by duty supervisor
                </p>
              </div>
            </button>

            {/* Check 3 */}
            <button
              type="button"
              onClick={() => toggleCheck('sealedFoodPackaging')}
              className={`w-full p-2.5 rounded-xl border text-left flex items-start space-x-2.5 transition-colors cursor-pointer ${
                checklist.sealedFoodPackaging
                  ? 'bg-[#f1f6e6] border-[#d8e0ce]'
                  : 'bg-white border-[#c6c7bd]/60'
              }`}
            >
              <div
                className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                  checklist.sealedFoodPackaging
                    ? 'bg-[#2f3923] text-white'
                    : 'border border-[#76786f]'
                }`}
              >
                {checklist.sealedFoodPackaging && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#181d14] leading-tight">
                  Sealed in food-grade packaging
                </p>
                <p className="text-[11px] text-[#55624b] mt-0.5">
                  Lined recyclable bakery craft boxes with tamper-evident seal
                </p>
              </div>
            </button>

            {/* Check 4 */}
            <button
              type="button"
              onClick={() => toggleCheck('allergensDeclared')}
              className={`w-full p-2.5 rounded-xl border text-left flex items-start space-x-2.5 transition-colors cursor-pointer ${
                checklist.allergensDeclared
                  ? 'bg-[#f1f6e6] border-[#d8e0ce]'
                  : 'bg-white border-[#c6c7bd]/60'
              }`}
            >
              <div
                className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                  checklist.allergensDeclared
                    ? 'bg-[#2f3923] text-white'
                    : 'border border-[#76786f]'
                }`}
              >
                {checklist.allergensDeclared && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#181d14] leading-tight">
                  Allergens clearly declared
                </p>
                <p className="text-[11px] text-[#ba1a1a] font-medium mt-0.5">
                  Contains: Gluten, Dairy, Eggs
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Publish Action Button */}
        <button
          onClick={() => onPublishQuickList(checklist)}
          disabled={!isFullyChecked}
          className={`w-full py-3.5 px-4 rounded-full font-heading font-semibold text-[14px] flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs active:scale-[0.99] ${
            isFullyChecked
              ? 'bg-[#2f3923] hover:bg-[#404434] text-white'
              : 'bg-[#c6c7bd] text-white/80 cursor-not-allowed opacity-70'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Publish to Rescue Network (3 Verified Shelters)</span>
        </button>

        {/* Safety Lock Notice (Red/Peach Callout) */}
        <div className="bg-[#ffdad6]/50 rounded-2xl p-3 border border-[#ffdad6] flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
          <div className="text-[11px]">
            <strong className="font-semibold text-[#ba1a1a]">
              High-Risk Safety Lock Enforced
            </strong>
            <p className="text-[#93000a] mt-0.5 leading-snug">
              Expired food or items without verified cold-chain holding cannot be listed. For cooked poultry or dairy, temperature logs (&lt; 4°C) and tight 2-hour pickup windows are strictly enforced.
            </p>
          </div>
        </div>

        {/* Green Mission Callout */}
        <div className="bg-[#f1f6e6] rounded-2xl p-3 border border-[#e0e7d5] flex items-start space-x-2.5">
          <Sparkles className="w-4 h-4 text-[#455038] shrink-0 mt-0.5" />
          <div className="text-[11px]">
            <strong className="font-semibold text-[#2f3923]">
              Why WiseBite Verifies Every Batch
            </strong>
            <p className="text-[#55624b] mt-0.5 leading-snug">
              Ensures our partner charities receive nutritious, safe food that fully complies with national food hygiene standards. Respect for recipients starts in our kitchen.
            </p>
          </div>
        </div>
      </section>

      {/* Live Redistribution Feed Section */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-[16px] text-[#181d14] tracking-tight">
              Live Redistribution Feed
            </h2>
            <p className="text-[12px] text-[#55624b]">
              Sunrise Café • Central Kitchen Hub
            </p>
          </div>
          <span className="flex items-center space-x-1 text-[11px] font-medium text-[#455038] bg-[#d8e8c9] px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
            <span>Live sync</span>
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setFeedFilter('active')}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              feedFilter === 'active'
                ? 'bg-[#2f3923] text-white shadow-xs'
                : 'bg-white text-[#55624b] border border-[#c6c7bd]/60 hover:bg-[#f1f6e6]'
            }`}
          >
            Active Listings ({activeCount})
          </button>
          <button
            onClick={() => setFeedFilter('reserved')}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              feedFilter === 'reserved'
                ? 'bg-[#2f3923] text-white shadow-xs'
                : 'bg-white text-[#55624b] border border-[#c6c7bd]/60 hover:bg-[#f1f6e6]'
            }`}
          >
            Reserved ({reservedCount})
          </button>
          <button
            onClick={() => setFeedFilter('collected')}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              feedFilter === 'collected'
                ? 'bg-[#2f3923] text-white shadow-xs'
                : 'bg-white text-[#55624b] border border-[#c6c7bd]/60 hover:bg-[#f1f6e6]'
            }`}
          >
            Collected ({collectedCount})
          </button>
        </div>

        {/* BATCH 1: Reserved Sourdough Loaves */}
        {(feedFilter === 'reserved' || feedFilter === 'all') && (
          <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#fee9ce] text-[#784f22] text-[11px] font-bold">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Reserved by Charity</span>
              </span>
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>5:00 PM (1h 15m remaining)</span>
              </span>
            </div>

            <div className="flex items-start space-x-3">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"
                alt="18 Assorted Sourdough Loaves"
                className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#c6c7bd]/30"
              />
              <div>
                <h3 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                  18 Assorted Sourdough Loaves & Rolls
                </h3>
                <p className="text-[11px] text-[#55624b] mt-0.5">
                  Baking run: 06:30 AM • Packaged in sealed crates
                </p>
                <div className="flex items-center space-x-2 mt-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#ebf0e0] text-[#2f3923] text-[10px] font-semibold">
                    Bakery
                  </span>
                  <span className="text-[11px] font-medium text-[#55624b]">
                    Est. 24 Meals Provided
                  </span>
                </div>
              </div>
            </div>

            {/* Handoff Chain Progress Tracker (Stage 2 of 3) */}
            <div className="bg-[#f7fbeb] rounded-2xl p-3 border border-[#e5eada] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-[#181d14]">HANDOFF CHAIN</span>
                <span className="font-bold text-[#455038]">Stage 2 of 3</span>
              </div>

              {/* Steps row */}
              <div className="flex items-center justify-between pt-1 relative">
                <div className="flex flex-col items-center z-10">
                  <div className="w-6 h-6 rounded-full bg-[#2f3923] text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[10px] font-semibold text-[#181d14] mt-1">Listed</span>
                  <span className="text-[9px] text-[#76786f]">11:00 AM</span>
                </div>

                <div className="h-0.5 bg-[#455038] flex-1 mx-2 -mt-4"></div>

                <div className="flex flex-col items-center z-10">
                  <div className="w-6 h-6 rounded-full bg-[#2f3923] text-white flex items-center justify-center text-[10px] ring-4 ring-[#d8e8c9]">
                    <HeartHandshake className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#181d14] mt-1">Reserved</span>
                  <span className="text-[9px] text-[#76786f]">1:15 PM</span>
                </div>

                <div className="h-0.5 bg-[#c6c7bd] flex-1 mx-2 -mt-4"></div>

                <div className="flex flex-col items-center z-10">
                  <div className="w-6 h-6 rounded-full bg-[#ebf0e0] text-[#76786f] flex items-center justify-center text-[10px]">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-medium text-[#76786f] mt-1">Collection</span>
                  <span className="text-[9px] text-[#76786f]">By 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Volunteer card */}
            <div className="bg-[#f7fbeb] rounded-2xl p-3 border border-[#e5eada] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#455038] text-white flex items-center justify-center text-xs font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-[13px] text-[#181d14]">
                    Hope Community Food Bank
                  </h4>
                  <p className="text-[11px] text-[#55624b]">
                    Volunteer: Marcus D. (ID: #HC-882)
                  </p>
                </div>
              </div>
              <button
                onClick={() => onContactVolunteer('Marcus D.', '+1 (555) 234-8910')}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#f1f6e6] transition-colors flex items-center justify-center border border-[#c6c7bd]/60 shadow-xs cursor-pointer"
                title="Call Volunteer"
              >
                <Phone className="w-3.5 h-3.5 text-[#55624b]" />
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={() => onOpenHandoverModal(batches[0])}
                className="flex-1 py-3 px-4 bg-[#2f3923] hover:bg-[#404434] text-white text-[13px] font-semibold rounded-full shadow-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Volunteer Handover</span>
              </button>
              <button
                onClick={() => onOpenHandoverModal(batches[0])}
                className="w-11 h-11 rounded-full bg-white hover:bg-[#f1f6e6] transition-colors border border-[#c6c7bd]/60 flex items-center justify-center text-[#2f3923] shadow-xs cursor-pointer"
                title="Scan QR Code"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* BATCH 2: Listed Jasmine Rice */}
        {(feedFilter === 'active' || feedFilter === 'all') && (
          <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#d8e8c9] text-[#2f3923] text-[11px] font-bold">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Listed • Available for Charities</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#ebf0e0] text-[#2f3923] text-[11px] font-bold">
                ❄️ Held at 3.2°C
              </span>
            </div>

            <div className="flex items-start space-x-3">
              <img
                src="https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=400&q=80"
                alt="5 kg Prepared Steamed Jasmine Rice"
                className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#c6c7bd]/30"
              />
              <div>
                <h3 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                  5 kg Prepared Steamed Jasmine Rice
                </h3>
                <p className="text-[11px] text-[#55624b] mt-0.5">
                  Prepared: 12:00 PM • Rapid chilled to 3.2°C
                </p>
                <div className="flex items-center space-x-2 mt-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#fee9ce] text-[#784f22] text-[10px] font-bold">
                    Allergen Free
                  </span>
                  <span className="text-[11px] font-medium text-[#55624b]">
                    ~20 meal portions
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#f7fbeb] rounded-2xl p-2.5 border border-[#e5eada] flex items-center space-x-2 text-[11px] text-[#55624b]">
              <Clock className="w-3.5 h-3.5 text-[#ba1a1a]" />
              <span>
                <strong className="text-[#181d14]">Strict window:</strong> Pickup before 4:30 PM (Chilled Holding)
              </span>
            </div>

            <button
              onClick={() => onReserveBatch('batch-2')}
              className="w-full py-3 px-4 bg-[#2f3923] hover:bg-[#404434] text-white text-[13px] font-semibold rounded-full shadow-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Reserve for City Hope Shelter (Charity Action)</span>
            </button>
            <p className="text-[10px] text-center text-[#76786f]">
              Auto-releases back to other shelters if pickup window is missed by &gt; 30 mins.
            </p>
          </div>
        )}

        {/* BATCH 3: Crisp Lettuce */}
        {(feedFilter === 'active' || feedFilter === 'all') && (
          <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#d8e8c9] text-[#2f3923] text-[11px] font-bold">
                Listed • Available
              </span>
              <span className="text-[11px] text-[#55624b]">Storage: Crisper (3°C)</span>
            </div>
            <div className="flex items-start space-x-3">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80"
                alt="Organic Crisp Lettuce"
                className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#c6c7bd]/30"
              />
              <div>
                <h3 className="font-heading font-semibold text-[15px] text-[#181d14] leading-tight">
                  Organic Crisp Lettuce & Microgreens
                </h3>
                <p className="text-[11px] text-[#55624b] mt-0.5">
                  4.0 kg • ~25 salad servings
                </p>
                <p className="text-[11px] text-[#76786f] mt-1">
                  Pickup window: Available until 7:00 PM
                </p>
              </div>
            </div>
            <button
              onClick={() => onReserveBatch('batch-4')}
              className="w-full py-2.5 px-4 bg-[#f1f6e6] hover:bg-[#e0e7d5] text-[#2f3923] text-[12px] font-semibold rounded-full border border-[#c6c7bd]/60 transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Claim for Downtown Youth Shelter</span>
            </button>
          </div>
        )}
      </section>

      {/* Compliance Guardrail Demonstration Section */}
      <section className="space-y-2 pt-2">
        <div className="flex items-center space-x-1.5 text-xs text-[#ba1a1a] font-semibold">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-heading text-[14px]">Compliance Guardrail Demonstration</span>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#ffdad6] space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[14px] text-[#181d14]">
                  Organic Half & Half Creamer (2.5L)
                </h3>
                <p className="text-[11px] text-[#ba1a1a] font-medium">
                  Use-by Date: Yesterday, 11:59 PM
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold tracking-wider uppercase">
              BLOCKED
            </span>
          </div>

          <div className="bg-[#ffdad6]/40 rounded-2xl p-3 border border-[#ffdad6] flex items-start space-x-2 text-[11px] text-[#93000a]">
            <Lock className="w-3.5 h-3.5 text-[#ba1a1a] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-[#ba1a1a]">
                Automatic System Lock Triggered
              </strong>
              <p className="mt-0.5 leading-snug">
                Dairy products past printed expiry dates cannot be listed on WiseBite under commercial sanitation guidelines. Please compost according to cafe organic recycling protocol #OR-3.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#76786f] pt-1 border-t border-[#f1f6e6]">
            <span>Logged in Kitchen Waste Audit</span>
            <span className="flex items-center space-x-1 font-medium text-[#455038]">
              <Recycle className="w-3.5 h-3.5" />
              <span>Redirected to compost</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
