require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookiePaser = require("cookie-parser");

const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI)
  .then((e) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const searchQuery = req.query.search;
  let query = {};
  if (searchQuery) {
    query = { title: { $regex: searchQuery, $options: "i" } };
  }
  const allBlogs = await Blog.find(query);
  
  // Extract unique tags
  const trendingTags = [...new Set(allBlogs.flatMap(blog => blog.tags || []))].slice(0, 10);

  res.render("home", {
    user: req.user,
    blogs: allBlogs,
    searchQuery: searchQuery || "",
    trendingTags,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
