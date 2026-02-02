import React  from "preact/hooks";
import "./header.scss";
import { FunctionalComponent } from "preact";

const Header: FunctionalComponent = () => {
  return (
    <header class="hero-header">
      <div class="hero-header__overlay" />

      <div class="hero-header__content">
        <h1 class="hero-header__title">
          Healthy Food Delivered Fresh to Your Door
        </h1>

        <p class="hero-header__description">
          Discover nutritious meals made from fresh ingredients. Browse menus,
          order easily, and enjoy fast, reliable delivery.
        </p>

        <div class="hero-header__actions">
          <a href="#explore-menu" class="btn btn--primary">
            View Menu
          </a>

        </div>
      </div>
    </header>
  );
};

export default Header;