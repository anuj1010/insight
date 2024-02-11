import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import "./NavBar.css";
import logo from "../assets/logo.png";
import baseUrl from "../url";

function NavBar() {
  const [active, setActive] = useState("home");
  const { userData, setUserData, setLoggedOut, loggedOut } =
    useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/blog/profile",
          `${baseUrl}profile`,
          { withCredentials: true }
        );
        // setUserData(response.data);
        // console.log("Profile data:", response.data.userId);
      } catch (error) {
        // Handle error when profile data cannot be fetched
        if (error.response.status === 401) {
          // Unauthorized error, token expired
          alert("Your session has expired. Please log in again.");
          setUserData(null);
        } else {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    // Fetch profile data only if user is logged in
    if (userData && userData.username) {
      fetchData();
    }
  }, [userData]); // Fetch data when userData changes

  const username = userData?.username;

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        // "http://localhost:5000/api/blog/logout",
        `${baseUrl}logout`,
        {
          withCredentials: true,
        }
      );
      setUserData(null);
      // window.location.href = "/login";
      setLoggedOut(true);
      // console.log("Logout response:", response);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // if (loggedOut) {
  //   return <Link to={"/login"} />;
  // }

  return (
    <>
      {/* {loggedOut && <Navigate to={"/login"} />} */}
      <div className="navBar">
        <div className="navLogo">
          <Link
            to="./"
            onClick={() => {
              setActive("home");
            }}
          >
            <img src={logo} alt="Insight" className="logo" />
          </Link>
        </div>
        <ul className="navMenu">
          {username && (
            <>
              <Link
                to="/createPost"
                className="navLink"
                onClick={() => {
                  setActive("createPost");
                }}
              >
                <li>Create Post</li>
                {active === "createPost" ? <hr /> : null}
              </Link>
              <li>
                <a className="navLink" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          )}

          {!username && (
            <>
              <Link
                to="./login"
                className="navLink"
                onClick={() => {
                  setActive("login");
                }}
              >
                <li>Login</li>
                {active === "login" ? <hr /> : null}
              </Link>
              <Link
                to="./register"
                className="navLink"
                onClick={() => {
                  setActive("register");
                }}
              >
                <li>SignUp</li>
                {active === "register" ? <hr /> : null}
              </Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default NavBar;
