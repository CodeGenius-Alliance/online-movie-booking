import React, { useEffect } from "react";

import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import AllMovies from "./AllMovies";
import { FetchAllMovies } from "../../Redux/Action";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";
function Home() {
  const user=useSelector((state)=>state.user.user)
  const admin=useSelector((state)=>state.admin.admin)



  if(admin && admin.email)
  {
    return (
      <div className="main">
     
        <div className="Main-heading ">
       
        <h1>TicketBlitz</h1>
        </div>
        <div className="description">
        <em><p className="heading">
          Elevate your entertainment game with TicketBlitz – your VIP pass to a
          cinematic wonderland where each frame weaves a tale, and every click
          unlocks the door to unmatched movie enchantment! Say farewell to the
          hassles of yesteryear's ticket chaos and step into a new era of movie
          indulgence with TicketBlitz's red carpet treatment
        </p></em>
        </div>
        <div className="flex-btn">
        <button><Link className="link" to={'/admin/addmovie'}>Add Movie</Link> <br /></button>
        <button><Link className="link" to={'/admin/addscreen'}> Add Screen</Link></button>
        </div>
      {/** lists of movie and navigate to particular movie accordingly*/}
       
       <center> <AllMovies/></center>
    
        
      </div>
    );
  }
  else{
    return (
      <div className="main">
       
        <div className="Main-heading ">
       
        <h1>TicketBlitz</h1>
        </div>
        <div className="description">
       <em> <p className="heading">
          Elevate your entertainment game with TicketBlitz – your VIP pass to a
          cinematic wonderland where each frame weaves a tale, and every click
          unlocks the door to unmatched movie enchantment! Say farewell to the
          hassles of yesteryear's ticket chaos and step into a new era of movie
          indulgence with TicketBlitz's red carpet treatment
        </p></em>
        </div>
      
        <center> <AllMovies/></center>
    
        
        
      </div>
    );
  }
}

export default Home;
