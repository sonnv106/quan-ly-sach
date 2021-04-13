// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var shortid = require("shortid");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

db.defaults({ books: []}).write()
app.get("/", (req, res) => {
  res.render("index", {
    books: db.get("books").value()
  })
});
app.post("/books/create",(req, res)=>{
  req.body.id= shortid.generate();
  db.get("books").push(req.body).write();
  res.redirect("/")
})
app.get("/books/:id/delete",(req,res)=>{
  db.get("books").remove({id: req.params.id}).write();
  res.redirect("/")
})
app.get("/books/:id/update",(req,res)=>{
  res.render("update-book", {
    book: db.get("books").find({id: req.params.id}).value()
  })
})
app.post("/books/:id/update", (req, res)=>{
  var newTitle= req.body.title;
  db.get("books").find({id: req.params.id}).assign({title:newTitle}).write();
  res.redirect("/")
})
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
