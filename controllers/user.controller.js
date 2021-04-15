var shortid = require("shortid");
var db = require("../db.js");
module.exports.index = (req, res) => {
  res.render("users", {
    users: db.get("users").value()
  });
};
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
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
