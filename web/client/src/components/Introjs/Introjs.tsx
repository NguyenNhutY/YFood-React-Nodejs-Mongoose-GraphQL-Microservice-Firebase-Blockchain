import { useEffect }  from "preact/hooks";
import introJs, { Step } from "intro.js";
import "intro.js/introjs.css";
import { FunctionalComponent } from "preact";

interface IntroTourProps {
  steps: Step[];
  onComplete: () => void;
}

const IntroTour: FunctionalComponent<IntroTourProps> = ({ steps, onComplete }) => {
  useEffect(() => {
    if (steps && steps.length > 0) {
      const tour = introJs();
      tour.setOptions({ steps });
      tour.oncomplete(onComplete);
      tour.onexit(onComplete);
      tour.start();
    }
  }, [steps, onComplete]);

  return null; // Component không cần render gì
};

export default IntroTour;
