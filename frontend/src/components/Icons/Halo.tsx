export function HaloIcon({
  size = "1rem",
  className,
}: {
  size?: number | string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 70.91 125.37"
      height={size}
      width={size}
      className={className}
    >
      <defs>
        <linearGradient
          id="c"
          x1="37.35"
          y1="42.21"
          x2="37.35"
          y2="2.1"
          xlinkHref="#a"
        >
          <stop offset="0" stop-color="#2575fc" stop-opacity=".9" />
          <stop offset=".64" stop-color="#6a11cb" stop-opacity=".2" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="43.45"
          y1="22.3"
          x2="62.29"
          y2="54.94"
          xlinkHref="#a"
        >
          <stop offset=".11" stop-color="#6a11cb" stop-opacity=".5" />
          <stop offset="1" stop-color="#2575fc" stop-opacity=".3" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="8.61"
          y1="16.03"
          x2="8.61"
          y2="77.88"
          xlinkHref="#a"
        >
          <stop offset="0" stop-color="#2575fc" stop-opacity="0" />
          <stop offset="1" stop-color="#6a11cb" />
        </linearGradient>
        <linearGradient
          id="e"
          x1="22.81"
          y1="64.56"
          x2="22.81"
          y2="91.21"
          xlinkHref="#a"
        >
          <stop offset=".1" stop-color="#6a11cb" />
          <stop offset="1" stop-color="#2575fc" stop-opacity=".3" />
        </linearGradient>
        <linearGradient
          id="f"
          x1="24.72"
          y1="77.88"
          x2="24.72"
          y2="125.37"
          xlinkHref="#a"
        >
          <stop offset="0" stop-color="#6a11cb" stop-opacity=".8" />
          <stop offset=".37" stop-color="#2575fc" stop-opacity=".8" />
        </linearGradient>
        <linearGradient
          id="g"
          x1="43.38"
          y1="64.56"
          x2="43.38"
          y2="125.37"
          xlinkHref="#b"
        />
        <linearGradient
          id="h"
          x1="58.22"
          y1="6.5"
          x2="58.22"
          y2="125.37"
          xlinkHref="#a"
        >
          <stop offset=".09" stop-color="#6a11cb" />
          <stop offset=".99" stop-color="#2575fc" stop-opacity=".2" />
        </linearGradient>
        <linearGradient
          id="i"
          x1="22.89"
          y1="40.11"
          x2="22.89"
          y2="77.88"
          xlinkHref="#a"
        >
          <stop offset="0" stop-color="#2575fc" stop-opacity=".3" />
          <stop offset=".68" stop-color="#6a11cb" stop-opacity=".3" />
        </linearGradient>
        <linearGradient id="a" gradientUnits="userSpaceOnUse" />
      </defs>
      <g fill="#0a071b">
        <path d="M3.96 16.03L29.08 0l41.83 6.5L17.3 40.11 3.96 16.03zM70.91 6.5L45.7 64.56 17.3 40.11 70.91 6.5z" />
        <path d="M3.96 16.03L17.3 40.11.08 77.88l3.88-61.85zM37.41 91.21l8.29-26.65L.08 77.88l37.33 13.33z" />
        <path d="M49.52 125.37L37.41 91.21.08 77.88l49.44 47.49zM45.7 64.56l3.82 60.81-12.11-34.16 8.29-26.65z" />
        <path d="M70.91 6.5L49.52 125.37 45.7 64.56 70.91 6.5z" />
      </g>
      <path
        d="M3.88 16.03L29 0l41.82 6.5-53.6 33.61L3.88 16.03z"
        fill="url(#c)"
      />
      <path d="M70.82 6.5l-25.2 58.06-28.4-24.45L70.82 6.5z" fill="url(#d)" />
      <path d="M3.88 16.03l13.34 24.08L0 77.88l3.88-61.85z" fill="url(#b)" />
      <path d="M37.33 91.21l8.29-26.65L0 77.88l37.33 13.33z" fill="url(#e)" />
      <path d="M49.44 125.37L37.33 91.21 0 77.88l49.44 47.49z" fill="url(#f)" />
      <path
        d="M45.62 64.56l3.82 60.81-12.11-34.16 8.29-26.65z"
        fill="url(#g)"
      />
      <path d="M70.82 6.5L49.44 125.37l-3.82-60.81L70.82 6.5z" fill="url(#h)" />
      <path d="M45.62 64.56l-28.4-24.45L0 77.88l45.62-13.32z" fill="#0a071b" />
      <path d="M.08 77.88L45.7 64.56 17.3 40.11" fill="url(#i)" />
    </svg>
  );
}
