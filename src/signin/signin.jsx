import React, { useState } from "react";
import "./auth-modern.css";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import loginImg from "../assets/undraw_login_weas.jpg";
import logoutImg from "../assets/undraw_log-out_2vod.jpg";

export default function SigninSignup() {
  const [signIn, setSignIn] = useState(true);
  const [name, setName] = useState(""); // for signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (signIn) {
        await signInWithEmailAndPassword(auth, email, password);
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Signed in successfully!",
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });

        Swal.fire({
          toast: true,
          icon: "success",
          title: `Welcome, ${name}!`,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      navigate("/");
    } catch (error) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: error.message,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-wrapper ${window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : ''}`}>
      <motion.div
        className="auth-content"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="form-box"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form className="form-section" onSubmit={handleAuth}>
            <h2>{signIn ? "Sign In" : "Sign Up"}</h2>

            {!signIn && (
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Authenticating..." : signIn ? "Login" : "Register"}
            </button>

            <p className="toggle-text">
              {signIn ? "New here?" : "Already have an account?"}{" "}
              <span onClick={() => setSignIn(!signIn)}>
                {signIn ? "Create account" : "Sign In"}
              </span>
            </p>
          </form>
        </motion.div>

        <motion.div
          className="auth-img"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img src={signIn ? loginImg : logoutImg} alt="auth visual" />
        </motion.div>
      </motion.div>
    </div>
  );
}
