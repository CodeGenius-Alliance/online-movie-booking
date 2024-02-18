import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllMovies } from "../../Redux/Action/index";
import "./AllMovies.css";
import { Link } from "react-router-dom";

function AllMovies() {
  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.admin.admin);
  const movies = useSelector((state) => state.common.movies);
  console.log("movies : ", movies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchAllMovies());
  }, []);

  

  if (admin && admin.email) {
    return (
      <>
        <div className="movies-container">
          <div className="movies-heading">ALL MOVIES</div>
          <div className="movie-selection">
            {movies?.map((movie) => (
              //  <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id} className="movie-link">
              <div className="movie" key={movie._id}>
                <img
                  className="movie-poster"
                  src={movie.posterURL}
                  alt={movie.title}
                />
                <div>hi: {movie._id}</div>
                <div className="movie-title">{movie.title}</div>
                <Link className="link" to={`/admin/${movie._id}`}>Add Show</Link>
              </div>
              // </Link>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {/* FETCH ALL THE MOVIES FROM THE BACKEND */}
        <div>ALL MOVIES SHOWN TO USER</div>
      </>
    );
  }
}

export default AllMovies;
