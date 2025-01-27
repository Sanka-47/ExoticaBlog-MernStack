import React, { useEffect, useState } from "react";
import { BlogCard } from "../src/components/BlogCard";
import { getPosts, deletePost, updateUser,getUser } from "../src/api";
import * as jwt_decode from "jwt-decode";

import "../src/index.css";
export function Profile() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  

  

  useEffect(() => {
   
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      const decodedUser = jwt_decode.jwtDecode(token);
      const allPosts = await getPosts();
      const User = await getUser(decodedUser._id);
      const filteredPosts = allPosts.filter(
        (post) => post.author == decodedUser._id
      );

   

      setPost(filteredPosts);
      setUser(User);
         const response = await getUser(decodedUser._id);
      if (response && response.data) {
        setName(response.name);
      }
      
    }
    loadUserData();
  }, []);


  async function LoadUser(){
    const response = await getUser(decodedUser._id);
    if (response) {
      setName(response.name);
    }
  }
  
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

  
  async function handleUpdate() {
    try {
      const token = sessionStorage.getItem("User");
      const decodedUser = jwt_decode.jwtDecode(token);
      const response = await updateUser(decodedUser._id, {
        name: name,
      });
      if (response && response.data) {
        setName(name); // Update user state
        // Update name state
        alert(`User name updated successfully to: ${name}`);
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("User update failed");
    }
  }
  return (
    <>
      <div className="mt-10">
        <label className="">User Name:</label>
        <input
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder={user.email}
          disabled
          style={{
            backgroundColor: "transparent",
            color: "white",
            cursor: "not-allowed",
            opacity: 0.7,
          }}
          className="custom-input me-5"
        />

        <label>Join Date:</label>
        <input
          onChange={(e) => setJoinDate(e.target.value)}
          type="text"
          placeholder={
            user.joinDate
              ? new Date(user.joinDate).toISOString().split("T")[0]
              : "No date available"
          }
          disabled
          style={{
            backgroundColor: "transparent",
            color: "white",
            cursor: "not-allowed",
            opacity: 0.7,
          }}
          className="custom-input"
        />
        <button onClick={handleUpdate}>Update</button>
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
