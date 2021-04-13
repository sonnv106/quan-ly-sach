var express = require("express");
var router = express.Router();
var shortid = require("shortid");
var db = require("../db.js");
router.get("/", (req, res) => {
  res.render("index", {
    books: db.get("books").value()
  });
});
router.post("/books/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/");
});
router.get("/books/:id/delete", (req, res) => {
  db.get("books")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/");
});
router.get("/books/:id/update", (req, res) => {
  res.render("update-book", {
    book: db
      .get("books")
      .find({ id: req.params.id })
      .value()
  });
});
router.post("/books/:id/update", (req, res) => {
  var newTitle = req.body.title;
  db.get("books")
    .find({ id: req.params.id })
    .assign({ title: newTitle })
    .write();
  res.redirect("/");
});
module.exports = router;