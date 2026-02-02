import React  from "preact/hooks";
import "./footer.scss";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "preact-router";
// import AnimationFooter from "../AnimationFooter/AnimatioFooter";
import Map from "../Map/Map";
import { FunctionalComponent } from "preact";

const Footer: FunctionalComponent = () => {
  return (
    <div class='footer' id='footer'>
      <div class='footer-content'>
        <div class='footer-content-left'>
          <Link to='#nav'>
            <img src={assets.logo} alt='Logo' />
          </Link>
          <p>
     Healthy Food is a modern food ordering platform delivering fresh,
nutritious meals crafted from high-quality ingredients.
          </p>
          <div class='footer-social-icons'>
            <a
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={assets.facebook_icon} alt='Facebook' />
            </a>
            <a
              href='https://www.twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={assets.twitter_icon} alt='Twitter' />
            </a>
            <a
              href='https://www.linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={assets.linkedin_icon} alt='LinkedIn' />
            </a>
            {/* <AnimationFooter /> */}
          </div>
        </div>
        <div class='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/info'>About us</Link>
            </li>
            <li>
              <Link to='/order'>Delivery</Link>
            </li>
                  <li>
              <Link to='/quiz'>Quiz</Link>
            </li>
            <li>
              <Link to='/policy'>Privacy Policy</Link>
            </li>
            <li>
              <Link to='/thanks'>Thanks</Link>
            </li>
           
          </ul>
        </div>
        <div class='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <a href='tel:+12124567890'>Phone</a>
            </li>
            <li>
              <a href='mailto:contact@tomaato.com'>Email</a>
            </li>
            <li>
              <Link to='/feedback'>Feedback</Link>
            </li>
      
             
          </ul>
          
        </div>
        <div>
           <a href='https://www.google.com/maps/@10.7366632,106.6645009,15z?entry=ttu'>
                <Map class='img-map' />
              </a>
         
    
<p>© {new Date().getFullYear()} Healthy Food. All rights reserved.</p>

        </div>
      </div>
      
      <hr />
    </div>
  );
};

export default Footer;
