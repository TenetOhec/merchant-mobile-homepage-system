import type { ImproveCardConfig } from '../types/config';

export function ImproveCard({ config, onClose }: { config: ImproveCardConfig; onClose?: () => void }) {
  return (
    <section className="mx-[6px] mt-[10px] rounded-[8px] bg-white px-[14px] pb-[10px] pt-[8px] shadow-[0_10px_24px_rgba(35,39,49,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[14px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#25272d]">商家基础运营培训-商办&amp;住宅家具</h3>
          <div className="mt-[8px] truncate text-[13px] text-[#a3a6af]">
            {config.traffic}
            <span className="px-2 text-[#d2d4db]">|</span>
            {config.order}
          </div>
        </div>
        <div className="relative flex items-start gap-2">
          <img src="/training-card.png" alt="商家基础运营培训" className="translate-x-[20px] h-[73px] w-[95px] shrink-0 rounded-[12px] object-cover" />
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            className="relative z-10 -mr-[10px] -mt-[12px] shrink-0 appearance-none bg-transparent p-0 text-[22px] font-light leading-none text-[#c9cbd3]"
          >
            ×
          </button>
        </div>
      </div>
      <div className="mt-[11px] flex items-end justify-between gap-3">
        <div className="text-[14px] text-[#a3a6af]">拼多多课堂</div>
        <button className="inline-flex items-center gap-0 text-[14px] font-normal text-[#476ee6]">
          立即报名
          <img src="/extracted_icons/进入箭头.svg" alt="" className="-ml-[8px] h-[20px] w-[20px] object-contain" />
        </button>
      </div>
    </section>
  );
}
