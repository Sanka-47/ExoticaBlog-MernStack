import React, { useEffect, useState } from "react";
import { BlogCard } from "../src/components/BlogCard";
import { getPosts, deletePost, updateUser, getUser } from "../src/api";
import * as jwt_decode from "jwt-decode";
import { TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from 'sweetalert2';

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

  async function LoadUser() {
    const response = await getUser(decodedUser._id);
    if (response) {
      setName(response.name);
    }
  }

  async function handleDeletePost(id) {
    try {
      if (!id) {
        throw new Error("Post ID is required");
      }
  
      // Ask for confirmation with SweetAlert2
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1c2938',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (!result.isConfirmed) {
        return;
      }
  
      const response = await deletePost(id);
  
      if (response && response.status === 200) {
        setPost((prevPosts) => prevPosts.filter((post) => post._id !== id));
        await Swal.fire({
          title: 'Deleted!',
          text: 'Post has been deleted successfully',
          icon: 'success',
          confirmButtonColor: '#1c2938',
          timer: 2000,
          timerProgressBar: true
        });
      } else {
        throw new Error("Delete operation failed");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      await Swal.fire({
        title: 'Error!',
        text: `Failed to delete post: ${error.message}`,
        icon: 'error',
        confirmButtonColor: '#1c2938'
      });
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
        setName(name);
        await Swal.fire({
          title: 'Success!',
          text: `Username updated successfully to: ${name}`,
          icon: 'success',
          confirmButtonColor: '#1c2938',
          timer: 2000,
          timerProgressBar: true
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to update username',
        icon: 'error',
        confirmButtonColor: '#1c2938'
      });
    }
  }
  return (
    <>
      <div className="flex flex-col min-h-screen mt-20 bg-[#ffffff]">
        <div className="flex flex-1">
          <div className="w-full flex flex-col justify-center px-4 sm:px-6 py-8">
            {/* User Info Section */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
              <h2 className="text-center text-3xl sm:text-3xl edu-au-vic-wa-nt-guides tracking-tight text-gray-900 mb-6">
                Profile Settings
              </h2>
              <form className="flex flex-col gap-7">
                <TextField
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user.name}
                  InputLabelProps={{
                    required: false,
                    style: { color: "#1c2938" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#1c2938" },
                      "&:hover fieldset": { borderColor: "#262626" },
                      "& input": {
                        color: "#1c2938",
                        "&::placeholder": {
                          color: "black",
                          fontWeight: "bold",
                          opacity: 1,
                        },
                      },
                    },
                  }}
                />

                <TextField
                  variant="outlined"
                  fullWidth
                  disabled
                  value={user.email}
                  InputLabelProps={{
                    required: false,
                    style: { color: "#1c2938" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#1c2938" },
                      "& input": { color: "#1c2938" },
                    },
                  }}
                />

                <TextField
                  label="Join Date"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={
                    user.joinDate
                      ? new Date(user.joinDate).toISOString().split("T")[0]
                      : "No date available"
                  }
                  InputLabelProps={{
                    required: false,
                    style: { color: "#1c2938" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#1c2938" },
                      "& input": { color: "#1c2938" },
                    },
                  }}
                />

                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: "16px",
                    bgcolor: "#1c2938",
                    color: "#ffffff",
                    "&:hover": {
                      bgcolor: "#262626",
                    },
                  }}
                >
                  Update Profile
                </Button>
              </form>
            </div>

            {/* User Posts Section */}
            <div className="w-full max-w-7xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Your Posts
              </h3>
              {post && post.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {post.map((post) => (
                    <div key={post._id} className="flex flex-col gap-2">
                      <BlogCard post={post} />
                      <Button
                        onClick={() => handleDeletePost(post._id)}
                        variant="contained"
                        fullWidth
                        startIcon={<DeleteIcon />}
                        sx={{
                          bgcolor: "#1c2938",
                          color: "#ffffff",
                          "&:hover": {
                            bgcolor: "#262626",
                          },
                        }}
                      >
                        Delete Post
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-900 text-center">No posts found</p>
              )}
            </div>
          </div>
        </div>

        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2024 Exotica. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
