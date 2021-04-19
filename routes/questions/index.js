const express = require('express');
const router = express.Router();

const validate = require('../../validate/questions');

const controllers = require('../../controllers/questions');

router.get('/', controllers.getAllQuestions);
router.get('/:id', validate.getQuestionById, controllers.getQuestionById);
router.post('/', validate.addQuestion, controllers.addQuestion);
router.put('/:id', validate.editQuestion, controllers.editQuestion);
router.delete('/:id', validate.getQuestionById, controllers.removeQuestion);

module.exports = router;
