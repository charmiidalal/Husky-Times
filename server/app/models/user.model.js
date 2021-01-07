const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({ // creates new mongoose schema with properties for user items
    username: String,
    email: String,
    password: String,
    countries: {
      type: Array,
      default: ["United States of America", "United Kingdom", "Canada", "China", "Russia", "France",
        "Philippines", "United Arab Emirates", "Australia", "Argentina", "South Korea", "Indonesia"]
    },
    categories: {
      type: Array,
      default: ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"]
    },
    bookmarks: {
      type: Array,
      default: []
    }
  })
);

module.exports = User;