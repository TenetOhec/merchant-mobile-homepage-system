import type { PropsWithChildren } from 'react';

interface AdminSectionProps extends PropsWithChildren {
  title: string;
  description?: string;
}

export function AdminSection({ title, description, children }: AdminSectionProps) {
  return (
    <section className="rounded-[28px] bg-white p-5 shadow-card">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="mt-1 text-sm text-textSub">{description}</p>}
      </div>
      {children}
    </section>
  );
}
