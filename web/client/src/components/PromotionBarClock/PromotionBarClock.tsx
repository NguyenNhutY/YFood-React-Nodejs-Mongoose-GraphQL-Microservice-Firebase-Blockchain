import React  from "preact/hooks";
import { useTimeObservable } from "../../services/services/timeObservable.ts";
import {
  formatTime,
  isDiscountTime,
  isWeekday,
} from "../../utils/timeUtils.ts";
import "./promotionBarClock.scss"; // CSS file
import { FunctionalComponent } from "preact";

const PromotionBar: FunctionalComponent = () => {
  const currentTime = useTimeObservable(1000); // Update every second

  const promotionPeriod: string = "Promotion from Monday to Friday";
  const promotionTime: string =
    "10% discount for orders outside of the time slots 10:00 - 12:30 and 18:00 - 20:30";
  return (
    <div class='promotion-bar'>
      <div class='promotion-bar-content'>
        <div class='current-time'>
          {`Current time: ${formatTime(currentTime)}`}
        </div>
        <div class='promotion-period'>{promotionPeriod}</div>
        <div class='discount-message'>{promotionTime}</div>
        <div class='current-time'>
          {`Current time: ${formatTime(currentTime)}`}
        </div>
        <div class='promotion-period'>{promotionPeriod}</div>
        <div class='discount-message'>{promotionTime}</div>
        <div class='current-time'>
          {`Current time: ${formatTime(currentTime)}`}
        </div>
        <div class='promotion-period'>{promotionPeriod}</div>
        <div class='discount-message'>{promotionTime}</div>
      </div>
    </div>
  );
};

export default PromotionBar;
