import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BookMovie, FetchOneShow, FetchShowSeats } from "../../Redux/Action/UserAction";
import Loading from "./Loading";
import { FetchShow } from "../../Redux/Action/AdminAction";

const SeatSelection = () => {
  const user = useSelector((state) => state.user.user);
  const booking = useSelector((state) => state.user.booking);
  const rows = 10;
  const cols = 10;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [allSeats, setAllSeats] = useState([]);
  const dispatch = useDispatch();
  const { movie_id, screen_id, show_id } = useParams();
  const [movieDetail,setMovieDetail]=useState();
  const [booked, setbooked] = useState(0);
  
  const showDetail=useSelector((state)=>state.user.oneShow)
  console.log("show detail ",showDetail)
  
  const [matrix, setMatrix] = useState(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  );
  const navigate = useNavigate();
 
  const selectSeat = (row, col) => {
    const seat = { row, col };
    const isSelected = selectedSeats.some(
      (selectedSeat) => selectedSeat.row === row && selectedSeat.col === col
    );

    if (isSelected) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter(
          (selectedSeat) =>
            !(selectedSeat.row === row && selectedSeat.col === col)
        )
      );
    } else {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
    }
  };

  useEffect(() => {
    dispatch(FetchOneShow({movie_id,screen_id,show_id}))

    setbooked(0);
    let seatsbooked = 0;
    let copy = [...matrix];
    booking?.map((getseat) =>
      getseat.seats.map((seat) => {
        console.log("i am seats ", seat);
        copy[seat.row][seat.col] = 1;
        seatsbooked += 1;
      })
    );
    setMatrix(copy);
    setbooked(seatsbooked);
 
    console.log(matrix);
  }, [booking,dispatch,navigate]);

  
  const seatArray = [];



  useEffect(() => {
    dispatch(FetchShowSeats({ movie_id, screen_id, show_id }));

    if (user && !user.email) {
      return navigate("/login");
    }
  }, [user,dispatch, booked, movie_id, screen_id, show_id]);

  


  for (let j = 0; j < cols; j++) {
    let temp = [];
    for (let i = 0; i < rows; i++) {
      let seatName = String.fromCharCode(65 + j) + (i + 1);
      temp.push(seatName);
    }
    seatArray.push(temp);
  }


  return (
    <div>
      <center>
        <h1>Seat Selection</h1>
      </center>
      <div className="heads">
        <div className="d-flex justify-content-between flex-wrap">
          <div>
            Total Seats :{" "}
            <span style={{ fontWeight: "bolder", color: "blue" }}>
              {rows * cols}
            </span>
          </div>
          <div>
            Booked Seats :{" "}
            <span style={{ fontWeight: "bolder", color: "red" }}>{booked}</span>
          </div>
          <div>
            Available Seats :{" "}
            <span style={{ fontWeight: "bolder", color: "green" }}>
              {rows * cols - booked}
            </span>
          </div>
          
        </div>
      </div>
      <div
        id="seatMap"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        {seatArray?.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            {row?.map((seat, colIndex) => {
              return matrix[rowIndex][colIndex] == 1 ? (
                <div
                  key={colIndex}
                  className="booked-seats"
                  style={{
                    fontSize: "16px",
                    padding: "3px",
                    width: "45px",
                    height: "15px",
                    margin: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #ccc",
                    backgroundColor: "red",
                    color: selectedSeats.some(
                      (selectedSeat) =>
                        selectedSeat.row === rowIndex &&
                        selectedSeat.col === colIndex
                    )
                      ? "#fff"
                      : "#000",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {seat}
                </div>
              ) : (
                <div
                  key={colIndex}
                  className={`seat ${
                    selectedSeats.some(
                      (selectedSeat) =>
                        selectedSeat.row === rowIndex &&
                        selectedSeat.col === colIndex
                    ) && "selected"
                  }`}
                  onClick={() => selectSeat(rowIndex, colIndex)}
                  style={{
                    fontSize: "16px",
                    padding: "3px",
                    width: "45px",
                    height: "15px",
                    margin: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #ccc",
                    backgroundColor: selectedSeats.some(
                      (selectedSeat) =>
                        selectedSeat.row === rowIndex &&
                        selectedSeat.col === colIndex
                    )
                      ? "#3498db"
                      : "green",
                    color: selectedSeats.some(
                      (selectedSeat) =>
                        selectedSeat.row === rowIndex &&
                        selectedSeat.col === colIndex
                    )
                      ? "#fff"
                      : "#000",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {seat}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <center>
        <div id="bookingStatus" className="heads">
          {selectedSeats?.length > 0 && (
            <p>
              {selectedSeats?.map((seat) => (
                <span key={`${seat.row}_${seat.col}`}>
                  {seatArray[seat.row][seat.col]}
                  {" , "}
                </span>
              ))}
              selected.
            </p>
          )}
        </div>
      </center>
      <center>
        <div className="heads">Total Price = {( (showDetail?.price)? showDetail.price*selectedSeats?.length:<>reloading</> )}</div>
        <button onClick={() =>{dispatch(BookMovie({ movie_id, screen_id, show_id }, selectedSeats));
      dispatch(FetchShowSeats({ movie_id, screen_id, show_id }))
     
      setTimeout(()=>  {window.location.reload()
      alert("seats has been booked")
      },1000)
    
      
      }}>Book Now</button>
      </center>
    </div>
  );
};

export default SeatSelection;
