import React, { useState } from 'react';
import {
  Utensils,
  Leaf,
  DollarSign,
  Cloud,
  FileText,
  Award,
  Globe2,
  HandHeart,
  Info,
  Calendar,
} from 'lucide-react';
import {
  WEEKLY_VOLUME_DATA,
  CATEGORY_SHARES,
  PARTNER_SHELTERS,
} from '../data/seedData';

interface ImpactScreenProps {
  onOpenPdfModal: () => void;
  onOpenCertificateModal: () => void;
}

export const ImpactScreen: React.FC<ImpactScreenProps> = ({
  onOpenPdfModal,
  onOpenCertificateModal,
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-4 pt-2">
      {/* Title */}
      <div>
        <h1 className="font-heading font-bold text-[24px] text-[#181d14] tracking-tight leading-none">
          Rescue Impact & Sustainability
        </h1>
        <p className="text-[12px] text-[#55624b] mt-1 leading-snug">
          Real-time ecological savings and food recovery tracking for back-of-house operations.
        </p>
      </div>

      {/* Hospitality benchmarks info callout */}
      <div className="bg-[#f1f6e6] rounded-2xl p-3 border border-[#e0e7d5] flex items-start space-x-2 text-[11px] text-[#55624b]">
        <Info className="w-3.5 h-3.5 text-[#455038] shrink-0 mt-0.5" />
        <p className="leading-snug">
          *All cost, nutritional conversion, and emissions figures are regional estimates derived from standard commercial hospitality benchmarks and municipal compost diversion indices.
        </p>
      </div>

      {/* 4 Key Metric Cards (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Card 1: Meals Rescued */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-[#ebf0e0] text-[#2f3923] flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-[#76786f] uppercase tracking-wider bg-[#f1f6e6] px-2 py-0.5 rounded-full">
              EST.
            </span>
          </div>
          <div className="mt-2.5">
            <span className="text-[11px] font-medium text-[#55624b]">
              Meals Rescued
            </span>
            <p className="font-heading font-bold text-[26px] text-[#181d14] leading-tight">
              312
            </p>
            <p className="text-[10px] text-[#76786f] mt-0.5 leading-tight">
              Redirected from 156 kg cafe surplus
            </p>
          </div>
        </div>

        {/* Card 2: Saved from Landfill */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-[#d8e8c9] text-[#2f3923] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-[#455038]" />
            </div>
            <span className="text-[10px] font-bold text-[#2f3923] uppercase tracking-wider bg-[#d8e8c9] px-2 py-0.5 rounded-full">
              LOGGED
            </span>
          </div>
          <div className="mt-2.5">
            <span className="text-[11px] font-medium text-[#55624b]">
              Saved from Landfill
            </span>
            <p className="font-heading font-bold text-[26px] text-[#181d14] leading-tight">
              156.4 <span className="text-[16px] font-semibold">kg</span>
            </p>
            <p className="text-[10px] text-[#76786f] mt-0.5 leading-tight">
              100% kitchen scraps & bakery goods
            </p>
          </div>
        </div>

        {/* Card 3: Estimated Value */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-[#fee9ce] text-[#784f22] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-[#76786f] uppercase tracking-wider bg-[#f1f6e6] px-2 py-0.5 rounded-full">
              EST.
            </span>
          </div>
          <div className="mt-2.5">
            <span className="text-[11px] font-medium text-[#55624b]">
              Estimated Value
            </span>
            <p className="font-heading font-bold text-[26px] text-[#181d14] leading-tight">
              $840.00
            </p>
            <p className="text-[10px] text-[#76786f] mt-0.5 leading-tight">
              Procurement & waste tipping savings
            </p>
          </div>
        </div>

        {/* Card 4: CO2e Avoided */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-[#ebf0e0] text-[#455038] flex items-center justify-center">
              <Cloud className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-[#76786f] uppercase tracking-wider bg-[#f1f6e6] px-2 py-0.5 rounded-full">
              EST.
            </span>
          </div>
          <div className="mt-2.5">
            <span className="text-[11px] font-medium text-[#55624b]">
              CO<sub className="text-[9px] -bottom-0.5">2</sub>e Avoided
            </span>
            <p className="font-heading font-bold text-[26px] text-[#181d14] leading-tight">
              391 <span className="text-[16px] font-semibold">kg</span>
            </p>
            <p className="text-[10px] text-[#76786f] mt-0.5 leading-tight">
              ≈ 1,600 km driven by average car
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Rescue Volume (Bar Chart) */}
      <section className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-[15px] text-[#181d14]">
              Weekly Rescue Volume
            </h2>
            <p className="text-[11px] text-[#55624b]">
              Daily kilograms diverted this week
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#ebf0e0] text-[#2f3923] text-[11px] font-bold">
            Total 156 kg
          </span>
        </div>

        {/* Bar chart canvas visualization */}
        <div className="pt-4 pb-2 px-1">
          <div className="h-36 flex items-end justify-between space-x-2">
            {WEEKLY_VOLUME_DATA.map((item, idx) => {
              const maxVal = 40;
              const heightPercent = (item.kg / maxVal) * 100;
              const isSelected = selectedDay === item.dayLabel;
              return (
                <div
                  key={idx}
                  onClick={() =>
                    setSelectedDay(isSelected ? null : item.dayLabel)
                  }
                  className="flex-1 flex flex-col items-center group cursor-pointer"
                  title={`${item.dayLabel}: ${item.kg} kg`}
                >
                  <span className="text-[11px] font-semibold text-[#181d14] mb-1 group-hover:scale-110 transition-transform">
                    {item.kg}
                  </span>
                  <div className="w-full bg-[#f1f6e6] rounded-t-xl h-28 flex items-end p-0.5">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        item.isPeak
                          ? 'bg-[#2f3923] shadow-xs'
                          : 'bg-[#bccbae] group-hover:bg-[#a3b19b]'
                      } ${isSelected ? 'ring-2 ring-[#d97706]' : ''}`}
                    ></div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#55624b] mt-1.5">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#55624b] pt-3 border-t border-[#f1f6e6] mt-2">
            <span className="flex items-center space-x-1.5 font-medium text-[#181d14]">
              <span className="w-2 h-2 rounded-full bg-[#2f3923]"></span>
              <span>Peak: Friday Bakery Run</span>
            </span>
            <span className="text-[#76786f]">Kitchen Shift Log</span>
          </div>
        </div>
      </section>

      {/* Surplus by Category (Stacked Bar) */}
      <section className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-[15px] text-[#181d14]">
            Surplus by Category
          </h2>
          <span className="text-[11px] text-[#55624b]">
            October Redistribution
          </span>
        </div>

        {/* Stacked bar */}
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-[#f1f6e6]">
          <div
            style={{ width: '42%' }}
            className="bg-[#2f3923] h-full"
            title="Bakery & Breads: 42%"
          ></div>
          <div
            style={{ width: '28%' }}
            className="bg-[#55624b] h-full"
            title="Prepared Dishes: 28%"
          ></div>
          <div
            style={{ width: '20%' }}
            className="bg-[#bccbae] h-full"
            title="Produce & Greens: 20%"
          ></div>
          <div
            style={{ width: '10%' }}
            className="bg-[#fee9ce] h-full"
            title="Dairy & Pantry: 10%"
          ></div>
        </div>

        {/* Category Breakdown 2x2 Pills */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="bg-[#f7fbeb] rounded-2xl p-2.5 border border-[#e5eada]">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2f3923]"></span>
              <span className="font-semibold text-[11px] text-[#181d14]">
                Bakery & Breads
              </span>
            </div>
            <p className="text-[12px] font-bold text-[#181d14] mt-1">
              42% <span className="font-normal text-[#55624b] text-[10px]">(65.7 kg)</span>
            </p>
          </div>

          <div className="bg-[#f7fbeb] rounded-2xl p-2.5 border border-[#e5eada]">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#55624b]"></span>
              <span className="font-semibold text-[11px] text-[#181d14]">
                Prepared Dishes
              </span>
            </div>
            <p className="text-[12px] font-bold text-[#181d14] mt-1">
              28% <span className="font-normal text-[#55624b] text-[10px]">(43.8 kg)</span>
            </p>
          </div>

          <div className="bg-[#f7fbeb] rounded-2xl p-2.5 border border-[#e5eada]">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#bccbae]"></span>
              <span className="font-semibold text-[11px] text-[#181d14]">
                Produce & Greens
              </span>
            </div>
            <p className="text-[12px] font-bold text-[#181d14] mt-1">
              20% <span className="font-normal text-[#55624b] text-[10px]">(31.3 kg)</span>
            </p>
          </div>

          <div className="bg-[#f7fbeb] rounded-2xl p-2.5 border border-[#e5eada]">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#d97706]"></span>
              <span className="font-semibold text-[11px] text-[#181d14]">
                Dairy & Pantry
              </span>
            </div>
            <p className="text-[12px] font-bold text-[#181d14] mt-1">
              10% <span className="font-normal text-[#55624b] text-[10px]">(15.6 kg)</span>
            </p>
          </div>
        </div>
      </section>

      {/* UN SDG Alignment Section */}
      <section className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-[15px] text-[#181d14]">
              UN SDG Alignment
            </h2>
            <p className="text-[11px] text-[#55624b]">
              Global framework, local grassroots action
            </p>
          </div>
          <Globe2 className="w-4 h-4 text-[#455038]" />
        </div>

        {/* SDG 2 */}
        <div className="bg-[#f7fbeb] rounded-2xl p-3 border border-[#e5eada] flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#d97706] text-white flex flex-col items-center justify-center shrink-0">
            <span className="text-[8px] font-bold leading-none">SDG</span>
            <span className="text-[13px] font-bold leading-none mt-0.5">2</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-[13px] text-[#181d14]">
                Zero Hunger
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fee9ce] text-[#784f22]">
                Target 2.1
              </span>
            </div>
            <p className="text-[11px] text-[#55624b] mt-0.5 leading-snug">
              312 nourishing meals delivered to Hope Food Bank & City Shelter this month.
            </p>
          </div>
        </div>

        {/* SDG 12 */}
        <div className="bg-[#f7fbeb] rounded-2xl p-3 border border-[#e5eada] flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#b58b27] text-white flex flex-col items-center justify-center shrink-0">
            <span className="text-[8px] font-bold leading-none">SDG</span>
            <span className="text-[13px] font-bold leading-none mt-0.5">12</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-[13px] text-[#181d14]">
                Responsible Consumption
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fee9ce] text-[#784f22]">
                Target 12.3
              </span>
            </div>
            <p className="text-[11px] text-[#55624b] mt-0.5 leading-snug">
              89.4% surplus salvage rate achieved across Sunrise Café kitchen prep stations.
            </p>
          </div>
        </div>

        {/* SDG 13 */}
        <div className="bg-[#f7fbeb] rounded-2xl p-3 border border-[#e5eada] flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#2f3923] text-white flex flex-col items-center justify-center shrink-0">
            <span className="text-[8px] font-bold leading-none">SDG</span>
            <span className="text-[13px] font-bold leading-none mt-0.5">13</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-[13px] text-[#181d14]">
                Climate Action
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#d8e8c9] text-[#2f3923]">
                Target 13.2
              </span>
            </div>
            <p className="text-[11px] text-[#55624b] mt-0.5 leading-snug">
              391 kg greenhouse gas emissions diverted through organic waste avoidance.
            </p>
          </div>
        </div>
      </section>

      {/* Where Sunrise Café Food Went */}
      <section className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_-2px_rgba(69,80,56,0.08)] border border-[#69775e]/15 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-[15px] text-[#181d14]">
              Where Sunrise Café Food Went
            </h2>
            <p className="text-[11px] text-[#55624b]">
              Verified nonprofit distribution partners
            </p>
          </div>
          <HandHeart className="w-4 h-4 text-[#455038]" />
        </div>

        <div className="space-y-2">
          {PARTNER_SHELTERS.map((partner) => (
            <div
              key={partner.id}
              className="bg-[#f7fbeb] rounded-2xl p-3 border border-[#e5eada] flex items-center justify-between"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <img
                  src={partner.avatar}
                  alt={partner.name}
                  className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#c6c7bd]/30"
                />
                <div className="min-w-0">
                  <h4 className="font-heading font-semibold text-[13px] text-[#181d14] truncate">
                    {partner.name}
                  </h4>
                  <p className="text-[11px] text-[#55624b] mt-0.5 truncate">
                    Pickup: {partner.pickupDays} • {partner.distance}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 pl-2">
                <span className="font-heading font-bold text-[16px] text-[#181d14]">
                  {partner.mealsCount}
                </span>
                <span className="text-[10px] text-[#76786f] block">meals</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Buttons */}
      <div className="space-y-2.5 pt-1">
        <button
          onClick={onOpenPdfModal}
          className="w-full py-3.5 px-4 bg-[#2f3923] hover:bg-[#404434] text-white font-heading font-semibold text-[14px] rounded-full shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-[0.99]"
        >
          <FileText className="w-4 h-4" />
          <span>Download Impact Summary PDF</span>
        </button>

        <button
          onClick={onOpenCertificateModal}
          className="w-full py-3.5 px-4 bg-[#fee9ce] hover:bg-[#fae2c1] text-[#2f3923] font-heading font-semibold text-[14px] rounded-full border border-[#c1ac8f] shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-[0.99]"
        >
          <Award className="w-4 h-4 text-[#784f22]" />
          <span>Share Sustainability Certificate</span>
        </button>
      </div>
    </div>
  );
};
