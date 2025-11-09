const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");
const auth = require("../middleware/auth");

// @route   GET api/topics
// @desc    Get all topics
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const topics = await Topic.find().sort({ order: 1 });
    res.json(topics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/topics/:id
// @desc    Get topic by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ msg: "Topic not found" });
    }
    res.json(topic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
