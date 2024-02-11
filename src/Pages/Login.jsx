import React, { useContext, useState } from "react";
import axios from "axios";
import "./CSS/Login.css";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const { setUserData, setLoggedOut } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:5000/api/blog/login",
        "https://long-plum-marlin-hat.cyclic.app/api/blog/login",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setRedirect(true);
        setUserData(response.data);
        alert("Login successful");
        setLoggedOut(false);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response.data.message);
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>
          Login
          <hr />
        </h2>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
