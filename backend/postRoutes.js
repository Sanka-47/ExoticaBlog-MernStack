const express = require("express");
const cloudinary = require("cloudinary").v2;
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require(`jsonwebtoken`);
require("dotenv").config({ path: "./config.env" });
const multer = require('multer');

let postRoutes = express.Router();

const upload = multer({ dest: 'uploads/' }); 
//#1 - Retrieve All
postRoutes.route("/posts").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found :(");
  }
});

//#2 - Retrieve One
postRoutes.route("/posts/:id").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found :(");
  }
});



//#3 - Create one


postRoutes.route("/posts").post(verifyToken, upload.single('image'), async (request, response) => {
  try {
   

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
      api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
    });

    const image = request.file.path;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image,{
      folder: "images"
    });

    // Get the database
    let db = database.getDb();
  
    
   
   

    // Create the mongoObject with the image URL
    let mongoObject = {
      title: request.body.title || "Default Title", // Provide a default value
      description: request.body.description || "Default Description", // Provide a default value
      content: request.body.content || "Default Content", // Provide a default value
      author: request.body.author|| null, // Check if user exists
      dateCreated: request.body.dateCreated || new Date(), // Provide a default value
      imgUrl: result.secure_url // Use the URL from Cloudinary
    };

    // Insert the mongoObject into the posts collection
    const data = await db.collection("posts").insertOne(mongoObject);

 //if both the image and the post was uploaded successfully send a response of 200
    if (data) {
      response.status(200).json({ message: "Post created successfully" });
    } else {
      response.status(500).json({ error: "Error during upload" });
    }
   


  } catch (error) {
    console.error("Error during upload:", error);
    response.status(500).json({ error: "Error during upload" });
  }
});

// //#3 - Create one
// postRoutes.route("/posts").post(verifyToken, async (request, response) => {
//   let db = database.getDb();
//   let mongoObject = {
//     title: request.body.title,
//     description: request.body.description,
//     content: request.body.content,
//     author: request.body.user._id,
//     dateCreated: request.body.dateCreated,
//   };
//   let data = await db.collection("posts").insertOne(mongoObject);
//   response.json(data);
// });


//#4 - Update one
postRoutes.route("/posts/:id").put(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      title: request.body.title,
      description: request.body.description,
      content: request.body.content,
      author: request.body.author,
      dateCreated: request.body.dateCreated,
    },
  };
  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

//#5 - Delete one
postRoutes
  .route("/posts/:id")
  .delete(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(request.params.id) });
    response.json(data);
  });

function verifyToken(request, response, next) {
  const authHeaders = request.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (!token) {
    return response.status(401).json({ message: "Authentication to " });
  }

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Invalid Token" });
    }

    request.body.user = user;
    next();
  });
}

module.exports = postRoutes;
