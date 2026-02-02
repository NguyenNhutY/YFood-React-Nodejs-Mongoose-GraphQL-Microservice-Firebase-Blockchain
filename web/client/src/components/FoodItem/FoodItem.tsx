import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
}  from "preact/hooks";
import { useNavigate } from "preact-router"; // Import useNavigate
import "./foodItem.scss";
import { assets } from "../../assets/frontend_assets/assets";
import ModalItem from "../Modal/ModalItem/ModalItem";
import ModalCmt from "../Modal/ModalCmt/ModalCmt";
import Notification from "../Notification/Notification";
import { StoreContext } from "../../context/StoreContext"; // Adjust import based on your context file
import { isDiscountTime, isWeekday } from "../../utils/timeUtils"; // Import the time utilities
import { FunctionalComponent } from "preact";

interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  detail: string;
  metail_1: string;
  metail_2: string;
  metail_3: string;
}

interface NotificationType {
  id: number;
  message: string;
  type: "success" | "error";
}

const FoodItem: FunctionalComponent<FoodItemProps> = ({
  id,
  name,
  price,
  description,
  image,
  detail,
  metail_1,
  metail_2,
  metail_3,
}) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    favoriteItems,
    addToFavorites,
    removeFromFavorites,
    decreaseToCart,
  } = useContext(StoreContext) || {};
  const [showModalItem, setShowModalItem] = useState(false);
  const [showModalRating, setShowModalRating] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const foodItemRef = useRef<HTMLDivElement>(null); // Specify ref type
  const [favorite, setFavorite] = useState(false);

  const navigate = useNavigate(); // Khai báo useNavigate

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (id: string) => {
    addToCart && addToCart(id);
    addNotification("Item added", "success");
  };

  const handleDecreaseToCart = (id: string) => {
    decreaseToCart && decreaseToCart(id);
    addNotification("Item removed", "error");
  };

  const handleAddToFavorites = (id: string) => {
    addToFavorites && addToFavorites(id);
  };

  const handleRemoveFromFavorites = (id: string) => {
    removeFromFavorites && removeFromFavorites(id);
  };

  const addNotification = (message: string, type: "success" | "error") => {
    setNotifications((prev) => [
      ...prev.slice(-2), // Keep only the last 2 notifications
      { id: Date.now(), message, type },
    ]);
    setTimeout(() => setNotifications((prev) => prev.slice(1)), 5000); // Hide notification after 5 seconds
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        foodItemRef.current &&
        !foodItemRef.current.contains(e.target as Node)
      ) {
        setShowModalItem(false);
        setIsZoomed(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleModalItem = () => {
    setShowModalItem((prev) => !prev);
  };

  const toggleModalCmt = () => {
    setShowModalRating((prev) => !prev);
  };

  const cartItem = cartItems[id] || 0;
  const isFavorite = favoriteItems && favoriteItems.has(id);

  const discountedPrice =
    isWeekday(currentTime) && isDiscountTime(currentTime) ? price * 0.9 : price;

  const handleViewDetailsClick = () => {
    console.log("FoodItem Clicked");
    navigate(`/product/${id}`); // Chuyển hướng đến trang sản phẩm với ID cụ thể
  };

  return (
    <>
      <div class='notification-container'>
        {notifications.map((notif) => (
          <Notification
            key={notif.id}
            message={notif.message}
            type={notif.type}
          />
        ))}
      </div>
      <div class='food-item'>
        <div class='food-item-img-container'>
          <img
            class={`food-item-image ${isZoomed ? "zoom" : ""}`}
            src={image}
            alt='item image'
            onDragStart={(e) => e.preventDefault()}
            onClick={() => {
              handleViewDetailsClick();
            }}
          />
          {cartItem === 0 ? (
            <img
              class='add'
              onClick={() => handleAddToCart(id)}
              src={assets.add_icon_white}
              alt='Add to cart'
            />
          ) : (
            <div class='food-item-counter'>
              <img
                onClick={() => handleDecreaseToCart(id)}
                src={assets.remove_icon_red}
                alt='Remove from cart'
              />
              <p>{cartItem}</p>
              <img
                onClick={() => handleAddToCart(id)}
                src={assets.add_icon_green}
                alt='Add to cart'
              />
            </div>
          )}
          <img
            class={`favorite-btn ${
              favorite ? "favorite_filled_icon" : "favorite_icon"
            }`}
            src={favorite ? assets.favorite_filled_icon : assets.favorite_icon}
            alt='Toggle favorite'
            onClick={() => {
              if (favorite) {
                handleRemoveFromFavorites(id);
              } else {
                handleAddToFavorites(id);
              }
              setFavorite(!favorite); // Toggle trạng thái yêu thích
            }}
          />
        </div>
        <div class='food-item-info'>
          <div class='food-item-name-rating'>
            <p>{name}</p>
            <img
              class='rating-btn'
              src={assets.rating_starts}
              alt='Rate item'
              onClick={toggleModalCmt}
            />
          </div>
          {showModalRating && (
            <ModalCmt onCloseModalCmt={() => setShowModalRating(false)} />
          )}
          <p class='food-item-desc'>{description}</p>
          <div class='food-item-prices'>
            {isWeekday(currentTime) && isDiscountTime(currentTime) && (
              <p class='food-item-price-original'>
                <strike>${price.toFixed(2)}</strike>
              </p>
            )}
            <p class='food-item-price'>${discountedPrice.toFixed(2)}</p>
          </div>
          <button
            class='food-item-btn-toggle-modal'
            onClick={() => {
              toggleModalItem();
            }} // Thêm sự kiện click vào nút
          >
            View Details
          </button>
          {showModalItem && (
            <ModalItem
              detail={detail}
              metail_1={metail_1}
              metail_2={metail_2}
              metail_3={metail_3}
              onCloseModalItem={toggleModalItem}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FoodItem;
