import React  from "preact/hooks";
import "./cta.scss";
import { Link } from "preact-router"; // Import Link from React Router

const CTA = () => (
  <div class='cta'>
    <div class='cta-content'>
      <h3>Test for Real Rewards</h3>
    </div>
    <div class='cta-btn'>
      <Link to='/quiz'>
        <button type='button'>Start</button>
      </Link>
    </div>
  </div>
);

export default CTA;
