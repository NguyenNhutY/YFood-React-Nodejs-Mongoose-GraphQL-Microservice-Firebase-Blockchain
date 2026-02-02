import React  from "preact/hooks";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./exploreMenu.css";
import { fromJS, List } from "immutable"; // Import from immutable
import { menu_list } from "../../assets/frontend_assets/assets";
import "./swiper.css";
import { FunctionalComponent } from "preact";

// Type for menu item
interface MenuItem {
  _id?: string;
  menu_name: string;
  menu_image: string;
}

// Define props interface
interface ExploreMenuProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ExploreMenu: FunctionalComponent<ExploreMenuProps> = ({ category, setCategory }) => {
  // Convert menu_list to Immutable List with typed data
  const immutableMenuList: List<MenuItem> = fromJS(menu_list);

  return (
    <div class='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p class='explore-menu-text'>
        Discover our diverse menu featuring a delectable array of dishes crafted
        with the finest ingredients.
      </p>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => console.log("Swiper initialized:", swiper)}
        onSlideChange={() => console.log("Slide changed")}
        class='explore-menu-list my-swiper'
      >
        {immutableMenuList.map((item, index) => (
          <SwiperSlide
            key={item.get("_id") || index} // Use item.get('_id') if available, fallback to index
            class='explore-menu-list-item'
            onClick={() =>
              setCategory((prev) =>
                prev === item.get("menu_name") ? "All" : item.get("menu_name")
              )
            }
            aria-label={`Category ${item.get("menu_name")}`} // Accessibility improvement
          >
            <img
              class={category === item.get("menu_name") ? "active" : ""}
              src={item.get("menu_image")}
              alt={item.get("menu_name")}
              loading='lazy'
            />
            <p>{item.get("menu_name")}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <hr />
    </div>
  );
};

export default ExploreMenu;
