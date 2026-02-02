import React  from "preact/hooks";
import "./customerReviews.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FunctionalComponent } from "preact";

// Define types for the review and props
interface Review {
  id: number;
  rating: number; // Rating from 1 to 5
  comment: string;
  media?: string; // URL to image or video
  username: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
}

const CustomerReviews: FunctionalComponent<CustomerReviewsProps> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStarSolid} class='star' />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} class='star' />}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} class='star' />
        ))}
      </>
    );
  };

  return (
    <div class='customer-reviews'>
      <h2>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} class='review'>
            <div class='review-rating'>{renderStars(review.rating)}</div>
            <p class='review-username'>{review.username}</p>{" "}
            {/* Hiển thị tên người dùng */}
            <p class='review-comment'>{review.comment}</p>
            {review.media && (
              <div class='review-media'>
                {review.media.endsWith(".mp4") ? (
                  <video controls src={review.media} class='review-video' />
                ) : (
                  <img
                    src={review.media}
                    alt='Review Media'
                    class='review-image'
                  />
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
};

export default CustomerReviews;
