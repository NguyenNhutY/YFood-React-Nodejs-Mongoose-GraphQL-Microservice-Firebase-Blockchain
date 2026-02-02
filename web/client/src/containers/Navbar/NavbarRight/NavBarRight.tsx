import React, { useContext, useEffect }  from "preact/hooks";
import { Link } from "preact-router";
import Search from "../../../components/Search/Search";
import IntroTourButton from "../../../components/IntroBtn/IntroBtn";
import { navbarIntroSteps } from "../../../types";
import { assets } from "../../../assets/frontend_assets/assets";
import { StoreContext } from "../../../context/StoreContext";
import { FunctionalComponent } from "preact";

const NavbarRight: FunctionalComponent<{
  setSearchName: (name: string) => void;
  setShowLogin: (show: boolean) => void;
  showLogin: boolean;
  userName: string | null;
  handleLogout: () => void;
}> = ({ setSearchName, setShowLogin, userName, handleLogout, showLogin }) => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    // Handle case where context is not available
    return <div>Error: StoreContext not available</div>;
  }

  const { getTotalCartAmount, getCartItemCount } = storeContext;
  const handleLoginClick = () => {
    setShowLogin(true);
    console.log("Login button clicked", showLogin); // Debug line
  };
  console.log("NavbarRight file ", showLogin);

  const totalAmount = getTotalCartAmount();

  return (
    <div class='navbar-right'>
      <Search class='search-nav-input' setSearchName={setSearchName} />
      <div class='navbar-search-icon'>
        <Link to='/cart'>
          <div class='basket-icon-container'>
            <img src={assets.basket_icon} alt='basket_icon' />
            {totalAmount > 0 && (
              <div class={getCartItemCount() === 0 ? "" : "dot"}>
                <span>{getCartItemCount ? getCartItemCount() : ""}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
      {userName ? (
        <div class='user-info'>
          <span class='user-name'>{userName}</span>
          <button class='logout-btn' onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button class='login-btn' onClick={() => handleLoginClick()}>
          Login
        </button>
      )}
      <IntroTourButton class='btn-intro' steps={navbarIntroSteps} />
    </div>
  );
};

export default NavbarRight;
