import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ProgressContext } from "../context/ProgressContext";
import Navbar from "../components/Navbar";
import TopicCard from "../components/TopicCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { TrendingUp, Target, Award, Flame, Search } from "lucide-react";
import "./Dashboard.css";

const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { progress, getOverallProgress, getTopicProgress } =
    useContext(ProgressContext);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const res = await axios.get(`${API_URL}/topics`);
      setTopics(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading topics:", err);
      setLoading(false);
    }
  };

  const totalProblems = topics.reduce(
    (sum, topic) => sum + topic.problems.length,
    0
  );
  const completedProblems = progress.completedProblems.length;
  const overallProgress = getOverallProgress(totalProblems);
  const completedTopics = topics.filter(
    (t) => getTopicProgress(t._id, t.problems.length) === 100
  ).length;

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <h1 className="dashboard-title">
            Welcome back,{" "}
            <span className="dashboard-username">{user?.name}!</span> 👋
          </h1>
          <p className="dashboard-subtitle">
            Track your progress and continue mastering DSA
          </p>
        </div>

        {/* Stats Grid */}
        <div className="dashboard-stats">
          {/* Stat 1 */}
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon primary">
                <TrendingUp className="w-6 h-6 text-primary-400" />
              </div>
              <span className="stat-emoji">📈</span>
            </div>
            <h3 className="stat-label">Overall Progress</h3>
            <p className="stat-value">{overallProgress}%</p>
            <div className="stat-progress-bar">
              <div
                className="stat-progress-fill"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon green">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <span className="stat-emoji">✅</span>
            </div>
            <h3 className="stat-label">Problems Solved</h3>
            <p className="stat-value">{completedProblems}</p>
            <p className="stat-subtext">of {totalProblems} total</p>
          </div>

          {/* Stat 3 */}
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon yellow">
                <Flame className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="stat-emoji">🔥</span>
            </div>
            <h3 className="stat-label">Current Streak</h3>
            <p className="stat-value">7 days</p>
            <p className="stat-subtext">Keep it up!</p>
          </div>

          {/* Stat 4 */}
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon purple">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <span className="stat-emoji">🏆</span>
            </div>
            <h3 className="stat-label">Topics Completed</h3>
            <p className="stat-value">{completedTopics}</p>
            <p className="stat-subtext">of {topics.length} topics</p>
          </div>
        </div>

        {/* Search */}
        <div className="dashboard-search-section">
          <div className="dashboard-search-wrapper">
            <Search className="dashboard-search-icon w-5 h-5" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dashboard-search-input"
            />
          </div>
        </div>

        {/* Topics Grid */}
        <div>
          <h2 className="dashboard-topics-header">
            <span className="dashboard-topics-accent"></span>
            Learning Path
          </h2>

          {filteredTopics.length === 0 ? (
            <div className="dashboard-empty">
              <p className="dashboard-empty-text">
                No topics found matching "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="dashboard-topics-grid">
              {filteredTopics.map((topic, index) => (
                <div
                  key={topic._id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TopicCard topic={topic} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
