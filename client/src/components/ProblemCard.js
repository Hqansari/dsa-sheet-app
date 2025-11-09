import React, { useContext, useState } from "react";
import { ProgressContext } from "../context/ProgressContext";
import { ExternalLink, Video, FileText, Check } from "lucide-react";
import "./ProblemCard.css";

const ProblemCard = ({ problem, topicId, index }) => {
  const { toggleProblem, isProblemCompleted } = useContext(ProgressContext);
  const [isChecking, setIsChecking] = useState(false);

  const isCompleted = isProblemCompleted(topicId, problem._id);

  const handleToggle = async () => {
    setIsChecking(true);
    await toggleProblem(topicId, problem._id);
    setIsChecking(false);
  };

  return (
    <div className={`problem-card ${isCompleted ? "completed" : ""}`}>
      <div className="problem-card-content">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          disabled={isChecking}
          className={`problem-checkbox ${isCompleted ? "completed" : ""}`}
        >
          {isCompleted && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Content */}
        <div className="problem-details">
          {/* Header */}
          <div className="problem-header">
            <h4 className={`problem-title ${isCompleted ? "completed" : ""}`}>
              {index + 1}. {problem.title}
            </h4>
            <span
              className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}
            >
              {problem.difficulty}
            </span>
          </div>

          {/* Description */}
          <p className="problem-description">{problem.description}</p>

          {/* Tags */}
          {problem.tags && problem.tags.length > 0 && (
            <div className="problem-tags">
              {problem.tags.map((tag, idx) => (
                <span key={idx} className="problem-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="problem-links">
            {/* YouTube Link */}
            <a
              href={
                problem.youtubeLink ||
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="problem-link youtube"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Tutorial</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* LeetCode Link */}
            <a
              href={problem.leetcodeLink || "https://leetcode.com/problemset/"}
              target="_blank"
              rel="noopener noreferrer"
              className="problem-link leetcode"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LeetCode</span>
            </a>

            {/* Article Link */}
            <a
              href={problem.articleLink || "https://www.geeksforgeeks.org/"}
              target="_blank"
              rel="noopener noreferrer"
              className="problem-link article"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Article</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
