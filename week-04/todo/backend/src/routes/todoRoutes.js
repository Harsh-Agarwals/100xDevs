const express = require("express");
const Todo = require("../models/TodoSchema");
const User = require("../models/UserSchema");
const router = express.Router();
const todoMiddleware = require("../middlewares/todoMiddleware.js");

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(401).json({'success': false, 'message': 'Todo ID not found'});

        const findTodo = await Todo.findById(id);

        if (!findTodo) return res.status(401).json({'success': false, 'message': 'Todo not found'});

        return res.status(201).json({
            'success': true,
            'message': 'Todo fetched successfully',
            'todo': findTodo
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error in fetching todo: ${error}`
        });
    }
});

router.patch("/:id/update", todoMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        if (!id) return res.status(401).json({'success': false, 'message': 'Todo ID not found'});

        const findTodo = await Todo.findById(id);
        if (!findTodo) return res.status(401).json({'success': false, 'message': 'Todo not found'});

        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (status) updateFields.status = status;

        await Todo.updateOne({ _id: id }, {"$set": updateFields});

        return res.status(201).json({
            'success': true,
            'message': 'Todo updated successfully'
        });
        
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error in updating todo: ${error}`
        });
    }
});

router.delete("/:id/delete", todoMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.user;

        if (!id) return res.status(401).json({'success': false, 'message': 'Todo ID not found'});

        const findTodo = await Todo.findById(id);
        if (!findTodo) return res.status(401).json({'success': false, 'message': 'Todo not found'});

        await findTodo.deleteOne({ _id: id });
        await User.updateOne({ username }, { "$pull": { todos: id }});

        return res.status(201).json({
            'success': true,
            'message': 'Todo deleted successfully'
        });

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            'success': false,
            'message': `Error in deleting todo: ${error}`
        });        
    }
});

module.exports = router;