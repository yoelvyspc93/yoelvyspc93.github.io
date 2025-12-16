interface LiquidGlassProps {
  id?: string;
}

export const LiquidGlass = ({
  id = 'liquid-glass-effect',
}: LiquidGlassProps) => {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="turbulence"
          baseFrequency="0"
          numOctaves="2"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale={26}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
};
