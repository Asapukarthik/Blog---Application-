const { Router } = require("express");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const router = Router();

const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage: storage });


router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate("createdBy");

  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
    currentUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/like/:id", async (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorized");
  const blog = await Blog.findById(req.params.id);
  const index = blog.likes.indexOf(req.user._id);

  if (index === -1) {
    blog.likes.push(req.user._id);
  } else {
    blog.likes.splice(index, 1);
  }

  await blog.save();
  return res.redirect(`/blog/${req.params.id}`);
});

// edit 
router.get('/edit/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('createdBy');

  if (!blog) return res.status(404).send('Blog not found');

  if (
    req.user._id.toString() !== blog.createdBy._id.toString() &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).send('Unauthorized');
  }

  res.render('edit-blog', { blog });
});


router.post('/edit/:id', upload.single('coverImage'), async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).send('Blog not found');

  if (
    req.user._id.toString() !== blog.createdBy.toString() &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).send('Unauthorized');
  }

  blog.title = req.body.title;
  blog.body = req.body.body;
  
  if (req.body.tags) {
    blog.tags = req.body.tags.split(",").map(tag => tag.trim());
  }

  if (req.file) {
    blog.coverImageURL = req.file.path;
  }

  await blog.save();
  res.redirect(`/blog/${blog._id}`);
});

// delete


router.post('/delete/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }


    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body, tags } = req.body;
  let imageUrl = "";
  if (req.file) {
    imageUrl = req.file.path;
  }

  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: imageUrl,
    tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
  });

  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
