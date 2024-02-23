const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const authenticateJWT = (req, res, next) => {
  if (req.headers?.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.API_SECRET,
      (err, data) => {
        if (err) {
          req.user = null;
          req.message = "Header verification failed";
          next();
        } else {
          User.findOne({
            _id: data.id,
          })
            .then((user) => {
              req.user = user;
              req.message = "User found successfully";
              next();
            })
            .catch((err) => {
              req.user = null;
              req.message = "Error while quering the user";
              next();
            });
        }
      }
    );
  } else {
    req.user = null;
    req.message = "Authorization not found!";
    next();
  }
};

module.exports = { authenticateJWT };
