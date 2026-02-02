// src/components/AdSlider/AdSlider.tsx
import { FunctionalComponent } from "preact";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "../../compat/SwiperCompat";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./adSlider.scss";
import { createImageList } from "./imageFactory";

type AdSliderProps = {
  className?: string;
};

const AdSlider: FunctionalComponent<{ className?: string }> = ({ className }) => {
  const imageList = createImageList();

  const swiperConfig = {
    modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    slidesPerView: 3,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    onSwiper: (swiper: unknown) =>
      console.log("Swiper initialized", swiper),
    onSlideChange: () => console.log("Slide changed"),
  };

  return (
    <div class="ad-slider" id="ad-slider">
      <Swiper {...swiperConfig} class="ad-slider-list">
        {imageList.map((item) => (
          <SwiperSlide
            key={item.id}
            class="ad-slider-list-item"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              class="ad-slider-img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <hr />
    </div>
  );
};

export default AdSlider;
