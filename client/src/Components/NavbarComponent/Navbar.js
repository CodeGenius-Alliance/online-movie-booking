import React, { useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../Redux/Action/UserAction";
import { Toaster } from "sonner";
function Navbar() {
  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.admin.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //.log(user)

  const logoutMe = () => {
    navigate("/");
  };
  if (admin && admin.email) {
    return (
      <>
        <Toaster richColors></Toaster>
        <nav className="my-nav">
          <Link to="/">
            <h2 className="logo">TicketBlitz</h2>
          </Link>
          <div className="btn-grp">
            <p>ADMIN</p>
            <div>
              <button
                onClick={(e) => {
                  dispatch(Logout());
                  logoutMe();
                }}
              >
                LOGOUT
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  } else if (user && user.email) {
    <Toaster richColors></Toaster>;
    return (
      <>
        <nav className="my-nav">
          <Link className="logo" to="/">
            <h2>TicketBlitz</h2>
          </Link>
          <div className="btn-grp">
            <div>
              <p style={{ marginTop: "0px", marginBottom: "0px" }}>
                Hi, {user.name}
              </p>
              <span>
                <p style={{ marginTop: "0px", marginBottom: "0px" }}>
                  {user.email}
                </p>
              </span>
            </div>
            <div>
              <button
                onClick={(e) => {
                  logoutMe();
                  dispatch(Logout());
                }}
              >
                LOGOUT
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    <Toaster richColors></Toaster>;
    return (
      <>
        <nav className="my-nav">
          <Link className="logo" to="/">
            <h2>TicketBlitz</h2>
          </Link>
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
