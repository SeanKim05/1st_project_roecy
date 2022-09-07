import React, { useState, forwardRef } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

import './Review.scss';
import './ReviewForm.scss';

const Review = forwardRef(({ rating }, ref) => {
  const [visible, setVisible] = useState(false);
  const handleOpenForm = () => {
    setVisible(current => !current);
  };

  function starRate(rating) {
    if (rating === 5) return '★★★★★';
    if (rating === 4) return '★★★★☆';
    if (rating === 3) return '★★★☆☆';
    if (rating === 2) return '★★☆☆☆';
    if (rating === 1) return '★☆☆☆☆';
    else return '☆☆☆☆☆';
  }
  return (
    <>
      <section ref={ref} className="review_container">
        <div className="star_rating">{starRate(rating)}</div>
        <div className="review_wrapper">
          <div onClick={handleOpenForm} className="write_btn">
            <span>
              <img src="/image/edit.png" />
              <p>Write a Review</p>
            </span>
          </div>
          <div className="tab-review">
            <div>
              <span>Reviews</span>
              <span className="num">0</span>
            </div>
          </div>
          <div className="line"></div>
          {visible && <ReviewForm />}
          <div className="view_review">
            <div className="rating">★★★★★</div>
            <p>Be the first to review this item</p>
          </div>
          <ReviewList />
        </div>
      </section>
    </>
  );
});

export default Review;
