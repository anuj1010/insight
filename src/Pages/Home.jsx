import axios from "axios";
import React, { useEffect, useState } from "react";
import PostHero from "../Components/PostHero/PostHero";
import "./CSS/Home.css";
import baseUrl from "../Components/url";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/blog/post"
          `${baseUrl}post`,
          { withCredentials: true }
        );

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);
  return (
    <>
      <div className="homeContainer">
        {posts.length > 0 &&
          posts.map((val) => {
            return <PostHero {...val} key={val._id} />;
          })}
      </div>
    </>
  );
}

export default Home;
