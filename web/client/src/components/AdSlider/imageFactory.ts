// imageFactory.ts
export interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

import food1 from "../../assets/frontend_assets/food_1.png";
import food2 from "../../assets/frontend_assets/food_2.png";
import food3 from "../../assets/frontend_assets/food_3.png";
import food4 from "../../assets/frontend_assets/food_4.png";
import food5 from "../../assets/frontend_assets/food_5.png";
import food6 from "../../assets/frontend_assets/food_6.png";
import food7 from "../../assets/frontend_assets/food_7.png";
import food8 from "../../assets/frontend_assets/food_8.png";

export const createImageList = (): ImageItem[] => {
  return [
    { id: 1, src: food1, alt: "Food 1" },
    { id: 2, src: food2, alt: "Food 2" },
    { id: 3, src: food3, alt: "Food 3" },
    { id: 4, src: food4, alt: "Food 4" },
    { id: 5, src: food5, alt: "Food 5" },
    { id: 6, src: food6, alt: "Food 6" },
    { id: 7, src: food7, alt: "Food 7" },
    { id: 8, src: food8, alt: "Food 8" },
  ];
};


