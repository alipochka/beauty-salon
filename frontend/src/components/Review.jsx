import '../styles/components.css';

const Review = ({ review }) => {
  return (
    <div className="review">
      <div className="review-header">
        <h4>{review.author}</h4>
        <div className="rating">{review.rating}/5</div>
      </div>
      <p className="review-text">{review.text}</p>
      <div className="review-date">{review.date}</div>
    </div>
  );
};

export default Review;