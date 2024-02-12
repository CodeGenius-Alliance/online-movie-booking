import React from "react";
import { useState } from "react";
import "./Login.css";
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { Loginuser } from "../../Redux/Action/UserAction";
const Login = () => {
  const initialValue = { email: "", password: "" };
  const dispatch=useDispatch();
  const [formValues, setFormValue] = useState(initialValue);

  const handleClick = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const SubmitLogin=async(e)=>{
    e.preventDefault();
    try {
      dispatch(Loginuser(formValues))
    } catch (error) {
      
    }
  }

  return (
    <>
      <div>
       
        <form>
          <div className="container">
            <h1 className="heading">User Login</h1>

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

            <div>
            <button className="button" onClick={SubmitLogin}>SUBMIT</button>
           
            </div>
            <hr />
            <div>
            <Link to={'/admin'} className="login-links">Admin Login?</Link>
            </div>
            <div>
              <Link to={'/register'} className="login-links">Don't have account?</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
