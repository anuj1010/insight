import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./EditPost.css";
import ReactQuill from "react-quill";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import baseUrl from "../url";

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

const EditPost = () => {
  const { id } = useParams();
  const { loggedOut } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  // console.log(id);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        // `http://localhost:5000/api/blog/post/${id}`
        `${baseUrl}post/${id}`
      );
      // console.log(response);
      setTitle(response.data.title);
      setSummary(response.data.summary);
      setContent(response.data.content);
    };
    fetchPost();
  }, []);

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

  const handleUpdatePost = async (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    if (file) {
      data.append("cover", file);
    }
    const updatePost = await axios.put(
      // `http://localhost:5000/api/blog/post/${id}`,
      `${baseUrl}post/${id}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (updatePost.status == 200) {
      setRedirect(true);
    }

    // console.log(redirect);
  };
  if (loggedOut) {
    return <Navigate to="/" />;
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div className="createPost">
      <form className="postForm" onSubmit={handleUpdatePost}>
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
          <label htmlFor="cover">Cover Image</label>
          <input
            type="file"
            id="cover"
            name="cover"
            onChange={handleFileChange}
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
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
