import React  from "preact/hooks";
import "./trustBadges.scss";
import { FunctionalComponent } from "preact";

const BADGES = [
  "Secure Payment",
  "Fast Delivery",
  "Verified Vendors",
  "Quality Ingredients",
];

const TrustBadges: FunctionalComponent = () => {
  return (
    <section class="trust-badges">
      <div class="trust-badges__container">
        {BADGES.map((badge) => (
          <div key={badge} class="trust-badge">
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;