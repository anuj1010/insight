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

        const postsWithDataUri = response.data.map((post) => {
          const arrayBufferToBase64 = (buffer) => {
            let binary = "";
            const bytes = new Uint8Array(buffer);
            for (let i = 0; i < bytes.byteLength; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
          };

          const base64String = arrayBufferToBase64(post.cover.data.data);
          const dataUrl = `data:${post.cover.contentType};base64,${base64String}`;
          return {
            ...post,
            cover: {
              ...post.cover,
              dataUrl: dataUrl,
            },
          };
        });
        // console.log(postsWithDataUri);
        // console.log(response.data);

        setPosts(postsWithDataUri);
        // if (postsWithDataUri.length > 0) {
        //   setImageSrc(postsWithDataUri[0].cover.dataUrl);
        // }
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
