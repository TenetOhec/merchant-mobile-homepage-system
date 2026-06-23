import type { BottomNavItem } from '../types/config';

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  const chatItem = items.find((item) => item.label === '聊天');

  return (
    <nav className="absolute inset-x-0 bottom-0 z-30">
      <img src="/底部2.jpg" alt="底部导航" className="block w-full object-cover" />
      {chatItem?.visible !== false && chatItem?.badge && (
        <span
          className={`absolute left-[31.09%] top-[1.9px] inline-flex items-center justify-center rounded-full bg-[#ff5f4d] text-[12px] leading-none text-white ${
            chatItem.badge.length <= 1 ? 'h-[15px] w-[15px] min-w-[15px]' : 'h-[14px] min-w-[20px] px-[3px]'
          }`}
          style={{ fontWeight: 450 }}
        >
          {chatItem.badge}
        </span>
      )}
    </nav>
  );
}
