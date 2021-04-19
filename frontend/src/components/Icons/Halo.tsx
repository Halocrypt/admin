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
      viewBox="0 0 71 125"
      height={size}
      width={size}
      className={className}
    >
      <g clip-path="url(#G)">
        <path
          fill="url(#A)"
          d="M17.391 39.454L4.06 15.845a.69.69 0 0 1 .278-.833L28.501.013c.116-.071.448.194.555.278.083-.278.546-.317.833-.278l40.549 5.555c.186.028.516.094.555.278a.64.64 0 0 1-.278.555l-52.77 32.774a.38.38 0 0 1-.204.023l-.074.254c-.023.008-.047.01-.071.007l-.207-.007zm0 0z"
        />
        <path
          fill="url(#B)"
          d="M4.06 15.289L.172 76.95c-.005.061-.059.262 0 .278s-.025-.222 0-.278l17.22-37.496"
        />
        <path
          fill="url(#C)"
          d="M.449 77.783L37.944 91.67l8.887-28.053L.172 76.672c-.449.882.108 1.042.278 1.111z"
        />
        <path
          fill="url(#D)"
          d="M49.331 124.722L.171 77.505l38.05 13.054 11.387 34.163c-.049.022-.102.032-.155.03a.19.19 0 0 1-.122-.03zm.278 0c.025-.015.031-.004.029.007-.019.014-.024.009-.029-.007zm-31.94-85.546L69.883 6.957a.62.62 0 0 1 .555 0c.111.096.058.141 0 .278L46.553 64.451 17.669 39.176z"
        />
        <path
          fill="url(#E)"
          d="M46.277 64.173l3.328 59.161c.005.064.07.266 0 .277s-.282.062-.302 0L37.502 90.559l8.775-26.386z"
        />
        <path
          fill="url(#F)"
          d="M70.716 6.401L49.227 124.722c-.08.108-.176.202-.287.278-.036 0 .007-.244 0-.278l-3.152-59.438L70.716 6.401z"
        />
      </g>
      <defs>
        <linearGradient
          id="A"
          x1="37.504"
          x2="37.504"
          y1="0"
          y2="39.462"
          xlinkHref="#H"
        >
          <stop stop-color="#6a11cb" stop-opacity=".161" />
          <stop offset="1" stop-color="#2575fc" stop-opacity=".831" />
        </linearGradient>
        <linearGradient
          id="B"
          x1="8.768"
          x2="8.768"
          y1="15.289"
          y2="77.228"
          xlinkHref="#H"
        >
          <stop stop-color="#2575fc" stop-opacity="0" />
          <stop offset="1" stop-color="#6a11cb" />
        </linearGradient>
        <linearGradient
          id="C"
          x1="23.416"
          x2="23.416"
          y1="63.618"
          y2="91.67"
          xlinkHref="#H"
        >
          <stop stop-color="#6a11cb" />
          <stop offset="1" stop-color="#2575fc" stop-opacity=".4" />
        </linearGradient>
        <linearGradient
          id="D"
          x1="35.337"
          x2="35.337"
          y1="6.891"
          y2="124.753"
          xlinkHref="#H"
        >
          <stop stop-color="#6a11cb" stop-opacity=".22" />
          <stop offset="1" stop-color="#2575fc" />
        </linearGradient>
        <linearGradient
          id="E"
          x1="43.57"
          x2="43.57"
          y1="64.173"
          y2="123.642"
          xlinkHref="#H"
        >
          <stop stop-color="#6a11cb" />
          <stop offset="1" stop-color="#2575fc" stop-opacity=".259" />
        </linearGradient>
        <linearGradient
          id="F"
          x1="58.252"
          x2="58.252"
          y1="6.401"
          y2="125"
          xlinkHref="#H"
        >
          <stop stop-color="#6a11cb" />
          <stop offset="1" stop-color="#2575fc" stop-opacity=".02" />
        </linearGradient>
        <clipPath id="G">
          <path fill="#fff" d="M0 0h71v125H0z" />
        </clipPath>
        <linearGradient id="H" gradientUnits="userSpaceOnUse" />
      </defs>
    </svg>
  );
}
