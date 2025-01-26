import React from "react";
import { verifyUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
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
        navigate("/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder={"Email"}
        onChange={handleChange}
        name="email"
        required
        maxLength={40}
      />
      <input
        placeholder={"Password"}
        onChange={handleChange}
        name="password"
        required
        maxLength={20}
        type="password"
      />
      <button type="submit">LogIn</button>
    </form>
  );
}
