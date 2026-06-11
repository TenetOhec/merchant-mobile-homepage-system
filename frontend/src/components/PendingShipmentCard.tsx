import type { PendingShipmentConfig } from '../types/config';

export function PendingShipmentCard({ config }: { config: PendingShipmentConfig }) {
  return (
    <section className="mx-[6px] mt-[10px] rounded-[12px] bg-white px-[14px] pb-[10px] pt-[8px] shadow-[0_10px_24px_rgba(35,39,49,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#25272d]">
          当前存在待发货订单，请及时发货
        </h3>
        <span className="-mr-[10px] -mt-[15px] shrink-0 text-[22px] font-light leading-none text-[#c9cbd3]">×</span>
      </div>
      <div className="mt-[12px] text-[14px] leading-none text-[#a3a6af]">待发货订单</div>
      <div className="mt-[8px] flex items-end gap-[3px] leading-none text-[#25272d]">
        <span className="text-[28px] font-semibold tracking-[-0.03em]">{config.count}</span>
        <span className="pb-[3px] text-[14px] font-semibold">单</span>
      </div>
      <div className="mt-[22px] flex items-end justify-between gap-3">
        <div className="text-[14px] text-[#a3a6af]">订单查询-待发货</div>
        <button className="inline-flex items-center gap-0 text-[14px] font-normal text-[#476ee6]">
          去发货
          <img src="/extracted_icons/进入箭头.svg" alt="" className="-ml-[8px] h-[20px] w-[20px] object-contain" />
        </button>
      </div>
    </section>
  );
}
