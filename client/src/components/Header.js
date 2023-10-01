import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("users"));
    if (user) {
      setUser(user);
    }
  }, []);

  const logouthandler = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };
return (
    <>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:"rgb(191 218 219)"}}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand mx-2 fs-3 fw-semibold text-primary" to="/">
            💲Expense Management
            </Link>
            <ul className="navbar-nav ms-auto mt-2 mb-lg-0">
              {user ? (
                <>
                  <li className="nav-item">
                    <p
                      className="nav-link fs-4 text-capitalize fw-semibold px-lg-5 pb-0"
                      aria-current="page"
                    >
                      🧑🏽<span className="text-primary">{user && user.name}</span>
                    </p>
                  </li>
                  <li className="nav-item mx-2 ">
                    <button className="btn btn-danger mt-2" onClick={logouthandler}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-2 my-2">
                    <Link className="btn btn-primary" to="/login">
                      Signin
                    </Link>
                  </li>
                  <li className="nav-item mx-2 my-2">
                    <Link className="btn btn-primary" to="/register">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
