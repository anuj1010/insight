import React from "react";
import postImage from "../assets/post.jpg";
import PostContent from "../PostContent/PostContent";
import { formatISO9075 } from "date-fns";
import "./PostHero.css";
import { Link } from "react-router-dom";

const PostHero = ({
  title,
  summary,
  content,
  cover,
  author,
  createdAt,
  _id,
}) => {
  return (
    <div className="heroCard">
      <div className="heroLeft">
        <Link to={`/post/${_id}`}>
          <img src={cover.dataUrl} alt="demo" />
        </Link>
      </div>
      <div className="heroRight">
        <Link
          to={`/post/${_id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h1>{title}</h1>
        </Link>
        <h3>{summary}</h3>
        {/* <div className="heroText">
          <PostContent content={content} />
        </div> */}
        <p className="authDetails">
          {author.username}
          <br />
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
      </div>
    </div>
  );
};

export default PostHero;
