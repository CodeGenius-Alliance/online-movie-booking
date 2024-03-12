import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchOneMovie } from "../../Redux/Action";

function AllShow() {
  const movie_id = useParams().movie_id;
  const admin = useSelector((state) => state.admin.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = useSelector((state) => state.common.oneMovie);

  useEffect(() => {
    dispatch(FetchOneMovie(movie_id));
  }, [dispatch]);

  if (!admin.email) {
    navigate("/login");
  }
  const dateConverter = (date) => {
    const originalDate = new Date(date);
    const options = { day: "numeric", month: "short" };
    const formattedDate = originalDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

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
                  <span className="h3">Screen ID:</span> {screen?.screen_id}
                </p>
                <div className="show-container">
                  {screen?.show?.map((show) => (
                    <div key={show?.show_id} className="show">
                      <div className="div1">
                        <span>{dateConverter(show?.date)}</span>
                        <span>{show["show_time"]}</span>
                      </div>
                      <p>
                        <span>Price - Rs {show?.price}</span>
                      </p>
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/${movie_id}/${screen.screen_id}/${show._id}`
                          )
                        }
                      >
                        View Booked Movies
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllShow;
