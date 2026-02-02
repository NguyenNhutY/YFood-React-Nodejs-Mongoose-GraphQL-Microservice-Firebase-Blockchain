import React, { useState }  from "preact/hooks";
import IntroTour from "../Introjs/Introjs"; 
import "./introBtn.scss";
import { FunctionalComponent } from "preact";
interface IntroTourButtonProps {
  steps: introJs.Step[];
  className?: string;
}


const IntroTourButton: FunctionalComponent<IntroTourButtonProps> = ({
  steps,
  className = "",
}) => {
  const [showIntroTour, setShowIntroTour] = useState(false);

  return (
    <>
      <button
        class={`intro-tour-button ${className}`}
        onClick={() => setShowIntroTour(v => !v)}
      >
        Guide
      </button>

      {showIntroTour && (
        <IntroTour
          steps={steps}
          onComplete={() => setShowIntroTour(false)}
        />
      )}
    </>
  );
};

export default IntroTourButton;
