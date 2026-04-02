export function LoadingState({ text = '加载中...' }: { text?: string }) {
  return (
    <div className="flex min-h-[240px] items-center justify-center text-sm text-textSub">
      <div className="rounded-full bg-white/80 px-4 py-2 shadow-sm">{text}</div>
    </div>
  );
}
