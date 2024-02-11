import React, { useState } from "react";
import axios from "axios";
import "./CSS/SignUp.css";
import baseUrl from "../Components/url";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
        // "http://localhost:5000/api/blog/register",
        `${baseUrl}/register`,
        formData
      );
      console.log("response", response);
      if (response.status === 200) {
        alert("User Registered Successfully");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data === "Email already exists"
      ) {
        alert("Email already exists");
      } else {
        alert("Registration failed");
      }
    }
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit} className="form">
        <h2>
          Register
          <hr />
        </h2>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </label>

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
