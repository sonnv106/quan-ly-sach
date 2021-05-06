const bcrypt = require("bcrypt");
const saltRounds = 10;
var db = require("../db.js");
module.exports.login = (req, res) => {
  res.render("login");
};
module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var user = db
    .get("users")
    .find({ email: email })
    .value();
  if (!user) {
    res.render("login", {
      errors: ["User does not exists"],
      values: req.body
    });
    return;
  }
  bcrypt.compare(req.body.password, user.password, function(err, result) {
    // result == true
    if (result == false) {
      res.render("login", {
        errors: ["Wrong password"],
        values: req.body
      });
    }
    res.cookie("userId", user.id, { signed: true });
    res.locals.user = user;
    res.redirect("/users");
  });
};
