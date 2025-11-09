const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");
const auth = require("../middleware/auth");

// @route   GET api/progress
// @desc    Get user progress
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.user.id });

    if (!progress) {
      progress = new Progress({
        userId: req.user.id,
        completedProblems: [],
      });
      await progress.save();
    }

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/progress/toggle
// @desc    Toggle problem completion
// @access  Private
router.post("/toggle", auth, async (req, res) => {
  try {
    const { topicId, problemId } = req.body;

    let progress = await Progress.findOne({ userId: req.user.id });

    if (!progress) {
      progress = new Progress({
        userId: req.user.id,
        completedProblems: [],
      });
    }

    // Check if problem is already completed
    const problemIndex = progress.completedProblems.findIndex(
      (p) => p.topicId.toString() === topicId && p.problemId === problemId
    );

    if (problemIndex > -1) {
      // Remove if already completed (unchecking)
      progress.completedProblems.splice(problemIndex, 1);
    } else {
      // Add if not completed (checking)
      progress.completedProblems.push({
        topicId,
        problemId,
        completedAt: new Date(),
      });
    }

    progress.lastUpdated = new Date();
    await progress.save();

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
