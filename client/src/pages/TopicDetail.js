import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProgressContext } from "../context/ProgressContext";
import Navbar from "../components/Navbar";
import ProblemCard from "../components/ProblemCard";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  ArrowLeft,
  CheckCircle2,
  Filter,
  LayoutGrid,
  Link as LinkIcon,
  GitBranch,
  Binary,
  Layers,
  Box,
} from "lucide-react";
import "./TopicDetail.css";

const API_URL = "http://localhost:5000/api";

const iconMap = {
  "layout-grid": LayoutGrid,
  link: LinkIcon,
  "git-branch": GitBranch,
  binary: Binary,
  layers: Layers,
  box: Box,
};

const TopicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTopicProgress } = useContext(ProgressContext);

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  useEffect(() => {
    loadTopic();
  }, [id]);

  const loadTopic = async () => {
    try {
      const res = await axios.get(`${API_URL}/topics/${id}`);
      setTopic(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading topic:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading topic..." />;
  }

  if (!topic) {
    return (
      <div className="topic-detail-page">
        <div className="topic-detail-container">
          <div className="topic-detail-empty">
            <p className="topic-detail-empty-text">Topic not found</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="topic-detail-empty-btn"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const Icon = iconMap[topic.icon] || LayoutGrid;
  const progress = getTopicProgress(topic._id, topic.problems.length);

  const filteredProblems =
    difficultyFilter === "All"
      ? topic.problems
      : topic.problems.filter((p) => p.difficulty === difficultyFilter);

  return (
    <div className="topic-detail-page">
      <Navbar />

      <div className="topic-detail-container">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="topic-detail-back"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        {/* Topic Header */}
        <div className="topic-detail-header">
          <div className="topic-detail-header-content">
            <div className="topic-detail-header-main">
              <div className="topic-detail-icon">
                <Icon className="w-9 h-9 text-white" />
              </div>
              <div className="topic-detail-info">
                <h1 className="topic-detail-title">{topic.title}</h1>
                <p className="topic-detail-description">{topic.description}</p>
                <div className="topic-detail-meta">
                  <span className="topic-detail-meta-item">
                    <span className="topic-detail-meta-count">
                      {topic.problems.length}
                    </span>{" "}
                    Problems
                  </span>
                  <span className="topic-detail-meta-separator">•</span>
                  <span className="topic-detail-meta-progress">
                    {progress}% Complete
                  </span>
                </div>
              </div>
            </div>

            {progress === 100 && (
              <div className="topic-detail-badge">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="topic-detail-badge-text">Completed!</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="topic-detail-progress">
            <div className="topic-detail-progress-header">
              <span className="topic-detail-progress-label">Progress</span>
              <span className="topic-detail-progress-value">{progress}%</span>
            </div>
            <div className="topic-detail-progress-bar">
              <div
                className="topic-detail-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="topic-detail-filter">
          <Filter className="w-5 h-5" />
          <span className="topic-detail-filter-label">
            Filter by difficulty:
          </span>
          <div className="topic-detail-filter-buttons">
            {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setDifficultyFilter(difficulty)}
                className={`topic-detail-filter-btn ${
                  difficultyFilter === difficulty ? "active" : ""
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Problems List */}
        <div className="topic-detail-problems">
          {filteredProblems.length === 0 ? (
            <div className="topic-detail-empty">
              <p className="topic-detail-empty-text">
                No problems found for this difficulty level
              </p>
              <button
                onClick={() => setDifficultyFilter("All")}
                className="topic-detail-empty-btn"
              >
                Show All Problems
              </button>
            </div>
          ) : (
            filteredProblems.map((problem, index) => (
              <div
                key={problem._id}
                className="animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProblemCard
                  problem={problem}
                  topicId={topic._id}
                  index={topic.problems.findIndex((p) => p._id === problem._id)}
                />
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        {filteredProblems.length > 0 && (
          <div className="topic-detail-footer">
            <p className="topic-detail-footer-text">
              Showing{" "}
              <span className="topic-detail-footer-count">
                {filteredProblems.length}
              </span>{" "}
              of{" "}
              <span className="topic-detail-footer-total">
                {topic.problems.length}
              </span>{" "}
              problems
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;
