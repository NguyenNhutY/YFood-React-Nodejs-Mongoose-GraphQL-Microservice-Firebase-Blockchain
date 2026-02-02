import React  from "preact/hooks";
import "./modalPolicy.scss";
import { FunctionalComponent } from "preact";

interface ModalPolicyProps {
  onClose: () => void;
}

const ModalPolicy: FunctionalComponent<ModalPolicyProps> = ({ onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains("policy-overlay")) {
      onClose();
    }
  };

  return (
    <div class='policy-overlay' onClick={handleOverlayClick}>
      <div class='policy-container'>
        <h2>Terms of Use</h2>
        <ul>
          <li>
            By logging in, you agree to comply with all our terms and
            conditions.
          </li>
          <li>
            You commit not to use the service for any illegal or unauthorized
            purposes.
          </li>
        </ul>

        <h2>Privacy Policy</h2>
        <ul>
          <li>
            Your personal information will be kept confidential and used only to
            improve our services.
          </li>
          <li>
            We will not share your information with third parties without your
            consent.
          </li>
        </ul>

        <h2>Cookies</h2>
        <ul>
          <li>
            This website uses cookies to enhance user experience. By continuing,
            you accept the use of cookies.
          </li>
        </ul>

        <h2>Usage Conditions</h2>
        <ul>
          <li>
            Use of our services must comply with applicable laws and
            regulations.
          </li>
        </ul>

        <h2>Contact</h2>
        <ul>
          <li>
            If you have any questions about this policy, please contact our
            support team.
          </li>
        </ul>
        <div class='policy-button' onClick={onClose}>
          Ok
        </div>
      </div>
    </div>
  );
};

export default ModalPolicy;
