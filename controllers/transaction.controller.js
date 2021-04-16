var shortid = require("shortid");
var db = require("../db.js");
module.exports.index = (req, res) => {
  res.render("transaction", {
    transactions: db.get("transactions").value(),
    books: db.get("books").value(),
    users: db.get("users").value()
  });
};
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  req.body.isComplete = false;
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/transactions");
};
module.exports.delete = (req, res) => {
  db.get("transactions")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/transactions");
};
module.exports.complete = (req, res) => {
  db.get("transactions")
    .find({ id: req.params.id })
    .assign({ isComplete: true })
    .write();
  res.redirect("/transactions");
};
