import React, { useEffect } from "react";
import "./BookedMovie.css";
import { useDispatch, useSelector } from "react-redux";
import { CancelMovieTickets, FetchBookMovie, FetchMovieDetail } from "../../Redux/Action/UserAction";
import { useParams } from "react-router-dom";

function BookedMovies() {
  const dispatch = useDispatch();
  const bookedmovies = useSelector((state) => state.user.bookedmovies);

  console.log("booked movie ,", bookedmovies);
  useEffect(() => {
    dispatch(FetchBookMovie());
    
  }, []);

  return (
    <div className="main">
      <center>
        <div>
          <h1>BookedMovies</h1>
        </div>
      </center>
{/**{
    "movie": {
        "title": "Jatt Nuu Chudail Takri "
    },
    "show": {
        "date": "2024-05-29T00:00:00.000Z",
        "price": "200"
    },
    "seats": [
        {
            "row": 8,
            "col": 2
        },
        {
            "row": 9,
            "col": 3
        }
    ],
    "_id": "65e5fcab2fa6ac4172671431"
} */}
   
        {bookedmovies ? bookedmovies.map((item,index) => <>
        <div className="booked-movie-div">
            <div><h1>{index+1}</h1></div>
            <div className="d-flex justify-content-between text-wrap"><h3 >Booking Id</h3><h3>{item._id}</h3></div>
            <div  className="d-flex justify-content-between text-wrap"><h3>Movie Id</h3>
            <h3>{item.movie.title}</h3></div>
            <div  className="d-flex justify-content-between text-wrap">
            <h3>ScreenId</h3>
            <h3>{item.screen}</h3>
            </div>
            <div  className="d-flex justify-content-between text-wrap">
               <h3>Total Seats</h3>
               <h3> {item.seats.length}</h3>
            </div >
            <div  className="d-flex justify-content-between text-wrap"><h3>Show Id</h3><h3>{item.show.show_id}</h3></div>
            <div  className="d-flex justify-content-between text-wrap"><h3>Show time</h3><h3>{item.show.date}</h3></div>
            <div  className="d-flex justify-content-between text-wrap"><h3>Total Payment</h3><h3>{item.show.price*item.seats.length } { " "}(per seat Rs. {item.show.price} )</h3></div>
            <div className="d-flex justify-content-between text-wrap"><div></div><button onClick={()=>dispatch(CancelMovieTickets(item))}>Cancel Movie</button></div>
           
        </div>
        </>) : <>YOUR BOOKING</>}
     
    </div>
  );
}

export default BookedMovies;
