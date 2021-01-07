const express = require("express"); // for building rest apis
const bodyParser = require("body-parser"); // parse request
const cors = require("cors"); // provides express middleware
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});




// routes
require("./app/routes/auth.routes")(app); // authentication route
require("./app/routes/user.routes")(app); // authorization route


// set port, listen for requests
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//app.use(...);

const db = require("./app/models");
const Role = db.role;

// connects to mongodb port
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
    }
  });
}