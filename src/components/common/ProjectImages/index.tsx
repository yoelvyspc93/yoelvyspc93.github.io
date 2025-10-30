'use client';

import { CustomImage } from '../CustomImage';
import styles from './ProjectImages.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useRef } from 'react';
import ArrowIcon from '../Icons/ArrowIcon';
import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  images: string[];
}

export const ProjectImages = ({ images }: Props) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={1}
      navigation
      onBeforeInit={(swiper) => {
        if (
          swiper.params.navigation &&
          typeof swiper.params.navigation !== 'boolean'
        ) {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }
      }}
      onSwiper={(swiper) => {
        if (
          swiper.params.navigation &&
          typeof swiper.params.navigation !== 'boolean'
        ) {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }
      }}
      autoplay={{ delay: 10_000, disableOnInteraction: false }}
      grabCursor
      className={styles.swiper}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <div className={styles.image}>
            <CustomImage
              src={src}
              alt={`Project image ${index + 1}`}
              fill
              blur
            />
          </div>
        </SwiperSlide>
      ))}
      <button
        ref={prevRef}
        className={`${styles.navButton} ${styles.prev}`}
        aria-label="previous image"
      >
        <ArrowIcon />
      </button>
      <button
        ref={nextRef}
        className={`${styles.navButton} ${styles.next}`}
        aria-label="next image"
      >
        <ArrowIcon />
      </button>
    </Swiper>
  );
};
