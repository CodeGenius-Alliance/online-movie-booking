import React, { useState } from 'react';

const SeatSelection = ({ rows, columns }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, column) => {
    // Toggle seat selection
    const seat = `${row}-${column}`;
    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter(selectedSeat => selectedSeat !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  return (
    <div>
      <h2>Seat Selection</h2>
      <p>Please select your seats:</p>

      <div className="seat-container">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {Array.from({ length: columns }, (_, columnIndex) => (
              <div
                key={columnIndex}
                className={`seat ${selectedSeats.includes(`${rowIndex}-${columnIndex}`) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(rowIndex, columnIndex)}
              >
                {String.fromCharCode(65 + rowIndex)}{columnIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p>Selected Seats: {selectedSeats.join(', ')}</p>
    </div>
  );
};

export default SeatSelection;

