import React from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Registeruser } from "../../Redux/Action/UserAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password is too short - should be 6 chars minimum."),
  email: Yup.string().email("Invalid email").required("Email is required."),
});

const Register = () => {
  const initialValue = { name: "", email: "", password: "" };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SubmitRegister = async (values) => {
    try {
      await dispatch(Registeruser(values));
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Registration Form</h1>

      <Formik
        initialValues={initialValue}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values, { setSubmitting }) => {
          SubmitRegister(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="box">
              <Field
                type="text"
                placeholder="Enter your name"
                name="name"
                autoComplete="off"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error"
              />
            </div>
            <div className="box">
              <Field
                type="email"
                placeholder="Enter your email"
                name="email"
                autoComplete="off"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error"
              />
            </div>
            <div className="box">
              <Field
                type="password"
                placeholder="Enter your password"
                name="password"
                autoComplete="off"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error"
              />
            </div>
            <div>
              <button className="btn-full" type="submit" disabled={isSubmitting}>
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
        <Link to={"/login"} className="login-links">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default Register;
