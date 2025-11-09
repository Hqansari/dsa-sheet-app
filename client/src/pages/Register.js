import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User, Mail, Lock, UserPlus, Award, Shield, Zap } from "lucide-react";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const result = await register(
      formData.name,
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Animated Background */}
      <div className="register-background">
        <div className="register-bg-circle-1"></div>
        <div className="register-bg-circle-2"></div>
      </div>

      <div className="register-container">
        {/* Left Side - Branding */}
        <div className="register-branding">
          <div className="register-logo-section">
            <div className="register-logo-icon">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="register-logo-text">DSA Mastery</h1>
          </div>

          <h2 className="register-heading">Start Your Coding Journey Today</h2>

          <p className="register-subheading">
            Join thousands of developers mastering data structures and
            algorithms.
          </p>

          {/* Benefits */}
          <div className="register-benefits">
            <div className="register-benefit">
              <div className="register-benefit-header">
                <div className="register-benefit-icon">
                  <Shield className="w-5 h-5 text-primary-400" />
                </div>
                <div className="register-benefit-content">
                  <h4>Secure & Private</h4>
                  <p>Your data is safe with us</p>
                </div>
              </div>
            </div>
            <div className="register-benefit">
              <div className="register-benefit-header">
                <div className="register-benefit-icon">
                  <Zap className="w-5 h-5 text-primary-400" />
                </div>
                <div className="register-benefit-content">
                  <h4>Fast Progress</h4>
                  <p>Track improvements in real-time</p>
                </div>
              </div>
            </div>
            <div className="register-benefit">
              <div className="register-benefit-header">
                <div className="register-benefit-icon">
                  <Award className="w-5 h-5 text-primary-400" />
                </div>
                <div className="register-benefit-content">
                  <h4>Interview Ready</h4>
                  <p>Prepare for top companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="register-form-container">
          <div className="register-form-header">
            <h3 className="register-form-title">Create Account 🚀</h3>
            <p className="register-form-subtitle">
              Join the community and start learning
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="register-error">
              <p className="register-error-text">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            {/* Name Field */}
            <div className="register-form-group">
              <label className="register-form-label">Full Name</label>
              <div className="register-input-wrapper">
                <User className="register-input-icon w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="User Name"
                  required
                  className="register-input"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="register-form-group">
              <label className="register-form-label">Email Address</label>
              <div className="register-input-wrapper">
                <Mail className="register-input-icon w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@gmail.com"
                  required
                  className="register-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="register-form-group">
              <label className="register-form-label">Password</label>
              <div className="register-input-wrapper">
                <Lock className="register-input-icon w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength="6"
                  className="register-input"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="register-form-group">
              <label className="register-form-label">Confirm Password</label>
              <div className="register-input-wrapper">
                <Lock className="register-input-icon w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="register-input"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="register-submit"
            >
              {loading ? (
                <>
                  <div className="register-spinner"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="register-footer">
            <p className="register-footer-text">
              Already have an account?{" "}
              <Link to="/login" className="register-footer-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
