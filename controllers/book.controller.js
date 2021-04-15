var shortid = require("shortid");
var db = require("../db.js");
module.exports.index = (req, res) => {
  res.render("index", {
    books: db.get("books").value()
  });
};
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/");
};
module.exports.delete = (req, res) => {
  db.get("books")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/");
};
module.exports.getUpdate = (req, res) => {
  res.render("update-book", {
    book: db
      .get("books")
      .find({ id: req.params.id })
      .value()
  });
};
module.exports.postUpdate = (req, res) => {
  var newTitle = req.body.title;
  db.get("books")
    .find({ id: req.params.id })
    .assign({ title: newTitle })
    .write();
  res.redirect("/");
};
