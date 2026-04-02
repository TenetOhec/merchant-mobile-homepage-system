import {
  BadgePercent,
  BarChart3,
  ChartColumnIncreasing,
  CircleUserRound,
  House,
  LayoutGrid,
  LucideIcon,
  MapPinned,
  MessageCircleMore,
  MessageSquareQuote,
  Package,
  Printer,
  ReceiptText,
  Search,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  QrCode,
  FileWarning,
  Megaphone,
  ClipboardList,
  WalletCards
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  BadgePercent,
  BarChart3,
  ChartColumnIncreasing,
  CircleUserRound,
  ClipboardList,
  FileWarning,
  House,
  LayoutGrid,
  MapPinned,
  Megaphone,
  MessageCircleMore,
  MessageSquareQuote,
  Package,
  Printer,
  QrCode,
  ReceiptText,
  Search,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  WalletCards
};

export function getIcon(name: string) {
  return iconMap[name] || LayoutGrid;
}

export const iconNames = Object.keys(iconMap).sort();
