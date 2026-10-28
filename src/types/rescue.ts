export type TabType = 'home' | 'inventory' | 'rescue' | 'impact';
export type RoleMode = 'staff' | 'charity';

export type FoodCategory =
  | 'Bakery & Breads'
  | 'Prepared Dishes'
  | 'Produce & Greens'
  | 'Dairy & Pantry';

export type ExpiryUrgency = 'today' | '2days' | 'week';

export interface InventoryItem {
  id: string;
  name: string;
  shortName: string;
  category: FoodCategory;
  quantity: number;
  unit: string;
  location: string;
  batchTimestamp: string;
  expiryUrgency: ExpiryUrgency;
  expiryLabel: string;
  storageProtocol: string;
  tempRequirement?: string;
  currentTemp?: string;
  useItUpIdea?: string;
  rescueWindowHours?: number;
  status: 'in_kitchen' | 'ready_rescue' | 'listed' | 'reserved' | 'collected' | 'blocked';
  sealedStatus?: string;
  notes?: string;
  image: string;
  allergens?: string[];
}

export interface CharityVolunteer {
  name: string;
  volunteer?: string;
  shelterName: string;
  volunteerId: string;
  phone: string;
  avatar: string;
  distanceKm: number;
}

export interface RescueBatch {
  id: string;
  batchNumber: string;
  title: string;
  shortTitle: string;
  quantityUnits: string;
  sourceNote: string;
  category: FoodCategory;
  storageProtocol: string;
  pickupWindow: string;
  timeRemaining: string;
  status: 'active' | 'reserved' | 'collected';
  holdingTemp?: string;
  allergenFree?: boolean;
  portionEstimate?: string;
  isQuickListSample?: boolean;
  handoffStage: 1 | 2 | 3; // 1: Listed, 2: Reserved, 3: Collection
  listedTime: string;
  reservedTime?: string;
  collectedTime?: string;
  reservedBy?: CharityVolunteer;
  image: string;
}

export interface SafetyAlert {
  id: string;
  title: string;
  timeLabel: string;
  type: 'warning' | 'verified' | 'blocked';
  description: string;
}

export interface ImpactDayVolume {
  day: string;
  dayLabel: string;
  kg: number;
  isPeak?: boolean;
}

export interface ImpactCategoryShare {
  category: FoodCategory;
  percentage: number;
  kg: number;
  colorClass: string;
}

export interface PartnerShelter {
  id: string;
  name: string;
  mealsCount: number;
  pickupDays: string;
  distance: string;
  avatar: string;
}
