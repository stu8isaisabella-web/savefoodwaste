import React from 'react';
import { LayoutGrid, Refrigerator, HandHeart, Leaf } from 'lucide-react';
import { TabType } from '../types/rescue';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  rescueBadgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  rescueBadgeCount = 3,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'Home',
      icon: LayoutGrid,
    },
    {
      id: 'inventory' as TabType,
      label: 'My Kitchen',
      icon: Refrigerator,
    },
    {
      id: 'rescue' as TabType,
      label: 'Food Rescue',
      icon: HandHeart,
      badge: rescueBadgeCount,
    },
    {
      id: 'impact' as TabType,
      label: 'Impact',
      icon: Leaf,
    },
  ];

  return (
    <nav
      className="fixed bottom-3 inset-x-0 z-40 max-w-md mx-auto px-4 pointer-events-none"
      aria-label="Bottom Navigation"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-full shadow-[0_12px_32px_-4px_rgba(35,40,30,0.12),0_4px_12px_-2px_rgba(35,40,30,0.06)] border border-[#69775e]/15 p-1.5 flex items-center justify-around pointer-events-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3.5 transition-all duration-200 cursor-pointer rounded-full min-w-[72px] ${
                isActive
                  ? 'bg-[#d8e8c9] text-[#2f3923] font-semibold'
                  : 'text-[#76786f] hover:text-[#2f3923] hover:bg-[#f1f6e6]/60'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-105 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#d97706] text-white text-[10px] font-bold flex items-center justify-center leading-none ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-0.5 tracking-tight ${
                  isActive ? 'font-semibold text-[#181d14]' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
