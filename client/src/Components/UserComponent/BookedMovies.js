import React, { useEffect } from "react";
import "./BookedMovie.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CancelMovieTickets,
  FetchBookMovie,
  FetchMovieDetail,
} from "../../Redux/Action/UserAction";
import { useParams } from "react-router-dom";

function BookedMovies() {
  const dispatch = useDispatch();
  const bookedmovies = useSelector((state) => state.user.bookedmovies);

  console.log("booked movie ,", bookedmovies);
  useEffect(() => {
    dispatch(FetchBookMovie());
    console.log(bookedmovies);
  }, []);

  const dateConverter = (date) => {
    const originalDate = new Date(date);
    const options = { day: "numeric", month: "short" };
    const formattedDate = originalDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <div className="main">
      <center>
        <div>
          <h1>BookedMovies</h1>
        </div>
      </center>

      {bookedmovies ? (
        bookedmovies.map((item, index) => (
          <>
            <div className="booked-movie-div">
              {/* <div>
                <h1>{index + 1}</h1>
              </div> */}
              {/* <div className="d-flex justify-content-between text-wrap">
                <p>Booking Id</p>
                <p>{item._id}</p>
              </div> */}
              <div className="d-flex justify-content-between text-wrap">
                <p>Movie Id</p>
                <p>{item.movie.title}</p>
              </div>
              <div className="d-flex justify-content-between text-wrap">
                <p>Screen Name</p>
                <p>{item.screen}</p>
              </div>
              <div className="d-flex justify-content-between text-wrap">
                <p>Total Seats</p>
                <p> {item.seats.length}</p>
              </div>
              {/* <div className="d-flex justify-content-between text-wrap">
                <p>Show Id</p>
                <p>{item.show.show_id}</p>
              </div> */}
              <div className="d-flex justify-content-between text-wrap">
                <p>Show time</p>
                <p>{dateConverter(item.show.date)}</p>
              </div>
              <div className="d-flex justify-content-between text-wrap">
                <p>Total Payment ( Rs {item.show.price} per seat )</p>
                <p>Rs {item.show.price * item.seats.length}</p>
              </div>
              <div className="d-flex justify-content-between text-wrap">
                <div></div>
                <button onClick={() => dispatch(CancelMovieTickets(item))}>
                  Cancel Movie
                </button>
              </div>
            </div>
          </>
        ))
      ) : (
        <>YOUR BOOKING</>
      )}
    </div>
  );
}

export default BookedMovies;
