var shortid = require("shortid");
var cloudinary = require("../cloudinary");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var md5 = require("md5");
var db = require("../db.js");
module.exports.index = (req, res) => {
  res.render("users", {
    users: db.get("users").value()
  });
};
module.exports.getCreate = (req, res) => {
  res.render("create-user");
};
module.exports.create = async (req, res) => {
  await cloudinary.uploader.upload(req.file.path, function(error, result) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      var user = {
        id: shortid.generate(),
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        password: hash,
        avatar: result.secure_url
      };
      db.get("users")
        .push(user)
        .write();
      res.redirect("/users");
    });
  });
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
  console.log(req.file);
  var data = {
    name: req.body.name
  };
  db.get("users")
    .find({ id: req.params.id })
    .assign(data)
    .write();
  res.redirect("/users");
};
