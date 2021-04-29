var express = require("express");
var router = express.Router();
var validate = require("../validate/user.middleware");
var countRequest =  require("../validate/countrequest.middleware")
var controller = require("../controllers/user.controller");
router.get("/",countRequest.countRequest, controller.index);
router.get("/create", controller.getCreate);
router.post("/create", validate.postCreate, controller.create);
router.get("/:id/delete", controller.delete);
router.get("/:id/update", controller.getUpdate);
router.post("/:id/update", controller.postUpdate);
module.exports = router;
