const config = require("../config/auth.config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");

const User = db.user;
const Role = db.role;

exports.getPref = (req, res) => {
  var id = req.query.id
  debugger;
  console.log(id)
  return User.findById(id).exec().then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
      });
    } else res.send(data);

  })
}

exports.update = (req, res) => {
  var id = req.body.id;
  // console.log(id)
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
}

// creates new user in database
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username, // requests username
    email: req.body.email, // requests email
    password: bcrypt.hashSync(req.body.password, 8) // requests hidden password
  });

  user.save((err, user) => {
    if (err) { // error message
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) { // finds roles
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            // success message once user is saved
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else { // if role is not specified, default user role
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          // success message once user is saved
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

// signin function for user
exports.signin = (req, res) => {
  User.findOne({ // searches for username in database
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) { // error message if username does not exist
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // denies accesstoken if password is invalid
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      // generates token using jsonwebtoken
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      // returns user information and access token
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    });
};

// deletes user account
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.query.id).then((data) => {
    if (!data) { // if data cannot be found for user
      res.status(404).send({
        message: `Cannot delete User with id=${req.query.id}. User was not found!`
      });
    } else {
      res.send({
        message: "User was deleted successfully!"
      });
    }
  })
}