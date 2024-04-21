import './review.css'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import reviewApi from '../../api/modules/review.api.js';
import movieApi from '../../api/modules/movie.api.js';
import { useNavigate } from 'react-router-dom';
function Review() {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const navigate = useNavigate();
    useEffect( () => {
        const getDetails = async (movieId) => {
            const movieData = await movieApi.getInfo(movieId);
            if(movieData.response) {
                setMovie(movieData.response.data);
            } else {
                console.log(movieData.err);
            }
    }
    getDetails(movieId)
    },[]);
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
    const user = localStorage.getItem("user") ?  localStorage.getItem("user") : null;
   
    const username = user ? JSON.parse(user).username : "null";
   // console.log(user);
    const [newReview, setNewReview] = useState({
        username: username,
        movieId: movieId,
        text: '',
        create_at: ''
    });

   const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        username: newReview.username,
        movieId: newReview.movieId,
        text: newReview.text,
        create_at: new Date().toISOString().split('T')[0]
    }
    console.log(data);
   
    //console.log(data, token)
    reviewApi.createReview(data, token).then((res) => {
        console.log(res);
        if (res.success) {
            console.log("success");
            setNewReview({
                username: username,
                movieId: movieId,
                text: '',
                create_at: ''
            });
           // onNewReview(newReview);
            navigate(`/movie/${movieId}`);
        } else{
                console.log("error");
        }
        });
    };

        const handleChange = (event) => {
            setNewReview({
                ...newReview,
                [event.target.name]: event.target.value
            });
        }

return (
        <div className="review-container">
            <h1>Reviews of {movie.title}</h1>

            <form className="review-form" onSubmit={handleSubmit}>
                <textarea name='text' placeholder='Review' value={newReview.text} onChange={handleChange} required />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Review;