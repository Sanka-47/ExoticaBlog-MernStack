import React from "react";
import { createUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import image from "../assets/images/3XzDq.jpg";
import Swal from 'sweetalert2';


export function CreateUser({ setView }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await createUser(user);
      if (response.data.message  === "User created successfully") {
        await Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonColor: '#1c2938',
          timer: 2000,
          timerProgressBar: true
        });
        setView(false);
      }else if(response.data.message  === "This Email Is Already Registered"){ 
        await Swal.fire({
          title: 'Error!',
          text: response.data.message || "Failed to create account",
          icon: 'error',
          confirmButtonColor: '#1c2938'
        });
      } else {
        await Swal.fire({
          title: 'Error!',
          text: response.data.message || "Failed to create account",
          icon: 'error',
          confirmButtonColor: '#1c2938'
        });
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || "An error occurred while creating account",
        icon: 'error',
        confirmButtonColor: '#1c2938'
      });
    }
  }

  return (
    // ...existing imports and state...

    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Left half */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img
            src={image}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-110"
            alt="Description of the image"
          />
        </div>

        {/* Right half */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 py-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-3xl sm:text-3xl edu-au-vic-wa-nt-guides tracking-tight text-gray-900">
              Create Your Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{ required: false }}
                inputProps={{ maxLength: 20 }}
                onChange={handleChange}
                placeholder="Jhon"
              />

              <TextField
                id="email"
                name="email"
                label="Email address"
                type="email"
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{ required: false }}
                inputProps={{ maxLength: 40 }}
                onChange={handleChange}
                placeholder="example@email.com"
              />

              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{ required: false }}
                inputProps={{ maxLength: 20 }}
                onChange={handleChange}
                placeholder="Enter password"
              />
              <Button
             
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  borderRadius:"16px",
                  bgcolor: "#1c2938",
                  "&:hover": {
                    bgcolor: "#262626",
                  },
                }}
              >
                Create Account
              </Button>
              <Button 
                onClick={() => setView(false)}
                variant="text"
                fullWidth
                sx={{
                  borderRadius:"26px",
                  color: "#4F46E5",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "#4338CA",
                  },
                }}
              >
                Login to existing account
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
