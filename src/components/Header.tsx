import React from 'react';
import { ChefHat, HeartHandshake, Clock, Sparkles } from 'lucide-react';
import { RoleMode, TabType } from '../types/rescue';

interface HeaderProps {
  roleMode: RoleMode;
  onToggleRole: () => void;
  onOpenPickupHours: () => void;
  activeTab: TabType;
}

export const Header: React.FC<HeaderProps> = ({
  roleMode,
  onToggleRole,
  onOpenPickupHours,
  activeTab,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#f7fbeb]/95 backdrop-blur-md pt-3 pb-2 px-4 border-b border-[#e5eada]">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Left */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-full bg-[#2f3923] text-white flex items-center justify-center shadow-xs">
            <svg
              className="w-5 h-5 text-[#f1f6e6]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-semibold text-[17px] text-[#181d14] tracking-tight leading-none">
                Sunrise Café
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fee9ce] text-[#784f22] border border-[#f0dac0]">
                DEMO DATA
              </span>
            </div>
            <p className="text-[11px] text-[#55624b] mt-0.5 font-medium leading-none">
              Food Rescue Partner • {roleMode === 'staff' ? 'Staff Mode' : 'Charity Partner'}
            </p>
          </div>
        </div>

        {/* Controls Right */}
        <div className="flex items-center space-x-2">
          {/* Staff / Charity toggle switch pill */}
          <button
            onClick={onToggleRole}
            title={roleMode === 'staff' ? 'Switch to Charity View' : 'Switch to Staff View'}
            className="flex items-center bg-[#ebf0e0] hover:bg-[#e0e6d4] transition-all duration-200 rounded-full p-1 border border-[#c6c7bd]/50 cursor-pointer text-xs"
            aria-label="Toggle between Kitchen Staff and Charity View"
          >
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
                roleMode === 'staff'
                  ? 'bg-[#2f3923] text-white shadow-xs'
                  : 'text-[#55624b]'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
            </div>
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
                roleMode === 'charity'
                  ? 'bg-[#d97706] text-white shadow-xs'
                  : 'text-[#55624b]'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* User Avatar with verified online dot */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=120&q=80"
              alt="Head Chef Marcus Profile"
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs ring-1 ring-[#c6c7bd]/40"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Contextual Status Strip (screen dependent) */}
      {activeTab === 'home' && (
        <div className="max-w-md mx-auto mt-2.5 pt-1 flex items-center justify-between text-xs text-[#55624b]">
          <div className="flex items-center space-x-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full bg-[#455038] animate-pulse shrink-0"></span>
            <span className="truncate text-[12px] font-medium text-[#2f3923]">
              Prototype Mode • Sunrise Café {roleMode === 'staff' ? 'Staff View Active' : 'Charity View Active'}
            </span>
          </div>
          <button
            onClick={onOpenPickupHours}
            className="shrink-0 flex items-center space-x-1 px-3 py-1 bg-white hover:bg-[#f1f6e6] transition-colors rounded-full border border-[#c6c7bd]/60 text-[11px] font-semibold text-[#2f3923] shadow-xs cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-[#55624b]" />
            <span>Pickup Hours</span>
          </button>
        </div>
      )}

      {activeTab === 'impact' && (
        <div className="max-w-md mx-auto mt-2.5 pt-1 flex items-center justify-between text-xs">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ebf0e0] border border-[#d8e0ce] text-[#2f3923] font-medium text-[12px]">
            <span>Sunrise Café • Verified Partner</span>
            <Sparkles className="w-3 h-3 text-[#d97706]" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fee9ce] text-[#784f22] border border-[#f0dac0]">
            Demo Data
          </span>
        </div>
      )}
    </header>
  );
};
