const mongoose = require('mongoose');

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    pic: {
      type: String,
      required: false,
      default: "https://scontent.fhan3-1.fna.fbcdn.net/v/t39.30808-6/307279336_1469130016889697_3911469642482465601_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4e9QJZd1fv8AX8FX4qi&_nc_ht=scontent.fhan3-1.fna&oh=00_AfBJYNB3UNEq1VZVDkrZo-zxhFHVZlEgah8nE5ZqO-lNWQ&oe=63DBE418"
    }
  }
);
const User = mongoose.model("User", userModel);
module.exports = User;