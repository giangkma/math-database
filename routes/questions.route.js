const express = require("express");
const router = express.Router();
const controllers = require("../controllers/questions.controller");
const validate = require("../validate/questions.validate");

router.get("/", controllers.getAll);
router.get("/:id", validate.findQuestionById, controllers.getById);
router.post("/", validate.addQuestion, controllers.addQuestion);
router.put("/:id", validate.editQuestion, controllers.editQuestion);
router.delete("/:id", validate.findQuestionById, controllers.deleteQuestion);

module.exports = router;
