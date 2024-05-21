import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchOneMovie } from "../../Redux/Action";
import { DeleteShow } from "../../Redux/Action/AdminAction";

function AllShow() {
  const movie_id = useParams().movie_id;
  const admin = useSelector((state) => state.admin.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = useSelector((state) => state.common.oneMovie);

  const [activeShows,setActiveShows]=useState(0)

  useEffect(() => {
    dispatch(FetchOneMovie(movie_id));
  }, [dispatch]);

  if (!admin.email) {
    navigate("/login");
  }

  let now = new Date();

  const convertToDate = (dateString) => {
    return new Date(dateString);
  };

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
                  {screen?.show?.map((show) => {
                    const showdate = convertToDate(show?.date);
                    if (show?.deleted === true) {
                      return <>
                      
                      </>;
                    }
                    return (
                      
                      <div key={show?._id}>
                        {showdate.getTime() < now.getTime() ? (
                          <div className="show">
                            <div className="div1">
                              <span>{dateConverter(show?.date)}</span>
                              <span>{show?.show_time}</span>
                            </div>
                            <p>
                              <span>Price - Rs {show?.price}</span>
                            </p>
                            <button
                            className="btn-full"
                              onClick={() =>
                                dispatch(
                                  DeleteShow({
                                    movie_id: movie_id,
                                    show_id: show._id,
                                    screen_id: screen.screen_id,
                                  })
                                )
                              }
                            >
                              Delete Show
                            </button>
                          </div>
                        ) : (
                          <div className="show">
                            <div className="div1">
                              <span>{dateConverter(show?.date)}</span>
                              <span>{show?.show_time}</span>
                            </div>
                            <p>
                              <span>Price - Rs {show?.price}</span>
                            </p>
                            <button
                            className="btn-full"
                              onClick={() =>
                                navigate(
                                  `/admin/${movie_id}/${screen.screen_id}/${show._id}`
                                )
                              }
                            >
                              Booked Seats
                            </button>
                            <button
                            className="btn-full"
                              onClick={() =>
                                navigate(
                                  `/admin/editshow/${movie_id}/${screen.screen_id}/${show._id}`
                                )
                              }
                            >
                              Edit Show Price
                            </button>
                          </div>
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
}

export default AllShow;
