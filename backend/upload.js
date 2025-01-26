const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: "./config.env" });

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});

const image = "./images/1.jpeg";


(async function run() {
  try {
    const result = await cloudinary.uploader.upload(image);
    console.log(result);
  } catch (error) {
    console.error("Error during upload:", error);
  }
})();
