import React, { useEffect } from "react";
import Navbar from "../NavbarComponent/Navbar";
import "./Home.css";
import AddMovie from "../AdminComponent/AddMovie";
import AddScreen from "../AdminComponent/AddScreen";
import AddShow from "../AdminComponent/AddShow";
import { useDispatch, useSelector } from "react-redux";
import AllMovies from "./AllMovies";
import { FetchAllMovies } from "../../Redux/Action";
import { Link } from "react-router-dom";
function Home() {
  const user=useSelector((state)=>state.user.user)
  const admin=useSelector((state)=>state.admin.admin)




  if(admin && admin.email)
  {
    return (
      <>
        
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
        <Link className="link" to={'/admin/addmovie'}>Add Movie</Link> <br />
        <Link className="link" to={'/admin/addscreen'}> Add Screen</Link>
      {/** lists of movie and navigate to particular movie accordingly*/}
        <AllMovies/>
    
        
      </>
    );
  }
  else{
    return (
      <>
       
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
        <AllMovies/>
        
        
      </>
    );
  }
}

export default Home;
