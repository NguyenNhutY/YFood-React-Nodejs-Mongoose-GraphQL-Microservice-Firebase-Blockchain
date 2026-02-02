import { useContext, useState } from "preact/hooks";
import { route } from "preact-router";
import { FunctionalComponent } from "preact";

import { StoreContext } from "../../context/StoreContext";
import "./product.scss";
import Modal from "../../components/Modal/Modal";
import { isDiscountTime, isWeekday } from "../../utils/timeUtils";
import Notification from "../../components/Notification/Notification";
import AdSlider from "../../components/AdSlider/AdSlider";
import FoodDisplay from "../../containers/FoodDisplay/FoodDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import { customerReviewsData } from "../../types/customerReviews";

interface NotificationType {
  id: number;
  message: string;
  type: "success" | "error";
}

// 👉 nhận param trực tiếp từ router
type Props = {
  id?: string;
   class?: string;
};

const ProductPage: FunctionalComponent<Props> = ({ id }) => {
  const store = useContext(StoreContext);
  const product = store?.food_list.find((item) => item._id === id);

  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const currentTime = new Date();
  const discountedPrice =
    isWeekday(currentTime) && isDiscountTime(currentTime)
      ? product.price * 0.9
      : product.price;

  const addNotification = (message: string, type: "success" | "error") => {
    setNotifications((prev) => [
      ...prev.slice(-4),
      { id: Date.now(), message, type },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 5000);
  };

  const handleAddToCart = () => {
    store?.addToCart(product._id);
    addNotification("Item added to cart", "success");
  };

  return (
    <>
      <button
        class="btn-back-history"
        onClick={() => history.back()}
      >
        <FontAwesomeIcon icon={faArrowUp} class="fontawe" />
      </button>

      <div class="notification-container">
        {notifications.map((n) => (
          <Notification key={n.id} message={n.message} type={n.type} />
        ))}
      </div>

      <div class="product-page">
        <img src={product.image} class="product-image" />
        <h1 class="product-name">{product.name}</h1>
        <p class="product-description">{product.description}</p>

        <div class="product-prices">
          {isWeekday(currentTime) && isDiscountTime(currentTime) && (
            <strike>${product.price.toFixed(2)}</strike>
          )}
          <p class="product-price">${discountedPrice.toFixed(2)}</p>
        </div>

        <p class="product-detail">{product.detail}</p>

        <ul class="product-meta">
          <li>{product.metail_1}</li>
          <li>{product.metail_2}</li>
          <li>{product.metail_3}</li>
        </ul>

        <div>
          <button class="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button
            class="view-cart-btn"
            onClick={() => route("/cart")}
          >
            Go to Cart
          </button>
        </div>
      </div>

      <CustomerReviews reviews={customerReviewsData} />

      <FoodDisplay
        category="All"
        searchName=""
        excludeId={product._id}
      />

      <AdSlider class={adslider-product} />
    </>
  );
};

export default ProductPage;
