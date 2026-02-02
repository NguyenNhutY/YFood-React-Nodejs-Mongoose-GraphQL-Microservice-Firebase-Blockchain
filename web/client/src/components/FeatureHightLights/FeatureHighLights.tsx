import React  from "preact/hooks";
import "./featureHighlights.scss";
import { FunctionalComponent } from "preact";

const FEATURES = [
  {
    title: "Fresh Ingredients",
    description:
      "Meals prepared with carefully selected fresh and organic ingredients.",
  },
  {
    title: "Fast Delivery",
    description:
      "Optimized logistics ensure your food arrives hot and on time.",
  },
  {
    title: "Secure Payments",
    description:
      "Protected checkout with modern payment security standards.",
  },
  {
    title: "Trusted Vendors",
    description:
      "Partnered with verified restaurants and food providers.",
  },
];

const FeatureHighlights: FunctionalComponent = () => {
  return (
    <section class="feature-highlights">
      <div class="feature-highlights__container">
        <h2 class="feature-highlights__heading">
          Why Choose Our Healthy Food Platform
        </h2>

        <div class="feature-highlights__grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} class="feature-card">
              <h3 class="feature-card__title">{feature.title}</h3>
              <p class="feature-card__description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;