const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config({ path: "./.env" });

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const SALT_ROUNDS = 6;

// Cloudinary Configuration (Move to a separate config file if needed)
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

// Middleware for token verification
function verifyToken(req, res, next) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.body.user = user;
    next();
  });
}

// =========== USER ROUTES ===========

// Get all users
router.get("/users", async (req, res) => {
  try {
    const db = database.getDb();
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// Get user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const db = database.getDb();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

// Create user
router.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = database.getDb();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This Email Is Already Registered" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      joinDate: new Date(),
      posts: [],
    };

    await db.collection("users").insertOne(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "User creation failed" });
  }
});

// Update user
router.put("/users/:id", async (req, res) => {
  try {
    const db = database.getDb();
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: { name } });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    const db = database.getDb();
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// User login
// router.post("/users/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const db = database.getDb();

//     const user = await db.collection("users").findOne({ email });

//     if (!user) {
//       return res.status(401).json({ success: false, message: "User not found" });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ success: false, message: "Incorrect Password" });
//     }

//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRETKEY, { expiresIn: "1h" });

//     res.json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });

router.route("/users/login").post(async (request, response) => {
  let db = database.getDb();
  const user = await db
    .collection("users")
    .findOne({ email: request.body.email });

  if (user) {
    // console.log('Request Password:', request.body.password);
    //  console.log('User Password:', user.password);

    let confirmation = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (confirmation) {
      const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: "1h" });

      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: "Incorrect Password" });
    }
  } else {
    response.json({ success: false, message: "User not found" });
  }
});

// =========== POST ROUTES ===========

// Get all posts
router.get("/posts", verifyToken, async (req, res) => {
  try {
    const db = database.getDb();
    const posts = await db.collection("posts").find({}).toArray();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

// Get post by ID
router.get("/posts/:id", verifyToken, async (req, res) => {
  try {
    const db = database.getDb();
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve post" });
  }
});

// Create post
router.post("/posts", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "images",
    });
    const db = database.getDb();
    const newPost = {
      title: req.body.title || "Default Title",
      description: req.body.description || "Default Description",
      content: req.body.content || "Default Content",
      author: req.body.author || null,
      dateCreated: new Date(),
      imgUrl: result.secure_url,
    };

    await db.collection("posts").insertOne(newPost);
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error during upload" });
  }
});

// Update post
router.put("/posts/:id", verifyToken, async (req, res) => {
  const db = database.getDb();
  const result = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.json(result);
});

// Delete post
router.delete("/posts/:id", verifyToken, async (req, res) => {
  const db = database.getDb();
  const result = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

module.exports = router;
