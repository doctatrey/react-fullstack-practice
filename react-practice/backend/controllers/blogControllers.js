const Blog = require('../models/Blog')

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    } catch (err) {
        res.status(500).json({ error: "Failed to get blogs"})
    }
}

const getBlog = async (req, res) => {
    try {
        const { id } = req.paramds
    } catch (err) {

    }
}

const addBlog = async (req, res) => {
    try {
        const { title, content, author, createdAt } = req.body
        const newBlog = new Blog({title, content, author, createdAt})
        const savedBlog = await newBlog.save()
        res.status(201).json("Blog added!")
    } catch (errr) {
        res.status(500).json({ error: "Failed to add blog" })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params
        const deletedBlog = await Blog.findByIdAndDelete(id)
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        return res.status(200).json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete blog, " + err })
    }
}

const patchBlog = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body
        const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to patch blog: " + err.message })
    }
}

module.exports = { getBlogs, getBlog, addBlog, deleteBlog, patchBlog }
