import React, { useState } from "react";
import "./auth.css";
import logo from "../../assets/images/logoapp.png";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Auth() {
  const [signInCondition, setSignIn] = useState(true);

  return (
    <>
      <div className='sign_container'>
        <div className='sign_box'>
          <SignUp setSignIn={setSignIn} />
          <SignIn setSignIn={setSignIn} />
          <div
            className={`overlay ${signInCondition ? null : "signUp-active"}`}>
            <div className='overlay-content'>
              <img style={{ width: "25%" }} alt='' src={logo} />
              <h3>Welcome to Personal Todo!</h3>
              <p>To use our feauture, please sign up or login first.</p>
            </div>
          </div>
          <div
            className={`overlay-left ${
              signInCondition ? "overlay-leftActive" : null
            }`}>
            <img style={{ width: "25%" }} alt='' src={logo} />
            <h3>Hello, Friend!</h3>
            <p>Enter your personal details and start journey with us</p>
            <button
              onClick={() => setSignIn(false)}
              className='btnStyle btnOverlay'
              style={{ outline: "none" }}>
              Sign Up
            </button>
          </div>
          <div
            className={`overlay-right ${
              signInCondition ? null : "overlay-rightActive"
            }`}>
            <img style={{ width: "25%" }} alt='' src={logo} />
            <h3>Welcome back!</h3>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              onClick={() => setSignIn(true)}
              className='btnStyle btnOverlay'
              style={{ outline: "none" }}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
