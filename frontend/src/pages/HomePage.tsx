import { useEffect, useRef, useState } from 'react';
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

const CONTENT_TOP = 66;
const CONTENT_RED_BOTTOM = 24;
const STATS_RED_BACKDROP_HEIGHT = 92;
const REFRESH_INDICATOR_TOP = -34;

export function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const { config, error, loading, fetchRemote } = useConfigStore();

  useEffect(() => {
    void fetchRemote();
  }, [fetchRemote]);

  const pull = usePullToRefresh(scrollRef, async () => {
    await fetchRemote('refresh');
  });
  const redExtension = Math.max(0, CONTENT_RED_BOTTOM - scrollTop);

  return (
    <PhoneShell>
      <div className="relative h-[100svh] overflow-hidden bg-[#f5f5f7] md:min-h-[844px] md:max-h-[932px] md:rounded-[34px]">
        <div
          className="pointer-events-none fixed inset-x-0 top-0 bg-[#e5392c] md:hidden"
          style={{
            height: `calc(${CONTENT_TOP + redExtension + pull.pullDistance}px + env(safe-area-inset-top))`,
            transition: pull.status === 'refreshing' || pull.status === 'success' ? 'height 220ms ease' : 'none'
          }}
        />
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-[#00d084] md:hidden" />
        <div
          className="pointer-events-none fixed inset-x-0 z-50 h-[2px] bg-[#00a3ff] md:hidden"
          style={{
            top: `calc(${CONTENT_TOP + redExtension + pull.pullDistance}px + env(safe-area-inset-top))`,
            transition: pull.status === 'refreshing' || pull.status === 'success' ? 'top 220ms ease' : 'none'
          }}
        />
        <HomeHeader store={config.store} />
        <div
          className="absolute inset-x-0 bottom-0 z-10 bg-transparent"
          style={{
            top: `${CONTENT_TOP}px`,
            transform: `translateY(${pull.pullDistance}px)`,
            transition: pull.status === 'refreshing' || pull.status === 'success' ? 'transform 220ms ease' : 'none'
          }}
        >
          <RefreshIndicator
            status={pull.status}
            pullDistance={pull.pullDistance}
            top={REFRESH_INDICATOR_TOP}
          />
          <div
            ref={scrollRef}
            className="hide-scrollbar relative h-full overflow-y-auto overscroll-contain"
            style={{
              WebkitOverflowScrolling: 'touch',
              userSelect: 'none',
              overscrollBehaviorY: 'contain'
            }}
            onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
            {...pull.bind}
          >
            {loading ? (
              <LoadingState text="首页配置加载中..." />
            ) : error ? (
              <ErrorState message={error} onRetry={() => void fetchRemote()} />
            ) : (
              <>
                <div
                  className="relative overflow-visible"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 z-0 md:hidden"
                    style={{
                      height: `${STATS_RED_BACKDROP_HEIGHT}px`,
                      background:
                        'linear-gradient(180deg,#e5392c 0%,#e5392c 54%,#eb5a45 74%,rgba(245,245,247,0.42) 90%,rgba(245,245,247,0) 100%)'
                    }}
                  />
                  <div className="relative z-10">
                    <StatsCard stats={config.stats} />
                  </div>
                </div>
                <div className="bg-[#f5f5f7] pb-32 pt-[6px]">
                  <MenuGrid menus={config.menus} />
                  <ChipGrid chips={config.chips} />
                  <WorkOrderCard config={config.workOrder} />
                  <ImproveCard config={config.improveCard} />
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
