import { SVGProps } from 'react';

const PythonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 42 42" {...props}>
    <g clipPath="url(#a)">
      <mask
        id="b"
        width={42}
        height={42}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <path fill="#fff" d="M0 0h42v42H0V0Z" />
      </mask>
      <g fill="currentColor" mask="url(#b)">
        <path d="M20.85 0c-10.665 0-10 4.648-10 4.648l.012 4.816h10.175v1.445H6.825S0 10.131 0 20.947c0 10.815 5.955 10.43 5.955 10.43h3.553v-5.018s-.191-5.985 5.862-5.985h10.09s5.67.091 5.67-5.509v-9.26S31.993 0 20.85 0Zm-5.611 3.237c1.011 0 1.83.823 1.83 1.841 0 1.017-.819 1.84-1.83 1.84a1.833 1.833 0 0 1-1.83-1.84c0-1.018.817-1.84 1.83-1.84Z" />
        <path d="M21.152 42c10.661 0 9.996-4.648 9.996-4.648l-.012-4.816H20.962V31.09h14.215s6.825.78 6.825-10.036c0-10.815-5.957-10.43-5.957-10.43h-3.553v5.018s.191 5.985-5.862 5.985H16.54s-5.67-.091-5.67 5.509v9.26S10.01 42 21.152 42Zm5.61-3.237a1.833 1.833 0 0 1-1.83-1.841c0-1.017.818-1.84 1.83-1.84s1.831.823 1.831 1.84a1.834 1.834 0 0 1-1.83 1.84Z" />
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h42v42H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default PythonIcon;
