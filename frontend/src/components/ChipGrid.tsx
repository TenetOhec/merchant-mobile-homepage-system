import type { ChipItem } from '../types/config';
import { sortByVisibleAndSort } from '../lib/helpers';

export function ChipGrid({ chips }: { chips: ChipItem[] }) {
  const visibleChips = sortByVisibleAndSort(chips);

  return (
    <section className="relative z-10 mx-[6px] mt-[-3px]">
      <div className="hide-scrollbar overflow-x-auto overflow-y-visible pt-[12px]">
        <div className="grid auto-cols-[110px] grid-flow-col grid-rows-2 gap-[7px] pb-[2px]">
          {visibleChips.map((item) => (
            <div
              key={item.label}
              className="relative flex min-h-[38px] items-center overflow-visible rounded-[8px] bg-white px-2.5 shadow-[0_8px_18px_rgba(35,39,49,0.05)]"
            >
              <span className="text-[14px] font-normal text-[#3a3b42]">{item.label}</span>
              {item.badge && (
                <span
                  className={`absolute -right-[4px] -top-[3px] inline-flex items-center justify-center rounded-full bg-[#ff5f4d] text-[12px] leading-none text-white shadow-[0_3px_7px_rgba(255,95,77,0.26)] ${
                    item.badge.length <= 1 ? 'h-[15px] w-[15px] min-w-[15px]' : 'h-[14px] min-w-[20px] px-[3px]'
                  }`}
                  style={{ fontWeight: 450 }}
                >
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
