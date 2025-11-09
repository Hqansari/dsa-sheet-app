const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  youtubeLink: String,
  leetcodeLink: String,
  articleLink: String,
  tags: [String],
});

const TopicSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
  order: Number,
  problems: [ProblemSchema],
});

module.exports = mongoose.model("Topic", TopicSchema);
