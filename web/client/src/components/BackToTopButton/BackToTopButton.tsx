import React, { useEffect, useState }  from "preact/hooks";
import "./backToTopButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import scrollObserver from "./scrollObserver";
import { FunctionalComponent } from "preact";

const BackToTopButton: FunctionalComponent = () => {
  const [backToTopButton, setBackToTopButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (scrollPosition: number) => {
      setBackToTopButton(scrollPosition > scrollObserver.getThreshold());
    };

    scrollObserver.addObserver(handleScroll);

    // Clean up observer on unmount
    return () => {
      scrollObserver.removeObserver(handleScroll);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopButton && (
        <a href='#nav'>
          <button class='backtotopbutton' onClick={scrollUp}>
            <FontAwesomeIcon icon={faArrowUp} class='fontawe' />
          </button>
        </a>
      )}
    </div>
  );
};

export default BackToTopButton;
