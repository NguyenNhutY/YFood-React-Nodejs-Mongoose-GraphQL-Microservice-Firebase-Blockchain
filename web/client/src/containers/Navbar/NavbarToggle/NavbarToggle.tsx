import React, { useEffect }  from "preact/hooks";
import { assets } from "../../../assets/frontend_assets/assets";
import "./navbarToggle.scss";
import { Link } from "preact-router";
import { FunctionalComponent } from "preact";

interface NavbarToggleProps {
  menu: string;
  setMenu: (menu: string) => void;
  isMenuOpen: boolean;
}

const NavbarToggle: FunctionalComponent<NavbarToggleProps> = ({
  menu,
  setMenu,
  isMenuOpen,
}) => {
  useEffect(() => {
    console.log("Menu Toggle File", menu);
  }, [menu]);

  return (
    <ul class={`menu navbar-menu ${isMenuOpen ? "open" : ""}`}>
      <Link
        to='/#explore-menu'
        onClick={() => setMenu("menu")}
        class={`menu-item ${menu === "menu" ? "active" : ""}`}
      >
        <img src={assets.menu} alt='img menu' />
      </Link>
      <Link
        to='/#food-display'
        onClick={() => setMenu("display")}
        class={`menu-item ${menu === "display" ? "active" : ""}`}
      >
        <img src={assets.display} alt='img display' />
      </Link>
      <Link
        to='/#app-download'
        onClick={() => setMenu("app")}
        class={`menu-item ${menu === "app" ? "active" : ""}`}
      >
        <img src={assets.mobile} alt='img mobile' />
      </Link>
      <Link
        to='/#footer'
        onClick={() => setMenu("contact")}
        class={`menu-item ${menu === "contact" ? "active" : ""}`}
      >
        <img src={assets.contact} alt='img contact' />
      </Link>
      <Link
        to='/career'
        onClick={() => setMenu("career")}
        class={`menu-item ${menu === "career" ? "active" : ""}`}
      >
        <img src={assets.career} alt='img career' />
      </Link>
      <Link
        to='/blogs'
        onClick={() => setMenu("blog")}
        class={`menu-item ${menu === "blog" ? "active" : ""}`}
      >
        <img src={assets.blog} alt='img blog' />
      </Link>
      <Link
        to='/quiz'
        onClick={() => setMenu("quiz")}
        class={`menu-item ${menu === "quiz" ? "active" : ""}`}
      >
        <img src={assets.quiz} alt='img quiz' />
      </Link>
    </ul>
  );
};

export default NavbarToggle;
