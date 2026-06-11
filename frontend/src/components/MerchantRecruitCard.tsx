export function MerchantRecruitCard() {
  return (
    <section className="mx-[6px] mt-[10px] rounded-[12px] bg-white px-[14px] pb-[10px] pt-[8px] shadow-[0_10px_24px_rgba(35,39,49,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#25272d]">
            官方招商会现场，等你来！
          </h3>
          <div className="mt-[6px] truncate text-[14px] leading-[1.35] text-[#9da0a8]">
            点击查看附近最新生意机会及平台新玩法
          </div>
        </div>
        <span className="-mr-[10px] -mt-[15px] shrink-0 text-[22px] font-light leading-none text-[#c9cbd3]">×</span>
      </div>
      <div className="mt-[12px] flex items-end justify-between gap-3">
        <div className="text-[14px] text-[#a3a6af]">官方招商</div>
        <button className="inline-flex items-center gap-0 text-[14px] font-normal text-[#476ee6]">
          查看详情
          <img src="/extracted_icons/进入箭头.svg" alt="" className="-ml-[8px] h-[20px] w-[20px] object-contain" />
        </button>
      </div>
    </section>
  );
}
