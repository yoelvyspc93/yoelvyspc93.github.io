import { SVGProps } from 'react';

const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <rect width={32} height={32} fill="#262B39" fillOpacity={0.8} rx={16} />
      <path stroke="#fff" d="M10 10.5h12m-12 5h12m-12 5h12" />
    </g>
    <defs>
      <filter
        id="a"
        width={112}
        height={112}
        x={-40}
        y={-40}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={20} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_190_355"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_190_355"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default HamburgerIcon;
