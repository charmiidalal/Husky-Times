const mongoose = require('mongoose');
// Create global promise and main roles
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin"];

module.exports = db;