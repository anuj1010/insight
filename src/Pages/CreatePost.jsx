import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "./CSS/CreatePost.css";

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

  const handleFileChange = (e) => {
    // Get the selected file from the input tag
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Store the file object in state
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
        "http://localhost:5000/api/blog/post",
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
      alert("something went wrong");
    }
  };

  // if (!loggedin || !userData) {
  //   return (
  //     <div className="createPost">
  //       <h3 className="loggedOut">Oops! Please Login To Create Post</h3>
  //     </div>
  //   );
  // }

  if (loggedOut) {
    return <Navigate to="/" />;
  }

  return (
    <div className="createPost">
      <h1 className="postTitle">Hello {userData.username}..... let's write!</h1>
      <form className="postForm" onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" name="cover" onChange={handleFileChange} />
        <div>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={content}
            onChange={(val) => setContent(val)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
