import type { StatItem } from '../types/config';

function formatStatValue(value: string) {
  const normalizedValue = value.replace(/,/g, '');
  const numericValue = Number(normalizedValue);

  if (!Number.isFinite(numericValue) || Math.abs(numericValue) < 10000) {
    return { value, unit: '' };
  }

  return { value: (numericValue / 10000).toFixed(2), unit: '万' };
}

export function StatsCard({ stats }: { stats: StatItem[] }) {
  const top = stats.filter((item) => item.group === 'top');
  const bottom = stats.filter((item) => item.group === 'bottom');
  const alertLabels = new Set(['待发货', '退款售后']);

  const renderRow = (items: StatItem[]) => (
    <div className="grid grid-cols-5 gap-y-[6px]">
      {items.map((item) => {
        const formattedValue = formatStatValue(item.value);

        return (
          <div key={`${item.group}-${item.label}`} className="flex min-w-0 flex-col items-center text-center">
            <div className="relative text-[17px] font-semibold leading-none tracking-[-0.02em] text-[#26272d]">
              <span className="inline-flex origin-center scale-y-[1.2] items-baseline">
                <span>{formattedValue.value}</span>
                {formattedValue.unit && (
                  <span className="ml-[1px] text-[10px] font-semibold" style={{ WebkitTextStroke: '0.25px currentColor' }}>
                    {formattedValue.unit}
                  </span>
                )}
              </span>
              {alertLabels.has(item.label) && (
                <img
                  src="/extracted_icons/感叹号 (1).svg"
                  alt="提示"
                  className="absolute -right-[8px] -top-[4px] h-[8px] w-[8px] object-contain"
                />
              )}
            </div>
            <div className="mt-[8px] truncate text-[14px] leading-none text-[#6e7078]">{item.label}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="mx-[6px] rounded-[8px] bg-white px- pb-[14px] pt-[13.5px] shadow-[0_10px_24px_rgba(35,39,49,0.08)]">
      {renderRow(top)}
      <div className="h-[18px]" />
      {renderRow(bottom)}
    </section>
  );
}
