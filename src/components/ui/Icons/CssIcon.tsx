import { SVGProps } from 'react';

const CssIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 42 42" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M.37.454A1.4 1.4 0 0 1 1.4 0h39.2a1.4 1.4 0 0 1 1.394 1.518l-2.8 33.364a1.4 1.4 0 0 1-.952 1.21l-16.8 5.6a1.4 1.4 0 0 1-.884 0l-16.8-5.6a1.4 1.4 0 0 1-.952-1.21L.006 1.518A1.4 1.4 0 0 1 .37.454ZM30.8 8.4H11.2v2.8H28v5.6H16.8v2.8H28v5.992l-7 2.332-7-2.332V22.4h-2.8v5.208l9.8 3.268 9.8-3.268V8.4Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h42v42H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default CssIcon;
