const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require ("dotenv").config({path: "./config.env" })

let useRoutes = express.Router();
const SALT_ROUNDS = 6;

//#1 - Retrieve All
useRoutes.route("/users").get(async (request, response) => {
  let db = database.getDb();

  let data = await db.collection("users").find({}).toArray();
  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found :(");
  }
});

//#2 - Retrieve One
useRoutes.route("/users/:id").get(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found :(");
  }
});

//#3 - Create one
useRoutes.route("/users").post(async (request, response) => {
  let db = database.getDb();
  const takenEmail = await db
    .collection("users")
    .findOne({ email: request.body.email });

  if (takenEmail) {
    response.json({ message: "The email is taken " });
  } else {
    const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);
    let mongoObject = {
      name: request.body.name,
      email: request.body.email,
      // password: request.body.password,
      password: hash,
      joinDate: new Date(),
      posts: [],
    };
    let data = await db.collection("users").insertOne(mongoObject);
    response.json(data);
  }
});

//#4 - Update one
useRoutes.route("/users/:id").put(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      name: request.body.name,
      
    },
  };
  let data = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

//#5 - Delete one
useRoutes.route("/users/:id").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

//#6 - Login
useRoutes.route("/users/login").post(async (request, response) => {
  let db = database.getDb();
  const user = await db
    .collection("users")
    .findOne({ email: request.body.email });


  if (user) {

    // console.log('Request Password:', request.body.password);
    //  console.log('User Password:', user.password);

    let confirmation = await bcrypt.compare(request.body.password, user.password);
    if (confirmation) {
      const token = jwt.sign(user, process.env.SECRETKEY,{expiresIn:"1h"})
      
      response.json({ success: true,token });
    } else {
      
      response.json({ success: false, message: "Incorrect Password" });
    }
  } else {
    
    response.json({ success: false, message: "User not found" });
    
  }
});

module.exports = useRoutes;