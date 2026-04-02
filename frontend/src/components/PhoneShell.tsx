import type { PropsWithChildren } from 'react';

export function PhoneShell({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center px-4 py-6 sm:px-6">
      <div className="relative w-full max-w-[430px] overflow-hidden rounded-[42px] border border-white/70 bg-black/90 shadow-shell backdrop-blur md:min-h-[880px]">
        <div className="pointer-events-none absolute inset-[10px] rounded-[34px] border border-white/10" />
        <div className="relative rounded-[34px] bg-appBg">{children}</div>
      </div>
    </div>
  );
}
