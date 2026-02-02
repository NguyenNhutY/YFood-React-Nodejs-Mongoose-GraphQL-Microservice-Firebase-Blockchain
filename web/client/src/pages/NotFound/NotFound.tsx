import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { route, Link } from "preact-router";
import "./notFound.scss";

const PageNotFound: FunctionalComponent = () => {

  useEffect(() => {
    const handleNetworkChange = () => {
      if (!navigator.onLine) {
        route("/404", true); // true = replace history
      }
    };

    window.addEventListener("load", handleNetworkChange);

    return () => {
      window.removeEventListener("load", handleNetworkChange);
    };
  }, []);

  return (
    <div class="cont-404">
      <button class="button">
        <a href="/">Please Try to F5</a>
      </button>
    </div>
  );
};

export default PageNotFound;
