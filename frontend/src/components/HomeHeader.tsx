import { ChevronDown, Search } from 'lucide-react';
import type { StoreConfig } from '../types/config';
import { getPlaceholder } from '../lib/helpers';
import { StatusBar } from './StatusBar';

export function HomeHeader({ store }: { store: StoreConfig }) {
  return (
    <header className="absolute inset-x-0 top-0 z-0 overflow-hidden bg-[linear-gradient(180deg,#e5392c_0%,#e5392c_68%,#eb5a45_82%,rgba(245,245,247,0.08)_100%)] px-[14px] pb-[115px] text-white">
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[126px] bg-[linear-gradient(180deg,rgba(229,57,44,0)_0%,rgba(233,71,52,0.36)_28%,rgba(238,112,90,0.22)_58%,rgba(245,245,247,0)_100%)]" />
      <StatusBar />
      <div className="relative flex items-start justify-between pb-1 pt-0.5">
        <div className="flex items-start gap-2.5">
          <img
            src={store.avatar || getPlaceholder('店铺', '#220f0c')}
            alt={store.name}
            className="h-[42px] w-[42px] rounded-[10px] border border-white/18 object-cover shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
          />
          <div className="pt-[2px]">
            <div className="flex items-center gap-1">
              <h1 className="max-w-[172px] truncate text-[16px] font-semibold tracking-[0.01em] text-white">{store.name}</h1>
              <ChevronDown size={13} strokeWidth={2.6} />
            </div>
            <div className="mt-1 inline-flex max-w-[188px] items-center rounded-full bg-white px-2.5 py-[3px] text-[11px] font-medium leading-none text-[#bf5a43] shadow-[0_4px_10px_rgba(153,46,30,0.12)]">
              <span className="truncate">{store.notice}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 pr-[2px] pt-0.5">
          {store.showSearch && (
            <button className="flex flex-col items-center gap-0.5 text-white">
              <Search size={20} strokeWidth={2.1} />
              <span className="text-[10px] leading-none text-white/95">搜索</span>
            </button>
          )}
          {store.showScan && (
            <button className="flex flex-col items-center gap-0.5 text-white">
              <img
                src="/扫一扫.svg"
                alt="扫一扫"
                className="h-5 w-5 object-contain brightness-0 invert"
              />
              <span className="text-[10px] leading-none text-white/95">扫码</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
