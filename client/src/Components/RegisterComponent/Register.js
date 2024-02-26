import React from "react";
import { useState } from "react";
import "./Register.css";
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Registeruser } from "../../Redux/Action/UserAction";

//done
const Register = () => {
  const initialValue = { name: "", email: "", password: "" };
  const [formValues, setFormValue] = useState(initialValue);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleClick = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
   navigate('/login')
  };

  return (
    <>
       
        <form>
          <div className="container">
            <h1 className="heading">Registration Form</h1>
         
         
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formValues.name}
              onChange={handleClick}
            ></input>
          
          
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formValues.email}
              onChange={handleClick}
            ></input>
        
          
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formValues.password}
              onChange={handleClick}
            ></input>
          
          
            <button className="button" onClick={(e)=>{
              e.preventDefault();
              dispatch(Registeruser(formValues))}}>SUBMIT</button>
            <hr />
            <div>
            <Link to={'/admin'} className="login-links">Admin Login?</Link>
            </div>
            <div>
              <Link to={'/login'} className="login-links">Already have account?</Link>
            </div>
            </div>
        </form>
    </>
  );
};

export default Register;
