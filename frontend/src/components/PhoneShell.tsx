import type { PropsWithChildren } from 'react';

export function PhoneShell({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center md:px-4 md:py-6 md:sm:px-6">
      <div className="relative min-h-screen w-full overflow-hidden bg-appBg md:min-h-[880px] md:max-w-[430px] md:rounded-[42px] md:border md:border-white/70 md:bg-black/90 md:shadow-shell md:backdrop-blur">
        <div className="pointer-events-none absolute inset-[10px] hidden rounded-[34px] border border-white/10 md:block" />
        <div className="relative min-h-screen bg-appBg md:min-h-[880px] md:rounded-[34px]">{children}</div>
      </div>
    </div>
  );
}
