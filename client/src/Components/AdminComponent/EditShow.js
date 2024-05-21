import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EditShowPrice, FetchOneShow } from "../../Redux/Action/AdminAction";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../RegisterComponent/Register.css";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  price: Yup.number().required("Password is required."),
});


const EditShow = () => {
  const dispatch = useDispatch();
  const { movie_id, show_id, screen_id } = useParams();
  const initialShowData = useSelector((state) => state.admin.show);
  const admin = useSelector((state) => state.admin.admin);
  const [initialValues, setInitialValues] = useState({
    date: "",
    start_time: "",
    end_time: "",
    price: ""
  });
  useEffect(() => {
   if (initialShowData) {
      setInitialValues(initialShowData);
    }
  }, [dispatch, initialShowData]);


  useEffect(() => {
    dispatch(FetchOneShow({ movie_id, screen_id, show_id }))
  }, [dispatch, movie_id, screen_id, show_id]);

  const navigate = useNavigate();

  const Submit = (values) => {
  

    dispatch(EditShowPrice( {movie_id, show_id, screen_id,show: values} ));
    navigate(`/admin`);
  };


  if (admin && admin.email) {
    return (
      <div className="container">
        <h1>EDIT SHOW PRICE</h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={DisplayingErrorMessagesSchema}
          onSubmit={(values, { setSubmitting }) => {
            Submit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="box">
                <Field
                  
                  name="date"
                  autoComplete="off"
                  values={initialValues.date}
                  disabled
                />
              </div>
              <div className="box">
                <Field
                  
                  name="show_time"
                  values={initialValues.start_time}
                  autoComplete="off"
                  disabled
                />
              </div>
             
              <div className="box">
                <Field
                  type="number"
                  name="price"
                  values={initialValues.price}
                  autoComplete="off"
                />
                <ErrorMessage name="price" component="div" className="error" />
              </div>
              <div>
                <button
                  className="btn-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  SUBMIT
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    navigate("/login");
    return null;
  }
};

export default EditShow;