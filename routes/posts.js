const express = require('express');
const Post = require('../modals/Post');
const User = require('../modals/User');
const router = express.Router();


// GET all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all posts 
router.get('/posts/search', async (req, res) => {
  const {searchParameter} = req.query
  try {
    const posts = await Post.find({title : searchParameter});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET a specific post
router.get('/getpost/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// POST a new post
router.post('/posts', async (req, res) => {
  const userId = req.body.userId
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const post = new Post({
    title: req.body.title,
    authorName:req.body.authorName,
    content: req.body.content,
    createdBy:user._id,
    createdByName:user.username,
    image:req.body.image
  });

  try {
    const newPost = await post.save();
    if(newPost){
      user.posts.push(newPost._id);
      await user.save();
      res.status(201).json(newPost);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// get a userPosts
router.get('/posts/userPost', async (req, res) => {
  console.log(req.query)
  try {
    const post = await User.findById(req.query.user_id).populate("posts")
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(201).json(post.posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;