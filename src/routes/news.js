const newsRouter = require("express").Router();
const { authenticateJWT } = require("../middleware/authJWT");
const User = require("../models/user");
newsRouter.get("/", authenticateJWT, async (req, res) => {
  if (req.user) {
    User.findOne({
      _id: req.user.id,
    }).then((user) => {
      const userPreferences = user.preferences.join(" OR ");
      const uri = "https://newsapi.org/v2/everything?";
      const urlQueryParams = new URLSearchParams({
        q: userPreferences,
        pageSize: 50,
        apiKey: process.env.API_KEY,
      });

      const url = uri + urlQueryParams;
      fetch(url)
        .then((response) => {
          if (!response.ok)
            return res.status(500).json({ message: "Unable to fetch news!" });
          return response.json();
        })
        .then((data) => {
          return res.status(200).send(data);
        })
        .catch((error) => {
          return res.status(500).json({ message: error });
        });
    });
  } else {
    return res.status(403).json({ message: req.message });
  }
});

module.exports = { newsRouter };
