function ReviewItem({ review }) {
   

    return (
        <div style={{border: '1px solid #ccc', padding: '10px', marginBottom: '10px'}}>
            <h2 style={{color: '#333', fontSize: '1.5rem', fontWeight: '600px'}}>Written by: {review.username}</h2>
            <p style={{color: '#666'}}>{review.text}</p>
            <p style={{color: '#666'}}>Posted on: {review.created_at}</p>
        </div>
    );
}

export default ReviewItem;