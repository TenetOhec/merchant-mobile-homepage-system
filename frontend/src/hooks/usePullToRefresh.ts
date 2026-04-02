import type { MouseEvent, RefObject, TouchEvent } from 'react';
import { useRef, useState } from 'react';

type PullStatus = 'idle' | 'pulling' | 'ready' | 'refreshing' | 'success';

const THRESHOLD = 10;
const MAX_PULL = 132;
const MIN_REFRESHING_MS = 600;
const SUCCESS_MS = 900;

export function usePullToRefresh<T extends HTMLElement>(
  containerRef: RefObject<T>,
  onRefresh: () => Promise<unknown>
) {
  const [pullDistance, setPullDistance] = useState(0);
  const [status, setStatus] = useState<PullStatus>('idle');
  const startYRef = useRef(0);
  const pullingRef = useRef(false);
  const triggeredRef = useRef(false);

  const beginPull = (clientY: number) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    if (container.scrollTop <= 0) {
      startYRef.current = clientY;
      pullingRef.current = true;
    }
  };

  const updatePull = (clientY: number, preventDefault?: () => void) => {
    const container = containerRef.current;
    if (!container || !pullingRef.current || status === 'refreshing' || status === 'success') {
      return;
    }

    if (container.scrollTop > 0) {
      pullingRef.current = false;
      return;
    }

    const diff = clientY - startYRef.current;
    if (diff <= 0) {
      setPullDistance(0);
      setStatus('idle');
      return;
    }

    preventDefault?.();
    const eased = Math.min(MAX_PULL, diff * 0.5);
    setPullDistance(eased);
    if (eased >= THRESHOLD) {
      setStatus('ready');
      void triggerRefresh();
      return;
    }
    setStatus('pulling');
  };

  const handleTouchStart = (event: TouchEvent<T>) => {
    beginPull(event.touches[0].clientY);
  };

  const handleTouchMove = (event: TouchEvent<T>) => {
    updatePull(event.touches[0].clientY, () => event.preventDefault());
  };

  const handleMouseDown = (event: MouseEvent<T>) => {
    if (event.button !== 0) {
      return;
    }
    beginPull(event.clientY);
  };

  const handleMouseMove = (event: MouseEvent<T>) => {
    if (event.buttons !== 1) {
      return;
    }
    updatePull(event.clientY, () => event.preventDefault());
  };

  const reset = () => {
    pullingRef.current = false;
    triggeredRef.current = false;
    setPullDistance(0);
    setStatus('idle');
  };

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    });

  const triggerRefresh = async () => {
    if (triggeredRef.current) {
      return;
    }
    triggeredRef.current = true;
    setStatus('refreshing');
    setPullDistance(16);
    const start = Date.now();
    try {
      await onRefresh();
      const elapsed = Date.now() - start;
      if (elapsed < MIN_REFRESHING_MS) {
        await wait(MIN_REFRESHING_MS - elapsed);
      }
      setStatus('success');
    } finally {
      window.setTimeout(reset, SUCCESS_MS);
    }
  };

  const handleTouchEnd = async () => {
    if (!triggeredRef.current) {
      reset();
    }
  };

  const handleMouseUp = async () => {
    if (!triggeredRef.current) {
      reset();
    }
  };

  return {
    pullDistance,
    status,
    bind: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp
    }
  };
}
