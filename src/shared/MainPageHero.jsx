import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaSearch } from "react-icons/fa";
import heroImage from "../assets/undraw_vibe-coding_mjme.jpg"; // Update this with your asset path
import "./mainpagehero.css";

export default function MainPageHero() {
  return (
    <section className="main-hero-section">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="gradient-text">
            Unlock Your Potential with <span className="highlight">Edumate</span>
          </h1>
          <p>
            Edumate is a free, student-driven platform built to bridge the gap between eager learners and passionate tutors.
            Whether you're here to teach, learn, or collaborate—Edumate makes it seamless and impactful.
          </p>
          <ul className="hero-bullets">
            <li>✅ Post or apply for tuitions for free</li>
            <li>✅ Real-time communication & scheduling</li>
            <li>✅ Secure tutor-student matching</li>
            <li>✅ Personalized dashboards & reviews</li>
            <li>✅ Open discussions and support</li>
          </ul>

          <div className="hero-buttons">
            <Link to="/find" className="btn find">
              <FaSearch /> Explore Tuition
            </Link>
            <Link to="/find" className="btn teach">
              <FaChalkboardTeacher /> Become a Tutor
            </Link>
          </div>

          <div className="founder-story">
            <p>
              Hello! I'm <strong>Subham Kumar</strong>, a passionate developer from
              <strong> Gayatri Vidya Parishad College</strong>, pursuing my B.Tech in Computer Science.
              I created <span className="highlighted-name">Edumate</span> with a simple yet powerful idea —
              to build a platform that connects students with the right tutors, and empowers anyone to teach or learn for free.
            </p>

            <p>
              During my learning journey, I realized how difficult it can be to find affordable, quality tuition or to share knowledge without limitations.
              <strong>Edumate</strong> solves this by creating a community where learners and educators collaborate, grow, and thrive.
            </p>

            <p>In the future, I plan to bring powerful features like:</p>
            <ul className="future-features">
              <li>🔐 Verified tutor badges & ranking system</li>
              <li>📅 Advanced scheduling with reminders</li>
              <li>🧑‍🏫 Live interactive whiteboard sessions</li>
              <li>📊 Performance tracking for students & tutors</li>
              <li>🌐 Multilingual support to reach every corner of India</li>
            </ul>

            <p>
              I'm building Edumate not just as a project, but as a movement — to make education accessible, interactive, and inspiring.
              Thank you for being part of this journey.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img src={heroImage} alt="Interactive online learning" className="floating-image" />
        </motion.div>
      </div>

      <div className="hero-background-blur" />
    </section>
  );
}
