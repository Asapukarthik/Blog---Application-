const { Router } = require("express");
const User = require("../models/user");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");

const router = Router();
const upload = multer({ storage: storage });

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/user/signin");
});

router.get("/profile", async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");
  const user = await User.findById(req.user._id);
  res.render("profile", { user });
});

router.post("/profile/update", upload.single("profileImage"), async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");
  
  const updateData = { fullName: req.body.fullName };
  if (req.file) {
    updateData.profileImageURL = req.file.path;
  }

  await User.findByIdAndUpdate(req.user._id, updateData);
  res.redirect("/user/profile");
});

module.exports = router;
