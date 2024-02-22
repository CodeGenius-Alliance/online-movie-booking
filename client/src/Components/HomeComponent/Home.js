import React, { useEffect } from "react";
import Navbar from "../NavbarComponent/Navbar";
import "./Home.css";
import AddMovie from "../AdminComponent/AddMovie";
import AddScreen from "../AdminComponent/AddScreen";
import AddShow from "../AdminComponent/AddShow";
import { useDispatch, useSelector } from "react-redux";
import AllMovies from "./AllMovies";
import { FetchAllMovies } from "../../Redux/Action";
function Home() {
  const user=useSelector((state)=>state.user.user)
  const admin=useSelector((state)=>state.admin.admin)



   if(user && user.email)
  {
    return (
      <>
        
        {/* <div className="Main-heading">
        <h1>TicketBlitz</h1>
        </div>
        <div className="description">
        <p>
          Elevate your entertainment game with TicketBlitz – your VIP pass to a
          cinematic wonderland where each frame weaves a tale, and every click
          unlocks the door to unmatched movie enchantment! Say farewell to the
          hassles of yesteryear's ticket chaos and step into a new era of movie
          indulgence with TicketBlitz's red carpet treatment
        </p> */}
        {/* </div> */}
        <AllMovies/>
        
      </>
    );
  }
  else if(admin && admin.email)
  {
    return (
      <>
        
        {/* <div className="Main-heading">
        <img src="C:\Users\Tushar\OneDrive\Desktop\JMAN Code BAse\online-movie-booking\client\public\Logo.png" className="logo"></img>
        <h1>JustBookit</h1>
        </div>
        <div className="description">
        <p>
          Elevate your entertainment game with TicketBlitz – your VIP pass to a
          cinematic wonderland where each frame weaves a tale, and every click
          unlocks the door to unmatched movie enchantment! Say farewell to the
          hassles of yesteryear's ticket chaos and step into a new era of movie
          indulgence with TicketBlitz's red carpet treatment
        </p>
        </div> */}
        <AllMovies/>
        <AddMovie/>
        <AddScreen/>
        <AddShow />
        
      </>
    );
  }
  else{
    return (
      <>
       
        {/* <div className="Main-heading"> */}
        {/* <h1>TicketBlitz</h1>
        </div>
        <div className="description">
        <p>
          Elevate your entertainment game with TicketBlitz – your VIP pass to a
          cinematic wonderland where each frame weaves a tale, and every click
          unlocks the door to unmatched movie enchantment! Say farewell to the
          hassles of yesteryear's ticket chaos and step into a new era of movie
          indulgence with TicketBlitz's red carpet treatment
        </p>
        </div> */}
        <AllMovies/>
        
      </>
    );
  }
}

export default Home;
