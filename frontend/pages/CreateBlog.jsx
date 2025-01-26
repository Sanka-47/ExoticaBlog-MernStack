import React, { useEffect, useState } from "react";
import { createPost } from "../src/api";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";




export function CreateBlog() {

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("User");
      if (token) {
        const decodedUser = jwt_decode.jwtDecode(token);
        setAuthor(decodedUser._id);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);
  const [author, setAuthor] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    
    e.preventDefault();

    try {
      // let submitObject = {
      //   title: title,
      //   description: description,
      //   content: content,
      //   author: null,
      //   dateCreated: new Date(),
      //   image :img,

      // };

      // const respons = await createPost(submitObject);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("dateCreated", new Date().toISOString());
      formData.append("image", img);

      const response = await createPost(formData);

      if (response && response.data) {
        alert("Blog Post Created Successfully");
        navigate("/home");
        resetForm();
        e.target.reset(); // Reset the form element
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Blog Post Creation Failed");
    }
  }
  function resetForm() {
    setTitle("");
    setDescription("");
    setContent("");
    setImg(null);
  }

  function handleImageChange(e) {
    setImg(e.target.files[0]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label> Blog Post Title:</label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        required
        name="title"
      />
      <label> Blog Description:</label>
      <input
        onChange={(e) => setDescription(e.target.value)}
        maxLength={200}
        required
        name="description"
      />
      <label> Blog Content:</label>
      <input
        onChange={(e) => setContent(e.target.value)}
        maxLength={5000}
        required
        name="content"
      />
      <div>
        <label htmlFor="img">Image:</label>
        <br />
        <input
          type="file"
          accept="image/*"
          id="img"
          onChange={handleImageChange} // Handle file input change
          required
        />
      </div>
      <button type="submit">Submit</button>
      
    </form>
  );
}
