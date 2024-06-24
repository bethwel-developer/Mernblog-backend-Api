
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const register = require ("./routes/auth")
const login = require ("./routes/auth")


const categoryRoute = require("./routes/categories");
const cors = require ("cors");
const multer = require("multer");
const path = require("path");
const port = 5000

app.use(express.json())
app.use(cors())
require("dotenv").config();
app.use("/images", express.static(path.join(__dirname, "/images")));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(() => {
    console.log(`connected to mongodb`)
  }).catch((err) => {
    console.log(err.message)
  });
  


const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", register);
app.use("/api/auth", login);


app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.use("/api/categories", categoryRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
