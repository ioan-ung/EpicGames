import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./style/SignInUp.css";

const MailIcon = () => (
  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const LockIcon = () => (
  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const SignIn = () => {
  const navigate = useNavigate();
  const { handleLogin, handleRegister, focused, setFocused } =
    useContext(AuthContext);

  const handleOnSubmitLogin = async (e) => {
    e.preventDefault();
    const loginSuccess = await handleLogin(
      e.target.email.value,
      e.target.password.value
    );
    console.log("loginSuccess", loginSuccess);
    navigate("/");
    window.location.reload();
  };

  const handleOnSubmitRegister = (e) => {
    e.preventDefault();
    handleRegister(
      e.target.email.value,
      e.target.password.value,
      e.target.password2.value
    );
  };

  const isLogin = focused !== "register";

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-logo">EG</div>
            <h1>Epic Games</h1>
            <p>
              {isLogin
                ? "Welcome back, jump right in"
                : "Create an account to get started"}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab${isLogin ? " active" : ""}`}
              onClick={() => setFocused("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`auth-tab${!isLogin ? " active" : ""}`}
              onClick={() => setFocused("register")}
            >
              Sign up
            </button>
          </div>

          {isLogin ? (
            <form
              key="login"
              className="auth-form"
              onSubmit={handleOnSubmitLogin}
            >
              <div className="auth-field">
                <label htmlFor="login-email">Email Address</label>
                <div className="auth-input-wrap">
                  <MailIcon />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    className="auth-input"
                    placeholder="yourEmail@yahoo.com"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>
                <div className="auth-input-wrap">
                  <LockIcon />
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    className="auth-input"
                    placeholder="password"
                  />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn">
                Login
              </button>

              <p className="auth-switch">
                Don't have an account?
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => setFocused("register")}
                >
                  Sign up
                </button>
              </p>
            </form>
          ) : (
            <form
              key="register"
              className="auth-form"
              onSubmit={handleOnSubmitRegister}
            >
              <div className="auth-field">
                <label htmlFor="register-email">Email Address</label>
                <div className="auth-input-wrap">
                  <MailIcon />
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    className="auth-input"
                    placeholder="yourEmail@yahoo.com"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="register-password">Password</label>
                <div className="auth-input-wrap">
                  <LockIcon />
                  <input
                    id="register-password"
                    name="password"
                    type="password"
                    className="auth-input"
                    placeholder="password"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="register-password2">Re-enter password</label>
                <div className="auth-input-wrap">
                  <LockIcon />
                  <input
                    id="register-password2"
                    name="password2"
                    type="password"
                    className="auth-input"
                    placeholder="password"
                  />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn">
                Register
              </button>

              <p className="auth-switch">
                Already have an account?
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => setFocused("login")}
                >
                  Login now
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignIn;
