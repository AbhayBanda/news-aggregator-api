const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signup = (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });

  user
    .save()
    .then((data) => {
      return res.status(200).json({ message: "User created successfully" });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

const login = (req, res) => {
  const emailPassed = req.body.email;
  const passedPassword = req.body.password;

  User.findOne({
    email: emailPassed,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    let isPasswordValid = bcrypt.compareSync(passedPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    } else {
      const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION_TIME,
      });
      return res.status(200).json({
        message: "Login Successfull",
        accessToken: token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      });
    }
  });
};

module.exports = { signup, login };
