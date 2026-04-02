import type { StatItem } from '../types/config';

export function StatsCard({ stats }: { stats: StatItem[] }) {
  const top = stats.filter((item) => item.group === 'top');
  const bottom = stats.filter((item) => item.group === 'bottom');
  const alertLabels = new Set(['待发货', '退款售后']);

  const renderRow = (items: StatItem[]) => (
    <div className="grid grid-cols-5 gap-y-[6px]">
      {items.map((item) => (
        <div key={`${item.group}-${item.label}`} className="flex min-w-0 flex-col items-center text-center">
          <div className="relative text-[17px] font-semibold leading-none tracking-[-0.02em] text-[#26272d]">
            {item.value}
            {alertLabels.has(item.label) && (
              <img
                src="/extracted_icons/感叹号 (1).svg"
                alt="提示"
                className="absolute -right-[8px] -top-[4px] h-[8px] w-[8px] object-contain"
              />
            )}
          </div>
          <div className="mt-[6px] truncate text-[11px] leading-none text-[#7a7c85]">{item.label}</div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="mx-[6px] rounded-[8px] bg-white px-2.5 pb-[14px] pt-[16px] shadow-[0_10px_24px_rgba(35,39,49,0.08)]">
      {renderRow(top)}
      <div className="h-[12px]" />
      {renderRow(bottom)}
    </section>
  );
}
