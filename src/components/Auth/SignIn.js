import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../redux/actions/users/auth";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .required("Required"),
});

export default function SignIn(props) {
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(dataLogin));
  };
  const { isLogin, isLoginPending, isLoginRejected, errorLogin } = useSelector(
    (state) => state.auth
  );
  const history = useHistory();
  useEffect(() => {
    if (isLogin) {
      history.push("/todos");
    }
  }, [isLogin]);
  return (
    <>
      <div className='signIn-box' id='signIn'>
        <h3 className='signUp-title'>Login</h3>
        {/* <form className='form-container' onSubmit={(e) => handleLogin(e)}>
          <input
            className='inputStyle'
            placeholder='Email'
            type='email'
            value={dataLogin.email}
            onChange={(e) =>
              setDataLogin({ ...dataLogin, email: e.target.value })
            }
          />
          <input
            className='inputStyle'
            placeholder='Password'
            type='password'
            value={dataLogin.password}
            onChange={(e) =>
              setDataLogin({ ...dataLogin, password: e.target.value })
            }
            required
          />
          <button className='btnStyle'>
            {isLoginPending ? (
              <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
            ) : (
              "Sign In"
            )}
          </button>
        </form> */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // alert(`${values.email}`);
            dispatch(loginUser(values));
          }}>
          {(formik) => (
            <div className='form-container'>
              <input
                className='inputStyle'
                type='email'
                {...formik.getFieldProps("email")}
                placeholder='Email'
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='errorInput'>{formik.errors.email}</div>
              ) : null}
              <input
                className='inputStyle'
                type='password'
                {...formik.getFieldProps("password")}
                placeholder='Password'
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='errorInput'>{formik.errors.password}</div>
              ) : null}

              <button
                className='btnStyle'
                onClick={formik.handleSubmit}
                style={{ outline: "none" }}>
                {isLoginPending ? (
                  <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          )}
        </Formik>
        <p className='signIn-link' onClick={() => props.setSignIn(false)}>
          Have not an account? <a href='#signUp'>SignUp</a>
        </p>
        <p className='msgError'>{isLoginRejected ? errorLogin.msg : null} </p>
      </div>
    </>
  );
}
