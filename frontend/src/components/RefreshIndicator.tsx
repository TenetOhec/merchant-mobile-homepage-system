interface RefreshIndicatorProps {
  status: 'refreshing' | 'success' | 'idle' | 'pulling' | 'ready';
  pullDistance: number;
}

export function RefreshIndicator({ status, pullDistance }: RefreshIndicatorProps) {
  if (status !== 'refreshing' && status !== 'success') {
    return null;
  }

  const top = 76 + Math.min(8, pullDistance * 0.06);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-30 flex justify-center"
      style={{ top: `${top}px` }}
    >
      <div className="rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-[0.01em] text-white">
        {status === 'refreshing' ? '正在刷新' : '刷新完成'}
      </div>
    </div>
  );
}
