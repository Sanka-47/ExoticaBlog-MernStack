import React, { useEffect, useState } from "react";
import { getPost } from "../src/api";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faComments, faEye } from "@fortawesome/free-solid-svg-icons";
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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex items-start justify-between gap-6 mb-4">
        
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl">{post.title}</h1>
        <h2 className="text-sm sm:text-base">{post.description}</h2>
      </div>
      <button 
        onClick={() => navigate(-1)}
        className="shrink-0 px-6 py-2 bg-[#0f1523] text-[#f6ddce] rounded-lg hover:bg-[#1a2439] transition-colors mt-4"
      >
        Back
      </button>
    </div>

    <div className="h-[1rem] mb-2 bg-[#f6ddce]"></div>
        {/* Image Section */}
        <div className="flex flex-col lg:flex-row justify-center gap-4">
          <div className="w-full lg:w-2/3">
            <img
              src={post.imgUrl}
              alt={post.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Info Bar */}
        <div className="mt-7 bg-[#0f1523] rounded-lg p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[#f6ddce]">
            <span className="text-lg">
              Date: {post.dateCreated?.slice(4, 15)}
            </span>
            <span className="text-lg">
              <FontAwesomeIcon icon={faEye} /> Views{" "}
              <span className="font-bold">{post.views || 120}</span>
            </span>
            <span className="text-lg">
              <FontAwesomeIcon icon={faComments} /> Comments{" "}
              <span className="font-bold">47</span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="my-10 outline-2 p-5 rounded-md ">
          <p className="  leading-relaxed text-2xl ">{post.content}</p>
        </div>
      </main>
    </div>
  );
}
