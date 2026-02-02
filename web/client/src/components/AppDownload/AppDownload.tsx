import { FunctionalComponent } from "preact";
import "./appDownload.scss";
import { assets } from "../../assets/frontend_assets/assets";

const AppDownload: FunctionalComponent = () => {
  return (
    <div class="app-download" id="app-download">
      <p>
        For Better Experience Download <br /> YFOOD App
      </p>
      <div class="app-download-platforms">
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={assets.play_store} alt="Google Play Store" />
        </a>
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={assets.app_store} alt="Apple App Store" />
        </a>
      </div>
    </div>
  );
};

export default AppDownload;
