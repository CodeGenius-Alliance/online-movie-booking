import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllMovies } from "../../Redux/Action/index";
import "./AllMovies.css";
import "./Home.css";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

function AllMovies() {
  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.admin.admin);
  const movies = useSelector((state) => state.common.movies);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(FetchAllMovies()).then((res) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div>
        {" "}
       
      </div>
      {admin && admin.email ? (
        <>
          <div className="movies-container">
            <div className="movie-selection">
              {movies?.map((movie) => (
                <div className="movie-admin" key={movie._id}>
                  <img
                    className="movie-poster"
                    src={movie["posterUrl"]}
                    alt={movie.title}
                  />
                  <div className="movie-title">{movie.title}</div>

                  <div className="add_show_btn">
                    <Link className="link" to={`/admin/addshow/${movie._id}`}>
                      <span className="movie-title">Add Show</span>
                    </Link>

                    <Link className="link" to={`/admin/${movie._id}`}>
                      <span className="movie-title">View Show</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="movies-container">
            <div className="movie-selection">
              {movies?.map((movie) => {
                if (
                  movie.screen.length > 0 &&
                  movie.screen.map((show) => show._id)
                )
                  return (
                    <Link className="link" to={`/user/${movie._id}`}>
                      <div className="movie" key={movie._id}>
                        <img
                          className="movie-poster"
                          src={movie["posterUrl"]}
                          alt={movie.title}
                        />
                        <span className="movie-title">{movie.title}</span>
                      </div>
                    </Link>
                  );
                else {
                  return <></>;
                }
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AllMovies;
