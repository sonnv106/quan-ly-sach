var express = require("express");
var router = express.Router();
var controller = require("../controllers/transaction.controller");
var validate = require("../validate/transaction.middleware");
router.get("/", controller.index);
router.post("/create", controller.create);
router.get("/:id/delete", controller.delete);
router.get("/:id/complete", validate.checkId, controller.complete);
module.exports = router;
