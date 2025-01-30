const connect = require("./connect");
const express = require("express");
const cors = require("cors");
// const posts = require("./index");
// const users = require("./index")
const postsRouter = require("./index");



const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
// app.use(posts);
// app.use(users);
app.use(postsRouter);

app.listen(PORT, () => {
  connect.connectToServer();
  console.log(`server is runnign on the port ${PORT}`);
});
