import { useEffect, useState } from 'react';

/**
 * Animates a number from 0 → `target` over `duration` ms
 * using an ease-out-quart curve. Only starts when `active` is true.
 */
export function useCountUp(
  target: number,
  active: boolean,
  duration = 1800,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || !target) return;

    let startTime = 0;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4); // ease-out-quart

      setValue(Math.round(eased * target));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return value;
}