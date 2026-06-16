import { PddHeartBeacon } from './PddHeartBeacon';
import { PULL_TO_REFRESH_THRESHOLD } from '../hooks/usePullToRefresh';

interface RefreshIndicatorProps {
  status: 'refreshing' | 'success' | 'idle' | 'pulling' | 'ready';
  pullDistance: number;
  top?: number;
}

export function RefreshIndicator({ status, pullDistance, top = 40 }: RefreshIndicatorProps) {
  if (status === 'idle') {
    return null;
  }

  const progress = status === 'success' ? 0 : Math.min(pullDistance / PULL_TO_REFRESH_THRESHOLD, 1);
  const animating = status === 'ready' || status === 'refreshing';
  const successDashOffset = 82;
  const label =
    status === 'refreshing' ? '正在刷新' : status === 'success' ? '刷新完成' : status === 'ready' ? '松手刷新' : '下拉刷新';

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-30 flex justify-center"
      style={{ top: `${top}px` }}
    >
      <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-[0.01em] text-white">
        <PddHeartBeacon progress={progress} animating={animating} dashOffset={status === 'success' ? successDashOffset : undefined} />
        <span>{label}</span>
      </div>
    </div>
  );
}
