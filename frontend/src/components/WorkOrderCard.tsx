import type { WorkOrderConfig } from '../types/config';

export function WorkOrderCard({ config }: { config: WorkOrderConfig }) {
  return (
    <section className="mx-[6px] mt-[10px] rounded-[14px] bg-white px-[14px] pb-[10px] pt-[8px] shadow-[0_10px_24px_rgba(35,39,49,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[15px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#25272d]">提升消费体验，享退货包运费标识</h3>
        <span className="-mr-[10px] -mt-[15px] shrink-0 text-[22px] font-light leading-none text-[#c9cbd3]">×</span>
      </div>
      <div className="mt-[10px] grid grid-cols-2 gap-x-5">
        <div>
          <div className="text-[13px] leading-none text-[#a3a6af]">流量预计提升</div>
          <div className="mt-[6px] flex items-end gap-[2px] leading-none text-[#25272d]">
            <span className="text-[24px] font-semibold tracking-[-0.03em]">{config.amount}</span>
            <span className="pb-[2px] text-[14px] font-semibold">%</span>
            <span className="mb-[1px] inline-flex h-[22px] w-[18px] items-center justify-center rounded-[2px] bg-white">
              <img src="/up.png" alt="" className="h-[22px] w-[18px] object-contain" />
            </span>
          </div>
        </div>
        <div>
          <div className="text-[13px] leading-none text-[#a3a6af]">订单预计提升</div>
          <div className="mt-[6px] flex items-end gap-[2px] leading-none text-[#25272d]">
            <span className="text-[24px] font-semibold tracking-[-0.03em]">{config.countdown}</span>
            <span className="pb-[2px] text-[14px] font-semibold">%</span>
            <span className="mb-[1px] inline-flex h-[22px] w-[18px] items-center justify-center rounded-[2px] bg-white">
              <img src="/up.png" alt="" className="h-[22px] w-[18px] object-contain" />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-[11px] flex items-end justify-between gap-3">
        <div className="text-[14px] text-[#a3a6af]">消费者体验提升计划</div>
        <button className="inline-flex items-center gap-0 text-[14px] font-normal text-[#476ee6]">
          去开通
          <img src="/extracted_icons/进入箭头.svg" alt="" className="-ml-[8px] h-[20px] w-[20px] object-contain" />
        </button>
      </div>
    </section>
  );
}
