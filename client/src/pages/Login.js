import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Mail, Lock, LogIn, Award, Sparkles, TrendingUp } from "lucide-react";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="login-background">
        <div className="login-bg-circle-1"></div>
        <div className="login-bg-circle-2"></div>
      </div>

      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="login-logo-section">
            <div className="login-logo-icon">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="login-logo-text">DSA Mastery</h1>
          </div>

          <h2 className="login-heading">Master Data Structures & Algorithms</h2>

          <p className="login-subheading">
            Track your progress, access curated resources, and ace your coding
            interviews.
          </p>

          {/* Feature List */}
          <div className="login-features">
            <div className="login-feature">
              <div className="login-feature-icon">
                <TrendingUp className="w-5 h-5 text-primary-400" />
              </div>
              <span className="login-feature-text">
                Track your learning progress
              </span>
            </div>
            <div className="login-feature">
              <div className="login-feature-icon">
                <Sparkles className="w-5 h-5 text-primary-400" />
              </div>
              <span className="login-feature-text">Curated problem sets</span>
            </div>
            <div className="login-feature">
              <div className="login-feature-icon">
                <Award className="w-5 h-5 text-primary-400" />
              </div>
              <span className="login-feature-text">
                Interview-ready preparation
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-form-header">
            <h3 className="login-form-title">Welcome Back! 👋</h3>
            <p className="login-form-subtitle">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="login-error">
              <p className="login-error-text">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="login-form-group">
              <label className="login-form-label">Email Address</label>
              <div className="login-input-wrapper">
                <Mail className="login-input-icon w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@gmail.com"
                  required
                  className="login-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="login-form-group">
              <label className="login-form-label">Password</label>
              <div className="login-input-wrapper">
                <Lock className="login-input-icon w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="login-input"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="login-submit">
              {loading ? (
                <>
                  <div className="login-spinner"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="login-footer">
            <p className="login-footer-text">
              Don't have an account?{" "}
              <Link to="/register" className="login-footer-link">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
