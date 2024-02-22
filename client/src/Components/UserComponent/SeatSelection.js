import React, { useState, useEffect } from "react";

const SeatSelection = () => {
  const rows = 10;
  const cols = 10;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatArray = [];
  for (let j = 0; j < cols; j++) {
    let temp = [];
    for (let i = 0; i < rows; i++) {
      let seatName = String.fromCharCode(65 + j) + (i + 1);
      temp.push(seatName);
    }
    seatArray.push(temp);
  }
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

  return (
    <div>
      <h2>Seat Selection</h2>
      <div
        id="seatMap"
        style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
      >
        {seatArray.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
            {row.map((seat, colIndex) => (
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
                  width: "40px",
                  height: "40px",
                  margin: "5px",
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
                    : "transparent",
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
            ))}
          </div>
        ))}
      </div>
      <div id="bookingStatus">
        {selectedSeats.length > 0 && (
          <p>
            {selectedSeats.map((seat) => (
              <span key={`${seat.row}_${seat.col}`}>
                {seatArray[seat.row][seat.col]}{" "}
              </span>
            ))}
            selected.
          </p>
        )}
      </div>
      <div>Total Price = {selectedSeats.length * 100}</div>
    </div>
  );
};

export default SeatSelection;
