import React  from "preact/hooks";
import "./testimonials.scss";
import { FunctionalComponent } from "preact";

const TESTIMONIALS = [
  {
    name: "Minh Tran",
    role: "Office Worker",
    content:
      "The food quality is excellent and delivery is always on time. Ordering healthy meals has never been this easy.",
  },
  {
    name: "Anh Nguyen",
    role: "Fitness Trainer",
    content:
      "I love the clean ingredients and detailed nutrition information. This platform fits perfectly into my daily routine.",
  },
  {
    name: "Linh Pham",
    role: "Freelancer",
    content:
      "Smooth checkout experience and reliable service. Definitely my go-to place for healthy food orders.",
  },
];

const Testimonials: FunctionalComponent = () => {
  return (
    <section class="testimonials">
      <div class="testimonials__container">
        <h2 class="testimonials__heading">
          What Our Customers Are Saying
        </h2>

        <div class="testimonials__grid">
          {TESTIMONIALS.map((item) => (
            <div key={item.name} class="testimonial-card">
              <p class="testimonial-card__content">“{item.content}”</p>
              <div class="testimonial-card__author">
                <span class="testimonial-card__name">{item.name}</span>
                <span class="testimonial-card__role">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;