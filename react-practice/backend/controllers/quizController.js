const Question = require('../models/Question')

const addQuestion = async (req, res) => {
    try {
        const {text, options, correctAnswer} = req.body;
        const newQuestion = new Question({text, options, correctAnswer});
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(500).json({ error: "Failed to save question"})
    }
}

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
        res.status(200).json(questions)
    } catch (err) {
        res.status(500).json({error: "Failed to get questions"})
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to delete question: "})
    }
}

module.exports = { addQuestion, getQuestions, deleteQuestion }
