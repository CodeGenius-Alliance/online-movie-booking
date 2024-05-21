import React, { useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "../../Redux/Action/UserAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password is too short - should be 6 chars minimum."),
  email: Yup.string().email("Invalid email").required("Email is required."),
});

const Login = () => {

  const admin = useSelector((state) => state.admin.admin);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const initialValue = { email: "", password: "" };
  const dispatch = useDispatch();

  useEffect(() => {
    if ((admin && admin.email) || (user && user.email)) {
      navigate("/");
    }
  }, [user, admin, navigate, dispatch]);

  const SubmitLogin = (values) => {
    try {
      dispatch(Loginuser(values));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="heading">User Login</h1>

        <Formik
          initialValues={initialValue}
          validationSchema={DisplayingErrorMessagesSchema}
          onSubmit={(values) => {
            SubmitLogin(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="box">
                <Field
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  autocomplete="off"
                />
                <ErrorMessage style={{color:"red",fontWeight:"bold"}} name="email" component="div" className="error" />
              </div>
              <div className="box">
                <Field
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  autocomplete="off"
                />
                <ErrorMessage  style={{color:"red",fontWeight:"bold"}} name="password" component="div" className="error" />
              </div>
              <div>
                <button className="btn-full" type="submit">
                  SUBMIT
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <hr />
        <div>
          <Link to={"/admin"} className="login-links">
            Admin Login?
          </Link>
        </div>
        <div>
          <Link to={"/register"} className="login-links">
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;