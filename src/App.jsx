import React from "react";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Footer from "./Components/Footer/Footer";
import CreatePost from "./Pages/CreatePost";
import Post from "./Components/Post/Post";
import EditPost from "./Components/EditPost/EditPost";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
