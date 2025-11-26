'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

// Import Swiper modules
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

/**
 * Default Swiper configuration
 * You can override these settings when using Swiper in components
 */
export const defaultSwiperConfig: SwiperOptions = {
  modules: [Navigation, Pagination, Autoplay, EffectFade, Parallax],
  spaceBetween: 30,
  slidesPerView: 1,
  loop: false,
  speed: 600,
  // Navigation arrows
  navigation: {
    enabled: true,
  },
  // Pagination dots
  pagination: {
    enabled: true,
    clickable: true,
  },
  // Responsive breakpoints
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
};

/**
 * Preset configurations for common use cases
 */
export const swiperPresets = {
  hero: {
    modules: [Pagination, Autoplay, EffectFade],
    effect: 'fade',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    loop: true,
    speed: 1000,
  } as SwiperOptions,

  testimonials: {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: true,
    pagination: {
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  } as SwiperOptions,

  gallery: {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: true,
    loop: true,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  } as SwiperOptions,

  cards: {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: true,
    grabCursor: true,
  } as SwiperOptions,
};

// Export Swiper components and modules
export { Swiper, SwiperSlide, Navigation, Pagination, Autoplay, EffectFade, Parallax };

// Export types
export type { SwiperOptions };
