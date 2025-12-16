import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  blur?: boolean;
  className?: string;
}

export const CustomImage = ({
  src,
  alt,
  fill = false,
  priority = false,
  width,
  height,
  blur = false,
  className,
}: Props) => {
  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      width={width}
      height={height}
      placeholder={blur ? 'blur' : 'empty'}
      blurDataURL={
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVR42mPsnHBckgEIGGEMACysA/U4E8v3AAAAAElFTkSuQmCC'
      }
    />
  );
};
