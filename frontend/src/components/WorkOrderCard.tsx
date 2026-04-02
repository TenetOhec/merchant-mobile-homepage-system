import type { WorkOrderConfig } from '../types/config';

export function WorkOrderCard({ config }: { config: WorkOrderConfig }) {
  return (
    <section className="mx-[6px] mt-[10px] rounded-[14px] bg-white px-[12px] pb-[10px] pt-[8px] shadow-[0_10px_24px_rgba(35,39,49,0.06)]">
      <h3 className="pr-3 text-[15px] font-semibold leading-[1.35] text-[#34363d]">{config.title}</h3>
      <div className="mt-2 flex items-start gap-3 px-[2px] py-[2px]">
        <div className="w-[56px] shrink-0">
          <img
            src={config.imageUrl || '/image.png'}
            alt="工单提醒"
            className="h-[65px] w-[45px] rounded-[4px] object-cover"
          />
          <div className="mt-[9px] text-[13px] text-[#a2a5ae]">工单管理</div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col self-stretch">
          <div className="grid grid-cols-2 gap-2 pl-[25px] pr-1 pt-1">
            <div>
              <div className="text-[13px] text-[#a2a5ae]">订单金额</div>
              <div className="mt-[4px] flex items-end gap-[2px] leading-none text-[#2c2f36]">
                <span className="text-[22px] font-semibold">{config.amount}</span>
                <span className="pb-[2px] text-[12px] text-[#2c2f36]">元</span>
              </div>
            </div>
            <div>
              <div className="text-[13px] text-[#a2a5ae]">距逾期时间</div>
              <div className="mt-[4px] text-[17px] font-semibold leading-none text-[#2c2f36]">{config.countdown}</div>
            </div>
          </div>
          <div className="mt-auto flex justify-end pr-1 pt-[12px]">
            <button className="inline-flex items-center gap-0 text-[15px] font-normal text-[#476ee6]">
              {config.buttonText}
              <img src="/extracted_icons/进入箭头.svg" alt="" className="-ml-[8px] h-[20px] w-[20px] object-contain" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
