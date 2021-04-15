var express = require("express");
var router = express.Router();
var controller= require('../controllers/user.controller')
router.get("/", controller.index);
router.post("/create", controller.create);
router.get("/:id/delete", controller.delete);
router.get("/:id/update", controller.getUpdate);
router.post("/:id/update", controller.postUpdate);
module.exports = router;
