const express = require("express");
const router = express.Router();
const User = require("../modals/User");

router.get("/login", async (req, res) => {

  const { username, password } = req.query;

  try {
    const user = await User.findOne({ username });
    if (user) {
      if (user.password === password) res.status(200).json(user);
      else res.status(401).send("Wrong password");
    } else {
      res.status(501).send("Invalid username");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post("/register", async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
      });

      try {
        const newUser = await user.save();
        res.status(201).json(newUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  });

  
  

  module.exports = router