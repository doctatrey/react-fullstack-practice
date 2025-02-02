const express = require('express')
const router = express.Router()
const { addBlog, getBlogs, deleteBlog, patchBlog } = require('../controllers/blogControllers')

router.get('/', getBlogs)
router.post('/', addBlog)
router.delete('/:id', deleteBlog)
router.patch('/:id', patchBlog)

module.exports = router