import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressContext } from "../context/ProgressContext";
import {
  ChevronRight,
  CheckCircle2,
  LayoutGrid,
  Link as LinkIcon,
  GitBranch,
  Binary,
  Layers,
  Boxes,
} from "lucide-react";
import "./TopicCard.css";

const iconMap = {
  "layout-grid": LayoutGrid,
  link: LinkIcon,
  "git-branch": GitBranch,
  binary: Binary,
  layers: Layers,
  boxes: Boxes,
};

const TopicCard = ({ topic }) => {
  const navigate = useNavigate();
  const { getTopicProgress } = useContext(ProgressContext);

  const Icon = iconMap[topic.icon] || LayoutGrid;
  const progress = getTopicProgress(topic._id, topic.problems.length);
  const isCompleted = progress === 100;

  return (
    <div onClick={() => navigate(`/topic/${topic._id}`)} className="topic-card">
      {/* Background Gradient */}
      <div className="topic-card-bg"></div>

      <div className="topic-card-content">
        {/* Header */}
        <div className="topic-card-header">
          <div className="topic-card-icon">
            <Icon className="w-7 h-7 text-white" />
          </div>

          {isCompleted && (
            <div className="topic-card-badge">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="topic-card-badge-text">Completed</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="topic-card-title">{topic.title}</h3>
        <p className="topic-card-description">{topic.description}</p>

        {/* Stats */}
        <div className="topic-card-stats">
          <div className="topic-card-problems">
            <span className="topic-card-problems-count">
              {topic.problems.length}
            </span>{" "}
            Problems
          </div>
          <div className="topic-card-progress-text">{progress}% Complete</div>
        </div>

        {/* Progress Bar */}
        <div className="topic-card-progress-container">
          <div
            className="topic-card-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Action Button */}
        <button className="topic-card-action">
          <span className="topic-card-action-text">Start Learning</span>
          <ChevronRight className="w-5 h-5 topic-card-action-icon" />
        </button>
      </div>
    </div>
  );
};

export default TopicCard;
