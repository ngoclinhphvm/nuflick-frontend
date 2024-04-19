
function ReviewItem({ review }) {
    return (
        <div className="review-item">
            <h2>Review for Movie ID: {review.movieId}</h2>
            <p>Written by: {review.username}</p>
            <p>{review.text}</p>
            <p>Posted on: {review.created_at}</p>
        </div>
    );
}
export default ReviewItem;
