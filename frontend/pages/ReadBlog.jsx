import React, { useEffect, useState } from "react";
import { getPost } from "../src/api";
import { useNavigate, useParams } from "react-router-dom";
export function ReadBlog() {
  const [post, setPost] = useState({});
  let params = useParams();
  const navigate = useNavigate();
  let id = params.id;

  useEffect(() => {
    async function loadPost() {
      let data = await getPost(id);
      let date = new Date(data.dateCreated);
      data.dateCreated = date.toString();

      setPost(data);
    }
    loadPost();
  }, []);
  return (
    <>
      <div>
        <img src={post.imgUrl} alt="image not found" />
      </div>

     

      <h1>{post.title}</h1>
      <h1>{post.description}</h1>
      <h1>{post.dateCreated?.slice(4, 15)}</h1>
      <p>{post.content}</p>

      <button onClick={() => navigate(-1)}> back</button>
    </>
  );
}
