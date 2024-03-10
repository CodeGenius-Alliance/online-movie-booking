import React, { useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../Redux/Action/UserAction";
import { Toaster } from 'sonner'
function Navbar() {
  const user = useSelector((state) => state.user.user);
  const admin=useSelector((state)=>state.admin.admin)
  const dispatch=useDispatch();
  const navigate=useNavigate();
 
  //.log(user)

  const logoutMe=()=>{
    navigate('/');
  }
  if ( admin && admin.email) {
    return (
      <>
    
        <nav className="my-nav">
          <img src="/logo.svg" alt="" className="logo-img" />
          <div className="btn-grp">
            <h1>ADMIN</h1>
          </div>
          <div><button onClick={(e)=>{dispatch(Logout())
          logoutMe()}}>LOGOUT</button></div>
        </nav>
       
      </>
    );
  }
  else if ( user && user.email) {
   
    return (
      <>
        <nav className="my-nav">
          <img src="/logo.svg" alt="" className="logo-img" />
          
          <div className="btn-grp">
            <h1 className="nav-link">USER</h1>
            
          </div>
          <div className="btn-grp d-flex">
          <div><pre className="number" style={{color:"while"}}>{user.bookedmovie.length }</pre></div>
            <h1><Link className="nav-link " to={'/user/booked-movies'}>MY SHOWS</Link></h1>
            
          </div>
         
          <div><button onClick={(e)=>{
            logoutMe()
            dispatch(Logout())
          }
          }>LOGOUT</button></div>
          
        </nav>
   
      </>
    );
  } else {
    return (
      <>
        <nav className="my-nav">
          <img src="/logo.svg" alt="" className="logo-img" />
          <div className="btn-grp">
            <button className="login-btn" onClick={()=>navigate('/login')}>
              LOGIN{" "}
            </button>
           <button className="login-btn" onClick={()=>navigate('/register')}>
           
              REGISTER{" "}
           
           </button>
          </div>
        </nav>
      
      </>
    );
  }
}

export default Navbar;
