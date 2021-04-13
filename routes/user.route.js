var express = require("express");
var router = express.Router();
var shortid = require("shortid");
var db = require("../db.js");
router.get("/", (req, res) => {
  res.render("users", {
    users: db.get("users").value()
  });
});
router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  console.log(req.body);
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});
router.get("/:id/delete", (req, res) => {
  db.get("users")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/users");
});
router.get("/:id/update", (req, res) => {
  res.render("update-user", {
    user: db
      .get("users")
      .find({ id: req.params.id })
      .value()
  });
  // db.get("users")
  //   .find({ id: req.params.id })
  //   .assign({ name: req.body.name })
  //   .write();
});
router.post("/:id/update", (req, res) => {
  db.get("users")
    .find({ id: req.params.id })
    .assign({ name: req.body.name })
    .write();
  res.redirect("/users")
});
module.exports = router;
