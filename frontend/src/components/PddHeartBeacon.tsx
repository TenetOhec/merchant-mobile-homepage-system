interface PddHeartBeaconProps {
  progress: number;
  refreshing: boolean;
}

export function PddHeartBeacon({ progress, refreshing }: PddHeartBeaconProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const dashOffset = -clampedProgress * 100;

  return (
    <svg
      className={`pdd-heart-beacon${refreshing ? ' refreshing' : ''}`}
      width="28"
      height="28"
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
        style={refreshing ? undefined : { strokeDashoffset: dashOffset }}
      />
    </svg>
  );
}
