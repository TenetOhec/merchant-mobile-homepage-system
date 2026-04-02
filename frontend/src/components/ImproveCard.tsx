import type { ImproveCardConfig } from '../types/config';

export function ImproveCard({ config }: { config: ImproveCardConfig }) {
  return (
    <section
      className="mx-[6px] mt-[10px] overflow-hidden rounded-[14px] bg-white shadow-[0_10px_24px_rgba(35,39,49,0.06)]"
      aria-label={config.title}
    >
      <img src="/return-shipping-card.png" alt={config.title} className="block w-full object-cover" />
    </section>
  );
}
