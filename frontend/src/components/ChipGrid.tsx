import type { ChipItem } from '../types/config';
import { sortByVisibleAndSort } from '../lib/helpers';
import { Badge } from './Badge';

export function ChipGrid({ chips }: { chips: ChipItem[] }) {
  const visibleChips = sortByVisibleAndSort(chips);

  return (
    <section className="relative z-10 mx-[6px] mt-[-3px]">
      <div className="hide-scrollbar overflow-x-auto overflow-y-visible pt-[12px]">
        <div className="grid auto-cols-[110px] grid-flow-col grid-rows-2 gap-[7px] pb-[2px]">
          {visibleChips.map((item) => (
            <div
              key={item.label}
              className="relative flex min-h-[38px] items-center overflow-visible rounded-[10px] bg-white px-2.5 shadow-[0_8px_18px_rgba(35,39,49,0.05)]"
            >
              <span className="text-[12px] font-medium text-[#3a3b42]">{item.label}</span>
              <Badge
                text={item.badge}
                className={`absolute -right-[4px] -top-[3px] text-[10px] shadow-[0_3px_7px_rgba(255,95,77,0.26)] ${
                  item.badge.length <= 1 ? 'h-[15px] w-[15px] min-w-[15px] rounded-full px-0 py-0' : 'min-w-[22px] px-[5px] py-[2px]'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
