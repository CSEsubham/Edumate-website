import React, { useState } from "react";
import "./auth-modern.css";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import loginImage from "../assets/undraw_login_weas.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SigninSignup() {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (signIn) {
        await signInWithEmailAndPassword(auth, email, password);
        setIsLoggedIn(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back 👋",
          icon: "success",
          confirmButtonText: "Go to Home",
          confirmButtonColor: "#00bcd4",
          background: "#1a1a1a",
          color: "#fff"
        }).then(() => {
          navigate("/");
        });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setIsLoggedIn(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        Swal.fire({
          title: "Account Created!",
          text: "You're now part of Edumate 🎉",
          icon: "success",
          confirmButtonText: "Get Started",
          confirmButtonColor: "#00bcd4",
          background: "#1a1a1a",
          color: "#fff"
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      Swal.fire({
        title: "Oops!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#00bcd4",
        background: "#1a1a1a",
        color: "#fff"
      });
    }
  };

  return (
    <div className="auth-modern-page">
      <div className="auth-modern-container">
        <div className="auth-left">
          <img
            src={loginImage}
            alt="illustration"
            className="auth-illustration"
          />
          <h1 className="auth-title">
            Welcome to <span>Edumate</span>
          </h1>
          <p className="auth-tagline">
            Empowering learning. Connecting minds.
          </p>
        </div>

        <motion.div
          className="auth-right"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleAuth} className="auth-form">
            <h2>{signIn ? "Sign In" : "Create Account"}</h2>
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{signIn ? "Login" : "Register"}</button>
          </form>

          <div className="auth-toggle">
            <p>{signIn ? "Don't have an account?" : "Already a member?"}</p>
            <button onClick={() => setSignIn(!signIn)}>
              {signIn ? "Create Account" : "Back to Login"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}