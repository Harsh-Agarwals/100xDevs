const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyHeaders = require('../middlewares/verifyHeaders');
const User = require('../models/userSchema');
const Note = require('../models/noteSchema');

// fetch notes
router.get("/get-notes", verifyHeaders, async (req, res) => {
    try {
        const {username} = req.user;

        const user = await User.findOne({username});
        if (!user) return res.status(401).json({'success': false, 'message': 'User DNE!'});

        const notes = await Note.find({ userId: user._id });

        return res.status(201).json({
            'success': true,
            'message': 'Fetched all notes',
            'notes': notes
        });
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(404).json({
            'success': false,
            'message': `Error: ${e}`
        });
    }
});

// create note
router.post("/create", verifyHeaders, async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        const { username } = req.user;

        const note = await Note.findOne({title});
        if (note) return res.status(500).json({'success': false, 'message': 'Note already exists!'});

        const user = await User.findOne({ username });

        const newNote = new Note({
            title,
            description,
            tag,
            userId: user._id
        });

        await newNote.save();
        await User.updateOne({
            username
        }, {
            $push: {
                'notes': newNote._id
            }
        });

        return res.status(201).json({
            'success': true,
            'message': 'Successfully created note'
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(404).json({
            'success': false,
            'message': `Error: ${error}`
        });
    };
});

// update note
router.put("/update/:id", verifyHeaders, async (req, res) => {
    try {
        let id = req.params.id;
        const { title, description, tag } = req.body;
        const { username } = req.user;

        const note = await Note.findOne({ _id: id });
        if (!note) return res.status(400).json({'success': false, 'message': 'Bad note ID'});

        const user = await User.findOne({ username });
        const userId = user._id;

        if (note.userId.toString() !== userId.toString()) {
            return res.status(401).json({'success': false, 'message': 'User ID incorrect'});
        }

        let changed = {};
        if (title) changed['title'] = title;
        if (description) changed['description'] = description;
        if (tag) changed['tag'] = tag;

        await Note.updateOne({
            _id: id
        }, {
            $set: changed
        });

        return res.status(201).json({
            'success': true,
            'message': "Successful updated node"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(401).json({
            'success': false,
            'message': `Error: ${error}`
        })
    }
});

// delte note
router.delete("/delete/:id", verifyHeaders, async (req, res) => {
    try {
        let id = req.params.id;
        const { username } = req.user;

        const note = await Note.findOne({ _id: id });
        if (!note) return res.status(400).json({'success': false, 'message': 'Bad notes ID'});

        const user = await User.findOne({ username });
        const userId = user._id;
        if (!user) return res.status(400).json({'success': false, 'message': 'Bad access token'});

        if (userId.toString() !== note.userId.toString()) {
            return res.status(401).json({'success': false, 'message': 'User ID incorrect!'});
        };

        await Note.deleteOne({_id: id});
        await User.updateOne({username}, {
            $pull: {notes: id}
        })

        return res.status(201).json({
            'success': true,
            'message': 'Deleted the note'
        })

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(401).json({
            'success': false,
            'message': `Error: ${error}`
        })
    }
});

module.exports = router;