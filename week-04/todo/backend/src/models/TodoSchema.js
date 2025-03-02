const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'in-progress', 'not-started'],
        default: 'not-started',
        required: true
    }
}, {timestamps: true});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;