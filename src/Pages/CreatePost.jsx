import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "./CSS/CreatePost.css";
import baseUrl from "../Components/url";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const { userData, loggedOut } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleFileChange = (e) => {
    // Get the selected file from the input tag
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const maxSize = 300 * 1024; // 500 KB limit
      // Check if the file size exceeds the limit
      if (selectedFile.size > maxSize) {
        // Display error message to the user
        setErrorMessage(
          "File size exceeds the limit! Please choose a file smaller than 300KB."
        );
        // Clear the selected file
        setFile(null);
        e.target.value = null;
      } else {
        // Clear any previous error message
        setErrorMessage("");
        // Store the file object in state
        setFile(selectedFile);
      }
    }
  };

  const handleCreatePost = async (ev) => {
    ev.preventDefault();

    // Create FormData object to send data including the file
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("cover", file);

    try {
      const postResponse = await axios.post(
        // "http://localhost:5000/api/blog/post",
        `${baseUrl}post`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (postResponse.status === 200) {
        alert("Post Created Successfully");
        setRedirect(true);
      }
      setTitle("");
      setSummary("");
      setContent("");
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
      // console.log("postresponse", postResponse);
      // console.log("formdata", data);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("something went wrong Re-Login");
    }
  };

  if (loggedOut) {
    return <Navigate to="/" />;
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="createPost">
      <h1 className="postTitle">Hello {userData.username}..... let's write!</h1>

      <form className="postForm" onSubmit={handleCreatePost}>
        <div className="form-group">
          <label htmlFor="title">
            Title<span className="required-field"></span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="summary">
            Summary<span className="required-field"></span>
          </label>
          <input
            type="text"
            id="summary"
            name="summary"
            placeholder="Summary"
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cover">
            Cover Image<span className="required-field"></span>
          </label>
          <input
            type="file"
            id="cover"
            name="cover"
            onChange={handleFileChange}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="content">
            Content<span className="required-field"></span>
          </label>
          <ReactQuill
            id="content"
            modules={modules}
            formats={formats}
            value={content}
            onChange={(val) => setContent(val)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
