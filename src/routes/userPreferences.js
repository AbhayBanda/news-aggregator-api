const userPreferenceRouter = require("express").Router();
const { authenticateJWT } = require("../middleware/authJWT");
const User = require("../models/user");
userPreferenceRouter.get("/", authenticateJWT, async (req, res) => {
  if (req.user) {
    User.findOne({
      _id: req.user.id,
    })
      .then((user) => {
        return res.status(200).json({ preferences: user.preferences });
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  } else {
    return res.status(403).json({ message: req.message });
  }
});
userPreferenceRouter.put("/", authenticateJWT, (req, res) => {
  if (req.user && req.body.preference) {
    User.findOne({
      _id: req.user.id,
    })
      .then((user) => {
        user.preferences.push(req.body.preference);
        user
          .save()
          .then((data) => {
            console.log("User Saved successfully");
          })
          .catch((err) => {
            return console.log("Error in saving the user");
          });
        return res.status(200).json({ preferences: user.preferences });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: err });
      });
  } else {
    return res.status(403).json({ message: req.message });
  }
});

module.exports = { userPreferenceRouter };
