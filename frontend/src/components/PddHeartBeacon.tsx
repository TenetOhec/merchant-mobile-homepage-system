interface PddHeartBeaconProps {
  progress: number;
  animating: boolean;
  dashOffset?: number;
}

export function PddHeartBeacon({ progress, animating, dashOffset }: PddHeartBeaconProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const progressDashOffset = dashOffset ?? -clampedProgress * 100;

  return (
    <svg
      className={`pdd-heart-beacon${animating ? ' refreshing' : ''}`}
      width="24"
      height="24"
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className="pdd-heart-path"
        d="M36 56 L15 37 V22 L24 15 L36 22 L48 15 L57 22 V37 L36 56Z"
        fill="none"
        stroke="#FFF8F0"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
        strokeDasharray="86 14"
        style={animating ? undefined : { strokeDashoffset: progressDashOffset }}
      />
    </svg>
  );
}
