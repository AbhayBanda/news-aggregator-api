const express = require("express");
const { signup, login } = require("./controllers/authController");
const { userPreferenceRouter } = require("./routes/userPreferences");
const { newsRouter } = require("./routes/news");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log(`DB connection successful`);
  })
  .catch(() => {
    console.log(`Error while connecting to DB`);
  });
app.post("/register", signup);
app.post("/login", login);
app.use("/preferences", userPreferenceRouter);
app.use("/news", newsRouter);

app.listen(PORT, () => {
  console.log(`News Aggregator Listening on port ${PORT}`);
});
