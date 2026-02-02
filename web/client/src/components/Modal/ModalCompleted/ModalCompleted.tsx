import React  from "preact/hooks";
import "./modalCompleted.scss";

const ModalCompleted = ({ formData, onClose, total }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("completed-overlay")) {
      onClose();
    }
  };

  const handleEmailDownload = (event) => {
    event.preventDefault();
    const emailContent = `
      Order Details:
      First Name: ${formData.firstName}
      Last Name: ${formData.lastName}
      Email: ${formData.emailAddress}
      Street: ${formData.street}
      City: ${formData.city}
      State: ${formData.state}
      Zip Code: ${formData.zipCode}
      Country: ${formData.country}
      Phone: ${formData.phone}
      Total: $${total}
    `;

    const emailUrl = `mailto:${
      formData.emailAddress
    }?subject=Your Order Details&body=${encodeURIComponent(emailContent)}`;

    const link = document.createElement("a");
    link.href = emailUrl;
    link.target = "_blank";
    link.click();

    onClose();
  };

  return (
    <div class='completed-overlay' onClick={handleOverlayClick}>
      <div class='completed-container'>
        <h2>Order Completed</h2>
        <p>Thank you for your order, {formData.firstName}!</p>
        <p>Your order details:</p>
        <ul>
          <li>
            <strong>First Name:</strong> {formData.firstName}
          </li>
          <li>
            <strong>Last Name:</strong> {formData.lastName}
          </li>
          <li>
            <strong>Email:</strong> {formData.emailAddress}
          </li>
          <li>
            <strong>Street:</strong> {formData.street}
          </li>
          <li>
            <strong>City:</strong> {formData.city}
          </li>
          <li>
            <strong>State:</strong> {formData.state}
          </li>
          <li>
            <strong>Zip Code:</strong> {formData.zipCode}
          </li>
          <li>
            <strong>Country:</strong> {formData.country}
          </li>
          <li>
            <strong>Phone:</strong> {formData.phone}
          </li>
        </ul>
        <p>Total: ${total}</p>
        <div class='completed-buttons'>
          <button
            class='completed-button downl-btn'
            onClick={handleEmailDownload}
          >
            Download
          </button>
          <button class='completed-button ok-btn' onClick={onClose}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCompleted;
