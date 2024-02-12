import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  const user = useSelector((state) => state.user.user);
  const admin=useSelector((state)=>state.admin.admin)
  //.log(user)
  if ( admin && admin.email) {
    return (
      <>
        <nav className="my-nav">
          <img src="/logo.svg" alt="" className="logo-img" />
          <div className="btn-grp">
            <h1>ADMIN</h1>
          </div>
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
            <h1>USER</h1>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="my-nav">
          <img src="/logo.svg" alt="" className="logo-img" />
          <div className="btn-grp">
            <Link className="login-btn" to={"/login"}>
              LOGIN{" "}
            </Link>
            <Link to={"/register"} className="login-btn">
              REGISTER{" "}
            </Link>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
