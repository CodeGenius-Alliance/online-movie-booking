import React from "react";
import { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { Loginadmin } from "../../Redux/Action/AdminAction";

const AdminLogin = () => {
  const initialValue = { email: "", password: "" };
  const [formValues, setFormValue] = useState(initialValue);
const dispatch=useDispatch();
  const handleClick = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
    console.log(formValues);
  };

  return (
    <>
      <div>
        <h1 className="head">Login Here</h1>
        <form>
          <div className="container">
            <h1 className="heading">Admin Login</h1>

            <div className="box">
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formValues.email}
                onChange={handleClick}
              ></input>
            </div>
            <div className="box">
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formValues.password}
                onChange={handleClick}
              ></input>
            </div>

            <button className="button" onClick={(e)=>{e.preventDefault()
            dispatch(Loginadmin(formValues))
            }}>SUBMIT</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
