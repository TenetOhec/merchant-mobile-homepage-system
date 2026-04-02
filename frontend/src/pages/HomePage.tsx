import { useEffect, useRef } from 'react';
import { BottomNav } from '../components/BottomNav';
import { ChipGrid } from '../components/ChipGrid';
import { ErrorState } from '../components/ErrorState';
import { HomeHeader } from '../components/HomeHeader';
import { ImproveCard } from '../components/ImproveCard';
import { LoadingState } from '../components/LoadingState';
import { MenuGrid } from '../components/MenuGrid';
import { PhoneShell } from '../components/PhoneShell';
import { RefreshIndicator } from '../components/RefreshIndicator';
import { StatsCard } from '../components/StatsCard';
import { WorkOrderCard } from '../components/WorkOrderCard';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { useConfigStore } from '../store/configStore';

export function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { config, error, loading, fetchRemote } = useConfigStore();

  useEffect(() => {
    void fetchRemote();
  }, [fetchRemote]);

  const pull = usePullToRefresh(scrollRef, async () => {
    await fetchRemote('refresh');
  });
  return (
    <PhoneShell>
      <div className="relative h-[100svh] min-h-[844px] max-h-[932px] overflow-hidden rounded-[34px] bg-[#f5f5f7]">
        <HomeHeader store={config.store} />
        <RefreshIndicator status={pull.status} pullDistance={pull.pullDistance} />
        <div
          className="absolute inset-x-0 bottom-0 top-[100px] z-10 bg-transparent"
          style={{
            transform: `translateY(${pull.pullDistance}px)`,
            transition: pull.status === 'refreshing' || pull.status === 'success' ? 'transform 220ms ease' : 'none'
          }}
        >
          <div
            ref={scrollRef}
            className="hide-scrollbar relative h-full overflow-y-auto overscroll-contain"
            style={{
              WebkitOverflowScrolling: 'touch',
              userSelect: 'none',
              overscrollBehaviorY: 'contain'
            }}
            {...pull.bind}
          >
            {loading ? (
              <LoadingState text="首页配置加载中..." />
            ) : error ? (
              <ErrorState message={error} onRetry={() => void fetchRemote()} />
            ) : (
              <>
                <div
                  style={{
                    paddingTop: pull.status === 'refreshing' || pull.status === 'success' ? '0.9rem' : '0rem',
                    transition: 'padding-top 180ms ease'
                  }}
                >
                  <StatsCard stats={config.stats} />
                </div>
                <div className="pb-32 pt-[6px]">
                  <MenuGrid menus={config.menus} />
                  <ChipGrid chips={config.chips} />
                  <WorkOrderCard config={config.workOrder} />
                  <ImproveCard config={config.improveCard} />
                  <section className="mx-[6px] mt-[10px] rounded-[18px] bg-white px-3.5 py-3 shadow-[0_10px_24px_rgba(35,39,49,0.06)]">
                    <h3 className="text-[17px] font-semibold text-[#2e3037]">当前存在待发货订单，请及时发货</h3>
                    <p className="mt-1.5 text-[12px] text-[#8f929b]">待发货订单数据与首页配置联动，主要用于补足移动端首页纵向节奏。</p>
                  </section>
                </div>
              </>
            )}
          </div>
        </div>
        <BottomNav items={config.bottomNav} />
      </div>
    </PhoneShell>
  );
}
