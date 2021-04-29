var shortid = require("shortid");
var db = require("../db.js");
module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  var countItems = db.get("books").value().length;
  res.render("index", {
    books: db
      .get("books")
      .drop(start)
      .take(perPage)
      .value(),
    currentPage: page,
    pages: Math.ceil(countItems / perPage)
  });
};
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
};
module.exports.delete = (req, res) => {
  db.get("books")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/books");
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
  res.redirect("/books");
};
