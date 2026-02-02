import { useEffect }  from "preact/hooks";
import { useLocation } from "preact-router";
import { FunctionalComponent } from "preact";

const ScrollToTop: FunctionalComponent = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
