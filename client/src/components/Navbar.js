import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProgressContext } from "../context/ProgressContext";
import { LogOut, User, Menu, X, Award } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getOverallProgress } = useContext(ProgressContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calculate total problems (you'll pass this from parent later)
  const totalProblems = 50; // Placeholder
  const overallProgress = getOverallProgress(totalProblems);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <div className="navbar-logo-icon">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="navbar-logo-text">
              <h1 className="navbar-title">DSA Mastery</h1>
              <p className="navbar-subtitle">Code. Learn. Grow.</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu-desktop">
            {/* Progress Badge */}
            <div className="navbar-progress-badge">
              <div className="navbar-progress-dot"></div>
              <span className="navbar-progress-text">
                Progress:{" "}
                <span className="navbar-progress-value">
                  {overallProgress}%
                </span>
              </span>
            </div>

            <div className="navbar-user-info">
              <div className="navbar-user-avatar">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="navbar-user-details">
                <p className="navbar-user-name">{user?.name}</p>
                <p className="navbar-user-email">{user?.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button onClick={logout} className="navbar-logout-btn">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="navbar-mobile-btn"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            <div className="navbar-mobile-menu-content">
              <div className="navbar-mobile-card">
                <p className="navbar-mobile-label">Progress</p>
                <p className="navbar-mobile-value">{overallProgress}%</p>
              </div>
              <div className="navbar-mobile-card">
                <p className="navbar-mobile-label">Logged in as</p>
                <p className="navbar-user-name">{user?.name}</p>
              </div>
              <button onClick={logout} className="navbar-mobile-logout">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
