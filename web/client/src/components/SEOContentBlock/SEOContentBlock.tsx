import React  from "preact/hooks";
import "./seoContentBlock.scss";
import { FunctionalComponent } from "preact";

const SEOContentBlock: FunctionalComponent = () => {
  return (
    <section class="seo-content">
      <div class="seo-content__container">
        <h2>Healthy Food Delivery Made Simple</h2>

        <p>
          Our platform provides a convenient way to order healthy, nutritious
          meals from trusted vendors. Each dish is carefully prepared using
          fresh ingredients to ensure both quality and taste.
        </p>

        <p>
          With an intuitive browsing experience, secure payment processing, and
          fast delivery, customers can enjoy a seamless end-to-end food ordering
          workflow across desktop and mobile devices.
        </p>

        <p>
          Whether you are managing a busy schedule or focusing on a healthier
          lifestyle, our service is designed to support your daily nutrition
          needs with reliability and transparency.
        </p>
      </div>
    </section>
  );
};

export default SEOContentBlock;