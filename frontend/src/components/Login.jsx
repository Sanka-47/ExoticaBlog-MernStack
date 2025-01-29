import React from "react";
import { verifyUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { TextField, Button } from "@mui/material";
import image from "../assets/images/3XzDq.jpg";

import Swal from 'sweetalert2';

export function Login({ setView }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   let response = await verifyUser(user);
  //   if (response) {
  //     sessionStorage.setItem("User",response)
  //     axios.defaults.headers.common["Authorization"]= `Bearer ${response}`
  //     navigate("/home");

  //   } else {
  //     alert("Login failed");
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await verifyUser(user);
      if (response) {
        sessionStorage.setItem("User", response);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
        await Swal.fire({
          title: 'Success!',
          text: 'Login successful',
          icon: 'success',
          confirmButtonColor: '#1c2938',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        navigate("/home");
      } else {
        await Swal.fire({
          title: 'Error!',
          text: 'Invalid username or password',
          icon: 'error',
          confirmButtonColor: '#1c2938'
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      await Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Login failed. Please try again.',
        icon: 'error',
        confirmButtonColor: '#1c2938'
      });
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
          alt="Description of the image"
        />
      </div>

      {/* Right half */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 py-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-3xl sm:text-3xl mb-10 edu-au-vic-wa-nt-guides tracking-tight text-gray-900">
            Welcome To Exotica Blog
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
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
                borderRadius: "16px",
                bgcolor: "#1c2938",
                "&:hover": {
                  bgcolor: "#262626",
                },
              }}
            >
              Login
            </Button>

            <Button 
              onClick={() => setView(true)}
              variant="text"
              fullWidth
              sx={{
                borderRadius: "26px",
                color: "#4F46E5",
                "&:hover": {
                  bgcolor: "transparent",
                  color: "#4338CA",
                },
              }}
            >
              Create new account
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
