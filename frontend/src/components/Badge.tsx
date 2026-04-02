import { clsx } from '../lib/helpers';

interface BadgeProps {
  text: string;
  tone?: 'red' | 'orange' | 'gray';
  className?: string;
}

export function Badge({ text, tone = 'red', className }: BadgeProps) {
  if (!text) {
    return null;
  }

  return (
    <span
      className={clsx(
        'inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
        tone === 'red' && 'bg-[#ff5f4d] text-white',
        tone === 'orange' && 'bg-[#ff8742] text-white',
        tone === 'gray' && 'bg-[#f1f2f6] text-textSub',
        className
      )}
    >
      {text}
    </span>
  );
}
