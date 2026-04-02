import clsx from 'clsx';

export { clsx };

export function sortByVisibleAndSort<T extends { visible: boolean; sort: number }>(items: T[]) {
  return [...items]
    .filter((item) => item.visible)
    .sort((a, b) => a.sort - b.sort);
}

export function getBadgeText(badge: string) {
  return badge.length > 3 ? badge : badge;
}

export function getPlaceholder(label: string, color = '#ffefe9') {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="24" fill="${color}"/>
      <circle cx="60" cy="42" r="20" fill="#ffffff" opacity="0.9"/>
      <rect x="24" y="72" width="72" height="18" rx="9" fill="#ffffff" opacity="0.9"/>
      <text x="60" y="108" font-size="14" fill="#e4563f" text-anchor="middle" font-family="Arial">${label}</text>
    </svg>
  `)}`;
}
