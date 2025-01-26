import React, { useEffect, useState } from "react";
import { BlogCard } from "../src/components/BlogCard";
import { getPosts, deletePost } from "../src/api";
import * as jwt_decode from "jwt-decode";

import '../src/index.css';
export function Profile() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      const decodedUser = jwt_decode.jwtDecode(token);
      const allPosts = await getPosts();
      const filteredPosts = allPosts.filter(
        (post) => post.author == decodedUser._id
      );
      setPost(filteredPosts);
      setUser(decodedUser);
    }
    loadUserData();
  }, []);

  async function handleDeletePost(id) {
    try {
      // Validate id
      if (!id) {
        throw new Error("Post ID is required");
      }

      // Ask for confirmation
      const confirmed = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!confirmed) {
        return;
      }

      const response = await deletePost(id);

      // Check for specific response status
      if (response && response.status === 200) {
        // Update posts state after deletion
        setPost((prevPosts) => prevPosts.filter((post) => post._id !== id));
        alert("Post deleted successfully");
      } else {
        throw new Error("Delete operation failed");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(`Failed to delete post: ${error.message}`);
    }
  }
  return (
    <>
      <div >
        <label>Name:</label>
        <input
          type="text"
          placeholder={user.name}
          style={{
            backgroundColor: "transparent",
            color: "white",
          }}
          className="custom-input"
        />

        <label>Email:</label>
        <input
          type="text"
          placeholder={user.email}
          style={{
            backgroundColor: "transparent",
            color: "white",
          }}
          className="custom-input"
        />

        <label>Join Date:</label>
        <input
          type="text"
          placeholder={user.joinDate}
          style={{
            backgroundColor: "transparent",
            color: "white",
          }}
          className="custom-input"
        />
      </div>

      <style>
        {`
    .custom-input::placeholder {
      color: white !important;
      opacity: 1;
    }
  `}
      </style>

      {post && post.length > 0 ? (
        post.map((post) => (
          <div key={post._id}>
            <BlogCard post={post} />
            <button onClick={() => handleDeletePost(post._id)}>
              Delete Post
            </button>
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </>
  );
}
