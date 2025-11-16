import React, { useState, useEffect } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import '../assets/css/auth.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggle = () => setIsSignUp(!isSignUp);

  useEffect(() => {
      // Register page에서 올 경우 회원가입 폼을 바로 보이도록
      if (window.location.pathname === "/register") {
        setIsSignUp(true);
      } else {
        setIsSignUp(false);
      }
    }, []);

  return (
    <div id="container" className={`container ${isSignUp ? "sign-up" : "sign-in"}`}>
      <div className="row">
        <SignUpForm toggle={toggle} />
        <SignInForm toggle={toggle} />
      </div>

      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-in"><h2>Welcome</h2></div>
          <div className="img sign-in"></div>
        </div>
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up"><h2>Join with us</h2></div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;