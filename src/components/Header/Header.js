import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link to="/home" className="navbar-brand">
           Panjabi <span>Fashion</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  {" "}
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="orders" className="nav-link">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link ">Admin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ">Deals</Link>
              </li>
              <li className="nav-item">
                { loggedInUser.signedInUser && (
                  <span className="nav-link user-name">
                    {loggedInUser.name}
                  </span>
                ) }
              </li>
              <li className="nav-item">
                {
                loggedInUser.signedInUser ? (
                  <Link
                    onClick={() => setLoggedInUser({})}
                    className="btn main-btn"
                    href="#"
                  >
                    Sign Out
                  </Link>)
                 : 
                 ( <Link to="/login" className="btn main-btn" href="#">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
