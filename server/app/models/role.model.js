const mongoose = require("mongoose");

// role mongoose schema
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Role;