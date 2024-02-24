import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import PostContent from "../PostContent/PostContent";
import "./Post.css";
import edit from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import baseUrl from "../url";

const Post = () => {
  const { id } = useParams();
  const [postWithId, setPostWithId] = useState();
  const { userData } = useContext(UserContext);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5000/api/blog/post/${id}`
          `${baseUrl}post/${id}`
        );

        setPostWithId(response.data);
        // console.log(response);
        // const arrayBufferToBase64 = (buffer) => {
        //   let binary = "";
        //   const bytes = new Uint8Array(buffer);
        //   for (let i = 0; i < bytes.byteLength; i++) {
        //     binary += String.fromCharCode(bytes[i]);
        //   }
        //   return window.btoa(binary);
        // };

        // const base64String = arrayBufferToBase64(response.data.cover.data.data);
        // const dataUrl = `data:${response.data.cover.contentType};base64,${base64String}`;

        // var newPost = {
        //   ...response.data,
        //   cover: {
        //     ...response.data.cover,
        //     dataUrl: dataUrl,
        //   },
        // };
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, []);
  // postWithId ? console.log("author", postWithId) : "";
  // userData ? console.log("userData", userData.id) : "";
  const handleDelete = async () => {
    const response = await axios.delete(`${baseUrl}post/${id}`, {
      withCredentials: true,
    });
    if (response.status == 200) {
      alert(response.data.message);
      setIsDeleted(true);
    }
    // console.log(response);
  };

  if (isDeleted) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {postWithId && (
        <div className="post-container">
          {userData && userData.id == postWithId.author._id && (
            <div className="buttonContainer">
              <Link to={`/edit-post/${postWithId._id}`} className="editLink">
                <div className="edit-button">
                  <img src={edit} alt="" />
                  Edit Post
                </div>
              </Link>
              <button onClick={handleDelete}>
                <img src={deleteIcon} alt="" className="deleteIcon" />
                Delete
              </button>
            </div>
          )}
          <img className="post-image" src={postWithId.cover} alt="" />
          <div className="author-details">
            <p>Author: {postWithId.author.username}</p>
            <p>
              Published: {new Date(postWithId.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="post-content">
            <h1 className="post-title">{postWithId.title}</h1>
            <p className="post-summary">{postWithId.summary}</p>
            <div className="post-detail">
              <PostContent content={postWithId.content} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
