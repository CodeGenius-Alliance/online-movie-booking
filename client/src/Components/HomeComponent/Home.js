import React from "react";
import Navbar from "../NavbarComponent/Navbar";
import "./Home.css";
function Home() {
  return (
    <>
      <Navbar />
      <div className="Main-heading">
      <h1>TicketBlitz</h1>
      </div>
      <div className="description">
      <p>
        Elevate your entertainment game with TicketBlitz – your VIP pass to a
        cinematic wonderland where each frame weaves a tale, and every click
        unlocks the door to unmatched movie enchantment! Say farewell to the
        hassles of yesteryear's ticket chaos and step into a new era of movie
        indulgence with TicketBlitz's red carpet treatment
      </p>
      </div>
      
    </>
  );
}

export default Home;
