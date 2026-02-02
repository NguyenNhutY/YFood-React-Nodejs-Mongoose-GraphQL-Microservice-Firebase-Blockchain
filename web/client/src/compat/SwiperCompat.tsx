// src/components/SwiperCompat.tsx
import type * as React  from "preact/hooks";
import {ComponentProps, JSX} from "react";
import {
  Swiper as ReactSwiper,
  SwiperSlide as ReactSwiperSlide,
} from "swiper/react";

export const Swiper = ReactSwiper as unknown as (
  props: Omit<React.ComponentProps<typeof ReactSwiper>, "children"> & {
    children?: any;
  }
) => JSX.Element;

export const SwiperSlide = ReactSwiperSlide as unknown as (
  props: Omit<React.ComponentProps<typeof ReactSwiperSlide>, "children"> & {
    children?: any;
  }
) => JSX.Element;
