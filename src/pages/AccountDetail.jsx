import React, { useEffect, useState } from "react";
import accountApi from "../api/modules/account.api.js";
import movieAPI from "../api/modules/movie.api.js";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/common/MovieCard.jsx";
import Container from "../components/common/Container.jsx";
function AccountDetail({onUsername}) {
    const [account, setAccount] = useState(null);
    const [favorite, setFavorite] = useState([]); // [movie1, movie2, ...
    const { username } = useParams();

    useEffect(() => {
        const getInfo = async (username) => {
            try {
                const [accountInfo] = await accountApi.getInfo(username);
               // console.log('Account info:', accountInfo);
                if (accountInfo) {
                    setAccount(accountInfo);
                } else {
                    console.error('Account info is null');
                }
                const favoriteList = await accountApi.getFavorite(username);
                // Use Promise.all to wait for all movieInfo requests to complete
                const movieInfoPromises = favoriteList.map(async (movieId) => {
                    const movieInfo = await movieAPI.getInfo(movieId);
                    return movieInfo.response.data;
                });
                const favoriteMovies = await Promise.all(movieInfoPromises);
                setFavorite(favoriteMovies);
                

            } catch (error) {
                console.error('Error fetching account:', error);
            }
        };
        getInfo(username);
        onUsername(username);
    }, [username, onUsername]);
    return (
        <div >
            <Container header={'Account Detail'}>
                {account && (
                    <>
                        {/* <header>
                            <Link to={`/account/${account.username}`}>{account.username}</Link>
                        </header> */}
                        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", margin: "50px 10px auto 10px"}}>
                            <img
                            src={account.avatar}
                            alt="avatar"
                            width={200}
                            height={250}
                            />
                            <div style ={{margin: "10px 10px auto 20px"}}>
                                <h2>{account.username}</h2>
                                <p>Email: {account.email ? account.email : "null"}</p>
                                <p>Name: {account.name}</p>
                                <p>Gender: {account.gender}</p>
                            </div>
                            
                            {/* Display other properties as needed */}
                        </div>
                    </>
                )}
            </Container>
            {/* Favorite list */}
            <Container header={"Favorite"}>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", margin: "auto 10px auto 10px"}}>
                    {favorite.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AccountDetail;
