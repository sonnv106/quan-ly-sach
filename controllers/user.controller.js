var shortid = require("shortid");
var md5= require("md5")
var db = require("../db.js");
module.exports.index = (req, res) => {
  res.render("users", {
    users: db.get("users").value()
  });
};
module.exports.getCreate = (req, res) => {
  res.render("create-user");
};
module.exports.create = (req, res) => {
  var user = {
    id: shortid.generate(),
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone,
    password: md5(req.body.password)
  }
  db.get("users")
    .push(user)
    .write();
  res.redirect("/users");
};
module.exports.delete = (req, res) => {
  db.get("users")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/users");
};
module.exports.getUpdate = (req, res) => {
  res.render("update-user", {
    user: db
      .get("users")
      .find({ id: req.params.id })
      .value()
  });
};
module.exports.postUpdate = (req, res) => {
  db.get("users")
    .find({ id: req.params.id })
    .assign({ name: req.body.name })
    .write();
  res.redirect("/users");
};
