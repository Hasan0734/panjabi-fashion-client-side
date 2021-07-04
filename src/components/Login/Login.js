import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import { useForm } from "react-hook-form";
import "./Login.css";
import googleIcon from "../../images/icon/google.png"
import { UserContext } from "../../App";
import { Link, useHistory, useLocation } from "react-router-dom";
import { createUserEmalAndPassword, googleSignIn, initializedApp, signInWithEmailPassword } from "./LoginManager";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    signedInUser: false,
    name: "",
    email: "",
    error: "",
  });
  console.log(user.error);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { name, email, password1, password2 } = data;
    if (newUser) {
      let matchedPassword;
      if (password1 === password2) {
        matchedPassword = password2;
      }
      createUserEmalAndPassword(name, email, matchedPassword).then((res) => {
        handleResponse(res);
      });
    }
    signInWithEmailPassword(email, password1).then((res) => {
      handleResponse(res);
    });
  };

  initializedApp();
  const handleGoogleSign = () => {
    googleSignIn().then((res) => {
      handleResponse(res);
    });
  };
  const handleResponse = (res) => {
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
  };
  return (
    <div className="login-page container">
      <Header/>
      <div className="login-area">
        <div className="login-box">
          <h2>{newUser ? "Create an account" : "Login"}</h2>
          <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            {newUser && (
              <div>
                <input
                  type="text"
                  className="form-control input-field"
                  {...register("name", { required: true })}
                  placeholder="Name"
                />
                {errors.name && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            )}
            <input
              type="email"
              className="form-control input-field"
              {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-danger">This field is required</span>
            )}
            <input
              type="password"
              className="form-control input-field"
              {...register("password1", { required: true, pattern: /\d{1}./ })}
              placeholder="Password"
            />
            {errors.password1 && (
              <span className="text-danger">This field is required</span>
            )}
            {newUser && (
              <div>
                <input
                  type="password"
                  className="form-control input-field"
                  {...register("password2", {
                    required: true,
                    pattern: /\d{1}./,
                  })}
                  placeholder="Confirm Password"
                />
                {errors.password2 && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            )}

            {newUser === false && (
              <div className="d-flex justify-content-between mt-4">
                <div className="d-flex align-items-center">
                  <input type="checkbox" name="remember" id="" />
                  <label className="ms-1" htmlFor="remember">
                    Remember me
                  </label>
                </div>
                <Link className="text-danger">Forgot Password</Link>
              </div>
            )}
            <p className="text-danger"> {user.error}</p>
            <input className="form-control submit-button" type="submit" />
            {newUser ? (
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link
                  onClick={() => setNewUser(!newUser)}
                  className="text-danger"
                >
                  Login
                </Link>
              </p>
            ) : (
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link
                  onClick={() => setNewUser(!newUser)}
                  className="text-danger"
                >
                  Create an account
                </Link>
              </p>
            )}
          </form>
        </div>
        <div className="another-way my-3">
          <div className="or"></div>
          <h4 className="mx-2">Or</h4>
          <div className="or"></div>
        </div>
        <div onClick={handleGoogleSign} className="continue-another">
          <div className="btn-google">
            <img src={googleIcon} alt="" />
            <span className="text-center">Continue with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
