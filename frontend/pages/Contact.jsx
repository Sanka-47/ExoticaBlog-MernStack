import React, { useState } from 'react';
import image from "../src/assets/images/EgVJ_.jpg";
import { TextField, Button } from "@mui/material";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Left half */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img
            src={image}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-110"
            alt="Contact Us"
          />
        </div>

        {/* Right half */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 py-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-3xl sm:text-3xl edu-au-vic-wa-nt-guides tracking-tight text-gray-900 mb-6">
              Get in Touch
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                InputLabelProps={{
                  required: false,
                  style: { color: "#1c2938" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#1c2938" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& input": { color: "#1c2938" },
                  },
                }}
              />

              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                InputLabelProps={{
                  required: false,
                  style: { color: "#1c2938" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#1c2938" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& input": { color: "#1c2938" },
                  },
                }}
              />

              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                InputLabelProps={{
                  required: false,
                  style: { color: "#1c2938" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#1c2938" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& textarea": { color: "#1c2938" },
                  },
                }}
              />

              <Button
                type="submit"
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
                Send Message
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