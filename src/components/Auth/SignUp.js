import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registUser, resetRegist } from "../../redux/actions/users/auth";
import swal from "@sweetalert/with-react";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  username: Yup.string()
    .max(12, "Must be 12 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .required("Required"),
});

export default function SignUp(props) {
  const [dataSignUp, setDataSignUp] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const {
    isRegistPending,
    isRegistFulfilled,
    isRegistRejected,
    errorRegist,
    isLoginPending,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isRegistFulfilled) {
      swal({
        content: (
          <div>
            <p className='modalstatusRegist'>
              Your account has been successfully created, please check email for
              verifying
            </p>
          </div>
        ),
        icon: "success",
      });
      setDataSignUp({
        name: "",
        username: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        dispatch(resetRegist());
      }, 3000);
    }
  }, [isRegistFulfilled]);
  return (
    <>
      <div className='signUp-box' id='signUp'>
        <h3 className='signUp-title'>Create Your Account</h3>
        <Formik
          initialValues={{ name: "", username: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(registUser(values));
            if (isRegistFulfilled) {
              setSubmitting(true);
            }
          }}>
          {(formik) => (
            <div className='form-container'>
              <input
                className='inputStyle'
                placeholder='Fullname'
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className='errorInput'>{formik.errors.name}</div>
              ) : null}

              <input
                className='inputStyle'
                placeholder='Username'
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className='errorInput'>{formik.errors.username}</div>
              ) : null}

              <input
                className='inputStyle'
                placeholder='Email'
                type='email'
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='errorInput'>{formik.errors.email}</div>
              ) : null}

              <input
                className='inputStyle'
                placeholder='Password'
                type='password'
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='errorInput'>{formik.errors.password}</div>
              ) : null}
              <button
                className='btnStyle'
                onClick={formik.handleSubmit}
                style={{ outline: "none" }}>
                {isRegistPending || isLoginPending ? (
                  <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          )}
        </Formik>

        <p className='signIn-link' onClick={() => props.setSignIn(true)}>
          Already have an account? <a href='#signIn'>SignIn</a>
        </p>
        <p className='msgError'>{isRegistRejected ? errorRegist.msg : null} </p>
      </div>
    </>
  );
}
