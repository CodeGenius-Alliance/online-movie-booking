import React, { useEffect } from "react";
import "./MovieDetails.css"; // Import your stylesheet
import "../HomeComponent/Home.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchOneMovie } from "../../Redux/Action";
import Loading from "./Loading";
import Popup from "reactjs-popup";

const MovieDetails = () => {
  // Assuming you have only one movie in the array
  const movie_id = useParams().movie_id;
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.common.oneMovie);

  useEffect(() => {
    dispatch(FetchOneMovie(movie_id));
  }, [dispatch, useParams]);
  let now = new Date();

  //console.log("movie",movie)
  const convertToDate = (dateString) => {
    return new Date(dateString);
  };

  const dateConverter = (date) => {
    const originalDate = new Date(date);
    const options = { day: "numeric", month: "short" };
    const formattedDate = originalDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  if (!movie.title)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <>
      <div className="movies-details-container">
        <div className="movies-details-left">
          <img
            className="movies-poster"
            src={movie["posterUrl"]}
            alt={movie?.title}
          />
          <div className="movies-details">
            <h1 className="title">{movie?.title}</h1>
            <div>
              <span className="actors">Cast - </span>

              {movie?.actors?.map((actor, index) => (
                <span className="actors-name" key={index}>
                  {actor}
                </span>
              ))}
            </div>
            <span className="descriptions">Description - </span>
            <span className="actors-name">{movie?.description}</span>
          </div>
        </div>
        <div className="movies-details-right">
          <div className="screen-container">
            {movie?.screen?.map((screen, index) => (
              <div key={screen?.screen_id} className="screen">
                <p>
                  <span className="h3">Screen Name - </span>
                  {screen?.screen_name}
                </p>
                <div className="show-container">
                  {screen?.show?.map((show) => {
                    const showdate = convertToDate(show?.date);
                    return (
                      <div key={show?._id}>
                        {showdate.getTime() < now.getTime() ? null : (
                          <Link
                            className="shows"
                            to={
                              "/user/" +
                              movie_id +
                              "/" +
                              screen.screen_id +
                              "/" +
                              show._id
                            }
                          >
                            <div key={show?.show_id} className="show">
                              <div className="div1">
                                <span>{dateConverter(show?.date)}</span>
                                <span>{show["show_time"]}</span>
                              </div>
                              <p>
                                <span>Price - Rs {show?.price}</span>
                              </p>
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
