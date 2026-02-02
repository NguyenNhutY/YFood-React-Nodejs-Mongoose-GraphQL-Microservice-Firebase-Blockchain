import React, { useContext, useState }  from "preact/hooks";
import PlaceOrderComponent from "../pages/PlaceOrder/PlaceOrder";
import { StoreContext } from "../context/StoreContext";

const PlaceOrderContainer = () => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const [showModalCompleted, setShowModalCompleted] = useState(false);

  const hasItemsInCart = Object.keys(cartItems).some(
    (key) => cartItems[key] > 0
  );

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Order submitted:", values);
    // Giả sử gửi dữ liệu form thành công
    setShowModalCompleted(true);
    setSubmitting(false);
  };

  return (
    <PlaceOrderComponent
      getTotalCartAmount={getTotalCartAmount}
      cartItems={cartItems}
      hasItemsInCart={hasItemsInCart}
      showModalCompleted={showModalCompleted}
      setShowModalCompleted={setShowModalCompleted}
      handleGoBack={handleGoBack}
      handleSubmit={handleSubmit}
    />
  );
};

export default PlaceOrderContainer;
