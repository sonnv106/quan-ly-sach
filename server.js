
require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var db = require("./db.js");
var bookRouter = require("./routes/book.route");
var userRouter = require("./routes/user.route");
var transactionRouter = require("./routes/transaction.route");
var authRouter = require("./routes/auth.route");
var cookieParser = require("cookie-parser");

var authMiddleware = require("./middlewares/auth.middleware")
app.use(cookieParser(process.env.SESSION_SECRET));
app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/books", bookRouter);
app.use("/users",authMiddleware.requireAuth, userRouter);
app.use("/transactions", transactionRouter);
app.use("/", authRouter);
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
