import type { BottomNavItem } from '../types/config';

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  void items;

  return (
    <nav className="absolute inset-x-0 bottom-0 z-30">
      <img src="/底部.png" alt="底部导航" className="block w-full object-cover" />
    </nav>
  );
}
