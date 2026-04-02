export type StatGroup = 'top' | 'bottom';

export interface GrowthConfig {
  enabled: boolean;
  intervalSeconds: number;
  minStep: string;
  maxStep: string;
  lastTickAt: string;
}

export interface StoreConfig {
  name: string;
  avatar: string;
  notice: string;
  showSearch: boolean;
  showScan: boolean;
}

export interface StatItem {
  label: string;
  value: string;
  group: StatGroup;
  growth?: GrowthConfig;
}

export interface MenuItem {
  title: string;
  icon: string;
  badge: string;
  sort: number;
  visible: boolean;
}

export interface ChipItem {
  label: string;
  badge: string;
  sort: number;
  visible: boolean;
  growth?: GrowthConfig;
}

export interface WorkOrderConfig {
  title: string;
  imageUrl: string;
  amount: string;
  countdown: string;
  buttonText: string;
}

export interface ImproveCardConfig {
  title: string;
  traffic: string;
  order: string;
  buttonText: string;
}

export interface BottomNavItem {
  label: string;
  icon: string;
  badge: string;
  active: boolean;
  visible: boolean;
}

export interface HomeConfig {
  store: StoreConfig;
  stats: StatItem[];
  menus: MenuItem[];
  chips: ChipItem[];
  workOrder: WorkOrderConfig;
  improveCard: ImproveCardConfig;
  bottomNav: BottomNavItem[];
}
