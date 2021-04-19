export function HaloIcon({
  size = "1rem",
  className,
}: {
  size?: number | string;
  className?: string;
}) {
  return (
    <svg
      fill="none"
      viewBox="0 0 261 460"
      className={className}
      height={size}
      width={size}
    >
      <g clip-path="url(#H)">
        <path
          fill="url(#A)"
          d="M63.931 145.19L14.925 58.31c-.213-.55-.228-1.157-.042-1.717a2.53 2.53 0 0 1 1.063-1.349L104.77.049c.426-.263 1.646.715 2.042 1.022.306-1.022 2.007-1.168 3.063-1.022l149.062 20.442c.683.102 1.898.346 2.042 1.022.016.399-.069.797-.247 1.154s-.445.664-.774.89L65.973 144.167a1.39 1.39 0 0 1-.748.086l-.274.937a.59.59 0 0 1-.26.026l-.76-.026zm0 0c.007.019 0 .026 0 .026s-.043-.026 0-.026z"
        />
        <path
          fill="url(#B)"
          d="M14.925 56.265L.631 283.174c-.019.224-.217.966 0 1.022s-.091-.817 0-1.022l63.3-137.985"
        />
        <path
          fill="url(#C)"
          d="M1.652 286.24l137.831 51.106 32.671-103.233L.631 282.152c-1.652 3.247.397 3.833 1.021 4.088z"
        />
        <path
          fill="url(#D)"
          d="M170.118 236.157l12.236 217.71c.016.239.256.981 0 1.023s-1.039.229-1.112 0l-43.381-121.632 32.257-97.101z"
        />
        <path
          fill="url(#E)"
          d="M259.957 23.557L180.96 458.978a4.43 4.43 0 0 1-1.054 1.022c-.13 0 .026-.897 0-1.022L168.32 240.245l91.637-216.688z"
        />
        <path fill="url(#F)" d="M64.886 145L0 284l168-48.675L64.886 145z" />
        <path
          fill="url(#G)"
          d="M181.342 458.978L.63 285.218l139.873 48.04 41.86 125.72c-.179.08-.375.118-.571.11-.158.016-.317-.023-.45-.11zm1.021 0c.091-.056.114-.015.107.025s-.024.052-.047.052-.041-.019-.06-.077zM64.951 144.166L256.894 25.601c.317-.158.666-.241 1.021-.241s.704.082 1.021.241c.408.354.211.52 0 1.022l-87.804 210.556-106.181-93.013z"
        />
      </g>
      <defs>
        <linearGradient
          id="A"
          x1="137.867"
          x2="137.867"
          y1=".001"
          y2="145.22"
          xlinkHref="#I"
        >
          <stop stop-color="#6a11cb" stop-opacity=".161" />
          <stop offset="1" stop-color="#2575fc" stop-opacity=".831" />
        </linearGradient>
        <linearGradient
          id="B"
          x1="32.231"
          x2="32.231"
          y1="56.265"
          y2="284.199"
          xlinkHref="#I"
        >
          <stop stop-color="#2575fc" stop-opacity="0" />
          <stop offset="1" stop-color="#6a11cb" />
        </linearGradient>
        <linearGradient
          id="C"
          x1="86.078"
          x2="86.078"
          y1="234.113"
          y2="337.346"
          xlinkHref="#I"
        >
          <stop stop-color="#6a11cb" />
          <stop offset="1" stop-color="#2575fc" stop-opacity=".4" />
        </linearGradient>
        <linearGradient
          id="D"
          x1="160.166"
          x2="160.166"
          y1="236.157"
          y2="455.001"
          xlinkHref="#I"
        >
          <stop stop-color="#6a11cb" />
          <stop offset="1" stop-color="#2575fc" stop-opacity=".259" />
        </linearGradient>
        <linearGradient
          id="E"
          x1="214.139"
          x2="214.139"
          y1="23.557"
          y2="460"
          xlinkHref="#I"
        >
          <stop stop-color="#6a11cb" />
          <stop offset="1" stop-color="#2575fc" stop-opacity=".02" />
        </linearGradient>
        <linearGradient id="F" x1="84" x2="84" y1="145" y2="284" xlinkHref="#I">
          <stop stop-color="#588dfa" />
          <stop offset="1" stop-color="#210c4b" />
        </linearGradient>
        <linearGradient
          id="G"
          x1="129.902"
          x2="129.902"
          y1="25.361"
          y2="459.092"
          xlinkHref="#I"
        >
          <stop stop-color="#6a11cb" stop-opacity=".22" />
          <stop offset="1" stop-color="#2575fc" />
        </linearGradient>
        <clipPath id="H">
          <path fill="#fff" d="M0 0h261v460H0z" />
        </clipPath>
        <linearGradient id="I" gradientUnits="userSpaceOnUse" />
      </defs>
    </svg>
  );
}
