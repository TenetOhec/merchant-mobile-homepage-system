import { useEffect, useState } from 'react';
import type { MenuItem } from '../types/config';
import { sortByVisibleAndSort } from '../lib/helpers';

const menuAssetMap: Record<string, string> = {
  商品管理: '/extracted_icons/01_商品管理.png',
  营销工具: '/extracted_icons/02_营销工具.png',
  数据中心: '/extracted_icons/03_数据中心.png',
  推广平台: '/extracted_icons/05_推广平台.png',
  打单工具: '/extracted_icons/06_打单工具.png',
  追两体验: '/extracted_icons/07_质量体验.png',
  品质诊断: '/extracted_icons/08_品质诊断.png',
  防控中心: '/extracted_icons/09_防控中心.png',
  更多: '/extracted_icons/10_更多.png'
};

const marketingActivityImages = [
  '/extracted_icons/04_营销活动1.png',
  '/extracted_icons/04-营销活动2.png',
  '/extracted_icons/04-营销活动3.png'
];

const HOLD_MS = 1800;
const FADE_MS = 420;
const FLIP_MS = 420;
const FLIP_PAUSE_MS = 180;

function MarketingActivityIcon() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [transition, setTransition] = useState<'idle' | 'fade' | 'flip'>('idle');

  useEffect(() => {
    let timer = 0;

    if (transition === 'idle') {
      timer = window.setTimeout(() => {
        if (currentIndex === 0) {
          setNextIndex(1);
          setTransition('fade');
          return;
        }

        if (currentIndex === 1) {
          setNextIndex(2);
          setTransition('fade');
          return;
        }

        setTransition('flip');
      }, HOLD_MS);
    }

    if (transition === 'fade' && nextIndex !== null) {
      timer = window.setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex(null);
        setTransition('idle');
      }, FADE_MS);
    }

    if (transition === 'flip') {
      timer = window.setTimeout(() => {
        setCurrentIndex(0);
        setTransition('idle');
      }, FLIP_MS + FLIP_PAUSE_MS);
    }

    return () => {
      window.clearTimeout(timer);
    };
  }, [currentIndex, nextIndex, transition]);

  if (transition === 'fade' && nextIndex !== null) {
    return (
      <div className="relative h-[42px] w-[42px]">
        <img
          src={marketingActivityImages[currentIndex]}
          alt="营销活动"
          className="absolute inset-0 h-[42px] w-[42px] object-contain"
          style={{
            animation: `marketingFadeOut ${FADE_MS}ms ease forwards`
          }}
        />
        <img
          src={marketingActivityImages[nextIndex]}
          alt="营销活动"
          className="absolute inset-0 h-[42px] w-[42px] object-contain"
          style={{
            animation: `marketingFadeIn ${FADE_MS}ms ease forwards`
          }}
        />
      </div>
    );
  }

  return (
    <img
      src={marketingActivityImages[currentIndex]}
      alt="营销活动"
      className="h-[42px] w-[42px] object-contain"
      style={
        transition === 'flip'
          ? {
              animation: `marketingFlipOut ${FLIP_MS}ms cubic-bezier(0.32, 0.72, 0.2, 1) forwards`,
              transformStyle: 'preserve-3d'
            }
          : {
              animation: `marketingPulse 1.45s ease-in-out infinite`
            }
      }
    />
  );
}

export function MenuGrid({ menus }: { menus: MenuItem[] }) {
  const visibleMenus = sortByVisibleAndSort(menus).slice(0, 10);

  return (
    <section className="mx-[6px] mt-[3px] rounded-[8px] bg-white px-[4px] py-[10px] shadow-[0_10px_24px_rgba(35,39,49,0.06)]">
      <style>{`
        @keyframes marketingPulse {
          0% { transform: scale(0.95); }
          50% { transform: scale(1.03); }
          100% { transform: scale(0.95); }
        }
        @keyframes marketingFadeIn {
          from { opacity: 0; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.03); }
          to { opacity: 1; transform: scale(0.98); }
        }
        @keyframes marketingFadeOut {
          from { opacity: 1; transform: scale(0.98); }
          to { opacity: 0; transform: scale(1.05); }
        }
        @keyframes marketingFlipOut {
          0% { opacity: 1; transform: rotateY(0deg) scale(0.96); }
          35% { opacity: 1; transform: rotateY(80deg) scale(1.03); }
          75% { opacity: 1; transform: rotateY(180deg) scale(0.97); }
          100% { opacity: 1; transform: rotateY(180deg) scale(0.97); }
        }
      `}</style>
      <div className="grid grid-cols-5 gap-y-[8px]">
        {visibleMenus.map((item) => {
          const assetIcon = menuAssetMap[item.title];
          return (
            <div key={item.title} className="relative flex flex-col items-center gap-[1px] px-[1px]">
              <div className="relative flex h-[48px] w-[48px] items-center justify-center">
                {item.title === '营销活动' ? (
                  <MarketingActivityIcon />
                ) : assetIcon ? (
                  <img src={assetIcon} alt={item.title} className="h-[42px] w-[42px] object-contain" />
                ) : (
                  <div className="h-[42px] w-[42px]" />
                )}
              </div>
              <div className="text-center text-[11px] leading-[1.08] text-[#2f3137]">{item.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
