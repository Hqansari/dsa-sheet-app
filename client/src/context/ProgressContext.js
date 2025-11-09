import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ProgressContext = createContext();

const API_URL = "http://localhost:5000/api";

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({ completedProblems: [] });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  // Load progress on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadProgress();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load user progress
  const loadProgress = async () => {
    try {
      const res = await axios.get(`${API_URL}/progress`);
      setProgress(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading progress:", err);
      setLoading(false);
    }
  };

  // Toggle problem completion
  const toggleProblem = async (topicId, problemId) => {
    try {
      const res = await axios.post(`${API_URL}/progress/toggle`, {
        topicId,
        problemId,
      });
      setProgress(res.data);
      return true;
    } catch (err) {
      console.error("Error toggling problem:", err);
      return false;
    }
  };

  // Check if problem is completed
  const isProblemCompleted = (topicId, problemId) => {
    return progress.completedProblems.some(
      (p) => p.topicId === topicId && p.problemId === problemId
    );
  };

  // Get completion percentage for a topic
  const getTopicProgress = (topicId, totalProblems) => {
    const completed = progress.completedProblems.filter(
      (p) => p.topicId === topicId
    ).length;
    return totalProblems > 0
      ? Math.round((completed / totalProblems) * 100)
      : 0;
  };

  // Get overall progress
  const getOverallProgress = (totalProblems) => {
    const completed = progress.completedProblems.length;
    return totalProblems > 0
      ? Math.round((completed / totalProblems) * 100)
      : 0;
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        loading,
        toggleProblem,
        isProblemCompleted,
        getTopicProgress,
        getOverallProgress,
        loadProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
