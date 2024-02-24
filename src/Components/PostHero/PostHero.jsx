import React from "react";
import { formatISO9075 } from "date-fns";
import "./PostHero.css";
import { Link } from "react-router-dom";

const PostHero = ({
  title,
  summary,

  cover,
  author,
  createdAt,
  _id,
}) => {
  return (
    <div className="heroCard">
      <div className="heroLeft">
        <Link to={`/post/${_id}`}>
          <img src={cover} alt="demo" />
        </Link>
      </div>
      <div className="heroRight">
        <Link
          to={`/post/${_id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h1>{title}</h1>
          <h3>{summary}</h3>
        </Link>
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
