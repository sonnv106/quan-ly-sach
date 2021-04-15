var express = require("express");
var router = express.Router();
var controller= require("../controllers/book.controller")
router.get("/", controller.index);
router.post("/books/create", controller.create);
router.get("/books/:id/delete", controller.delete);
router.get("/books/:id/update", controller.getUpdate);
router.post("/books/:id/update", controller.postUpdate);
module.exports = router;
