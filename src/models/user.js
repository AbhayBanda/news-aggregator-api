const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Fullname not provided"],
  },
  email: {
    type: String,
    required: [true, "Email not provided"],
    lowercase: true,
    trim: true,
    unique: [true, "Email already exists in the DB"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Not a valid email",
    },
    // match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  role: {
    type: String,
    required: [true, "Role not provided"],
    enum: ["user", "admin"],
  },
  preferences: {
    type: [String],
    default: ["World"],
  },
  password: {
    type: String,
    required: [true, "Password not provided"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
