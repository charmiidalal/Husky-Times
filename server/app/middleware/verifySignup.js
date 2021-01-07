const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

// Checks if username or email is already taken

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err }); // error message
      return;
    }

    if (user) {
      res.status(400).send({ message: "Username is already taken." });
      return;
    }

    // check email entered
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) { // if user with this email already exists send error
        res.status(400).send({ message: "Email is already taken." });
        return;
      }

      next();
    });
  });
};

// checks roles of account
var checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignup = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignup;