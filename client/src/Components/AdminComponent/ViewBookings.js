import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { FetchBooking } from '../../Redux/Action/AdminAction';

function ViewBookings() {
    const { movie_id, screen_id, show_id }=useParams();
    const booking=useSelector((state)=>state.admin.bookings)
    const admin=useSelector((state)=>state.admin.admin)
    const dispatch=useDispatch();

    console.log("all booking",booking)
    useEffect(()=>{
        dispatch(FetchBooking({movie_id,screen_id,show_id}))
    },[]) 
   
    const rows = 10;
    const cols = 10;
  
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [allSeats, setAllSeats] = useState([]);
  
   
    const [movieDetail,setMovieDetail]=useState();
    const [booked, setbooked] = useState(0);
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
      setbooked(0);
      let seatsbooked = 0;
      let copy = [...matrix];
      booking.map((getseat) =>
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
  
  
  
  
  
    for (let j = 0; j < cols; j++) {
      let temp = [];
      for (let i = 0; i < rows; i++) {
        let seatName = String.fromCharCode(65 + j) + (i + 1);
        temp.push(seatName);
      }
      seatArray.push(temp);
    }
    if(!admin.email)
    {
      navigate('/login')
    }
  
  
    return (
      <div>
        <center>
          <h1>Seat Selection</h1>
        </center>
        <hr />
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
        <hr />
        <div
          id="seatMap"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          {seatArray.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              {row.map((seat, colIndex) => {
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
            {selectedSeats.length > 0 && (
              <p>
                {selectedSeats.map((seat) => (
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
        <br />
        <hr />
        <center><div><h1>USER LIST WHO BOOKED SEATS</h1></div></center>
       
      </div>
    );
  };
  
 
  
export default ViewBookings