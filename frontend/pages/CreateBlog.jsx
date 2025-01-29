import React, { useEffect, useState } from "react";
import { createPost } from "../src/api";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import image from "../src/assets/images/P4Sx_.jpg";
import { TextField, Button } from "@mui/material";
import Swal from 'sweetalert2';

export function CreateBlog() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const [imgName, setImgName] = useState("");
  const navigate = useNavigate();

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

    // Cleanup preview URL on unmount
    return () => {
      if (imgPreview) {
        URL.revokeObjectURL(imgPreview);
      }
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("dateCreated", new Date().toISOString());
      formData.append("image", img);

      const response = await createPost(formData);

      if (response && response.data) {
        await Swal.fire({
          title: 'Success!',
          text: 'Blog Post Created Successfully',
          icon: 'success',
          confirmButtonColor: '#1c2938',
          timer: 2000,
          timerProgressBar: true
        });
        navigate("/home");
        resetForm();
        e.target.reset();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      await Swal.fire({
        title: 'Error!',
        text: 'Blog Post Creation Failed',
        icon: 'error',
        confirmButtonColor: '#1c2938'
      });
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setContent("");
    setImg(null);
    setImgPreview(null);
    setImgName("");
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      setImgName(file.name);
      const previewUrl = URL.createObjectURL(file);
      setImgPreview(previewUrl);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Left half */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img
            src={image}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-110"
            alt="Create Blog"
          />
        </div>

        {/* Right half */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 py-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-3xl sm:text-3xl edu-au-vic-wa-nt-guides tracking-tight text-gray-900">
              Create New Blog Post
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
              <TextField
                label="Blog Post Title"
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{ required: false }}
                inputProps={{ maxLength: 100 }}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                label="Blog Description"
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{ required: false }}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                label="Blog Content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                InputLabelProps={{ required: false }}
                inputProps={{ maxLength: 5000 }}
                onChange={(e) => setContent(e.target.value)}
              />

              <input
                type="file"
                accept="image/*"
                id="img"
                onChange={handleImageChange}
                required
                className="hidden"
              />
              <Button
                component="label"
                htmlFor="img"
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: "#1c2938",
                  color: "#1c2938",
                  "&:hover": {
                    borderColor: "#262626",
                    bgcolor: "transparent",
                  },
                }}
              >
                Upload Image
              </Button>

              {imgPreview && (
                <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                      <img
                        src={imgPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 truncate">{imgName}</p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: "16px",
                  bgcolor: "#1c2938",
                  "&:hover": {
                    bgcolor: "#262626",
                  },
                }}
              >
                Create Post
              </Button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Exotica. All rights reserved.</p>
      </footer>
    </div>
  );
}