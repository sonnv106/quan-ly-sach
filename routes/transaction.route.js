var express = require("express");
var router = express.Router();
var controller = require("../controllers/transaction.controller")
router.get("/", controller.index );
router.post("/create", controller.create);
router.get("/:id/delete",controller.delete)
module.exports = router;
