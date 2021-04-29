var md5 = require("md5");
var db = require("../db.js");
module.exports.login = (req, res) => {
  res.render("login");
};
module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = db
    .get("users")
    .find({ email: email })
    .value();
  console.log(user);
  if (!user) {
    res.render("login", {
      errors: ["User does not exists"],
      values: req.body
    });
    return;
  }
  if (user.password !== md5(password)) {
    res.render("login", {
      errors: ["Wrong password"],
      values: req.body
    });
  }
  res.cookie("userId", user.id, { signed: true });
  res.locals.user = user;
  console.log(user);
  res.redirect("/users");
};
