const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedProblems: [
    {
      topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
      problemId: String,
      completedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Create compound index for efficient queries
ProgressSchema.index({ userId: 1, "completedProblems.problemId": 1 });

module.exports = mongoose.model("Progress", ProgressSchema);
