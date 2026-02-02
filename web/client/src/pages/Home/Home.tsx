import React, { useEffect, useState }  from "preact/hooks";
import "intro.js/introjs.css"; // Import Intro.js styles
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenuContainer";
import FoodDisplay from "../../containers/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import AnimatedBox from "../../helpers/Animation/AnimateBox/AnimateBox";
import AdSlider from "../../components/AdSlider/AdSlider";
import Infinite from "../../components/Infinite/Infinite";
import ErrorBoundary from "../../helpers/ErrorBoundary/ErrorBoundary";
import Loading from "../Loading/Loading"; // Adjust path as needed
import { useLocation } from "preact-router";
import "./home.scss";
import CTA from "../../components/CTA/CTA";
import FeatureHighlights from "../../components/FeatureHightLights/FeatureHighLights";
import Testimonials from "../../components/Testimonials/Testimonials";
import SEOContentBlock from "../../components/SEOContentBlock/SEOContentBlock";
import TrustBadges from "../../components/TrustBadges/TrusBadges";
import { FunctionalComponent } from "preact";
interface HomeProps {
  searchName: string;
}

const Home: FunctionalComponent<HomeProps> = ({ searchName }) => {
  const [category, setCategory] = useState<string>("All");
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <div class='home'>


      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <Header />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
        <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <TrustBadges />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
        <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <FeatureHighlights />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <ExploreMenu category={category} setCategory={setCategory} />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <FoodDisplay category={category} searchName={searchName} />
        </React.Suspense>
      </ErrorBoundary>
 
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <Infinite />
        </React.Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <AppDownload />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
              <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <Testimonials />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
                    <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <SEOContentBlock />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <CTA />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
            <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <AdSlider />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
