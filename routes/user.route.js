var express = require("express");
var router = express.Router();
var multer = require("multer");
var validate = require("../validate/user.middleware");
var countRequest = require("../validate/countrequest.middleware");
var controller = require("../controllers/user.controller");
var upload = multer({ dest: "./public/uploads/" });
router.get("/", countRequest.countRequest, controller.index);
router.get("/create", controller.getCreate);
router.post(
  "/create",
  upload.single("avatar"),
  validate.postCreate,
  controller.create
);
router.get("/:id/delete", controller.delete);
router.get("/:id/update", controller.getUpdate);
router.post("/:id/update", controller.postUpdate);
module.exports = router;
