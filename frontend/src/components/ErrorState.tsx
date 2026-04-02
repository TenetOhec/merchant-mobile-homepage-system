interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="mx-4 mt-8 rounded-[24px] bg-white p-5 text-center shadow-card">
      <div className="text-[14px] text-[#d84d38]">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-full bg-appRed px-4 py-2 text-[13px] font-semibold text-white"
        >
          重新加载
        </button>
      )}
    </div>
  );
}
