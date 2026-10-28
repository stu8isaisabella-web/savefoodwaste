import React from 'react';
import { X, Clock, Check, Calendar, MapPin, Phone } from 'lucide-react';

interface PickupHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PickupHoursModal: React.FC<PickupHoursModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const schedules = [
    {
      slot: 'Morning Bakery Surplus',
      hours: '10:30 AM – 12:00 PM',
      focus: 'Pastries, viennoiserie, morning baguettes',
      status: 'Closed Today',
    },
    {
      slot: 'Afternoon Kitchen Prep Shift',
      hours: '3:30 PM – 5:00 PM',
      focus: 'Steamed grains, prepared proteins, deli soups',
      status: 'Active Window',
      active: true,
    },
    {
      slot: 'Evening Post-Close Handoff',
      hours: '6:30 PM – 7:30 PM',
      focus: 'Salad bar crisper, display cabinet surpluses',
      status: 'Upcoming',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-[#e5eada] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f1f6e6] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#2f3923] text-white flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-[17px] text-[#181d14]">
                Sunrise Café Pickup Windows
              </h2>
              <p className="text-[11px] text-[#55624b]">
                Verified shelter collection schedule
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

        {/* Schedule cards */}
        <div className="space-y-2.5">
          {schedules.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-3.5 border transition-all ${
                item.active
                  ? 'bg-[#f7fbeb] border-[#455038] ring-1 ring-[#455038]'
                  : 'bg-white border-[#e5eada]'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-[14px] text-[#181d14]">
                  {item.slot}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.active
                      ? 'bg-[#d8e8c9] text-[#2f3923]'
                      : 'bg-[#f1f6e6] text-[#76786f]'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="font-mono text-[12px] font-semibold text-[#2f3923] mt-1">
                {item.hours}
              </p>
              <p className="text-[11px] text-[#55624b] mt-0.5">{item.focus}</p>
            </div>
          ))}
        </div>

        {/* Café Back-Door Logistics Note */}
        <div className="bg-[#f1f6e6] rounded-2xl p-3 text-xs text-[#55624b] space-y-1.5 border border-[#e0e7d5]">
          <div className="flex items-center space-x-1.5 text-[#181d14] font-semibold text-[12px]">
            <MapPin className="w-3.5 h-3.5 text-[#455038]" />
            <span>Kitchen Loading Dock: Bay #3 (Alley Entrance)</span>
          </div>
          <p className="leading-snug text-[11px]">
            Please ring the commercial intercom marked “Rescue Dispatch” upon arrival. Cold boxes and crates must be returned on subsequent visits.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 bg-[#2f3923] hover:bg-[#404434] text-white font-heading font-semibold text-[14px] rounded-full shadow-xs cursor-pointer transition-colors"
        >
          Got It
        </button>
      </div>
    </div>
  );
};
