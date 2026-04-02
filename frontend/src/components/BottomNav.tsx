import type { BottomNavItem } from '../types/config';
import { sortByVisibleAndSort } from '../lib/helpers';
import { getIcon } from '../lib/icons';
import { Badge } from './Badge';

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  const visibleItems = sortByVisibleAndSort(
    items.map((item, index) => ({ ...item, sort: index + 1 }))
  );

  return (
    <nav className="absolute inset-x-0 bottom-0 rounded-t-[24px] border-t border-black/5 bg-white px-2 pt-1.5 shadow-[0_-6px_18px_rgba(29,35,58,0.05)] safe-bottom">
      <div className="grid grid-cols-5">
        {visibleItems.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <button key={item.label} className="relative flex flex-col items-center justify-center gap-1 py-1.5">
              <div className="relative">
                <Icon size={19} className={item.active ? 'text-[#ef4337]' : 'text-[#9b9ea8]'} />
                {item.badge && <Badge text={item.badge} className="absolute -right-3 -top-2 scale-90" />}
              </div>
              <span className={`text-[11px] ${item.active ? 'font-semibold text-[#ef4337]' : 'text-[#9b9ea8]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
