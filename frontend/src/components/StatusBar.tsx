import { BatteryFull, Signal, Wifi } from 'lucide-react';

export function StatusBar() {
  return (
    <div className="relative flex items-center justify-between px-[12px] pb-[7px] pt-[7px] text-[11px] font-semibold text-white safe-top">
      <span className="relative z-10 tracking-[-0.01em]">12:39</span>
      <span className="pointer-events-none absolute left-1/2 top-[calc(env(safe-area-inset-top)+11px)] -translate-x-1/2 text-[11px] font-medium leading-none opacity-95">
        拼多多商家版
      </span>
      <div className="relative z-10 flex items-center gap-1.5">
        <Signal size={11} strokeWidth={2.2} />
        <Wifi size={11} strokeWidth={2.2} />
        <div className="flex items-center gap-1 rounded-full bg-white/12 px-1.5 py-[1px]">
          <BatteryFull size={11} strokeWidth={2.2} />
          <span className="text-[10px]">27%</span>
        </div>
      </div>
    </div>
  );
}
