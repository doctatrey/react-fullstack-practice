const express = require('express');
const router = express.Router();
const { addQuestion, deleteQuestion, getQuestions, patchQuestion } = require('../controllers/quizController')

router.get('/', getQuestions)
router.post('/', addQuestion)
router.delete('/:id', deleteQuestion)

module.exports = router
