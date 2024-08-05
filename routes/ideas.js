const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea.js');

// get all ideas
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({ success: true, result: ideas});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'query failed'});
    };
});

// get a single idea by id
router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({ success: true, result: idea});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'query failed'});
    };
});

// add an idea
router.post('/', async (req, res) => {
    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
    });

    try {
        const newIdea = await idea.save();
        res.json({ success: true, result: newIdea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'failed to post idea'});
    };
});

// update an idea
router.put('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        // validate the username
        if (idea.username === req.body.username) {
            const updateIdea = await Idea.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        text: req.body.text,
                        tag: req.body.tag,
                    }
                },
                { new: true }
            );
            return res.json({ success: true, result: updateIdea });
        };

        res.status(403).json({ success: false, error: 'Invalid User'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'failed to update idea'});
    };
});

// delete an idea
router.delete('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        // validate the username
        if (idea.username === req.body.username) {
            await Idea.findByIdAndDelete(req.params.id);
            return res.json({ success: true, data: {} });
        };

        res.status(403).json({ success: false, error: 'Invalid User'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'failed to delete idea'});
    };
});

module.exports = router;