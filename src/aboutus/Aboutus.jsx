// Aboutus.jsx
import React from 'react';
import './aboutus.css';
import img1 from '../assets/undraw_avatars_xsfb.jpg';
import img2 from '../assets/undraw_calendar_8r6s.jpg';
import img3 from '../assets/undraw_reading-a-book_4cap.jpg';

export default function Aboutus() {
  return (
    <section className="about-section">
      <h1 className="about-title">About Edumate</h1>
      <p className="about-subtitle">Empowering learners. Connecting knowledge.</p>

      <div className="about-description">
        <p>
          <strong>Edumate</strong> is a modern platform built with a passion for learning and collaboration.
          It bridges the gap between students, mentors, and knowledge seekers by providing tools that are simple, intuitive,
          and empowering.
        </p>
        <p>
          From managing queries and connecting with peers to attending interactive sessions,
          Edumate is designed to make learning more organized, engaging, and impactful.
        </p>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <img src={img2} alt="Learning Calendar" />
          <h3>Flexible Learning</h3>
          <p>Plan your learning with ease using our intuitive calendar and schedule tools designed for students.</p>
        </div>
        <div className="about-card">
          <img src={img1} alt="Dashboard Preview" />
          <h3>Student-Friendly Dashboard</h3>
          <p>Manage your activities and queries efficiently through our clean and modern dashboard interface.</p>
        </div>
        <div className="about-card">
          <img src={img3} alt="Online Learning" />
          <h3>Interactive Sessions</h3>
          <p>Engage in seamless online learning with mentors and peers from anywhere, anytime.</p>
        </div>
      </div>

      <div className="creator-section">
        <h2>Meet the Creator</h2>
        <p>
          Hi, I'm <strong>Subham Kumar</strong>, a passionate Computer Science student at Gayatri Vidya Parishad College.
          I created Edumate to help students like me learn better, ask questions freely, and grow together.
        </p>
        <p>
          I've built this project using <strong>React.js, CSS, and modern web technologies</strong>. I'm continuously working to improve it
          and make it a complete educational assistant for students and mentors alike.
        </p>
        <p>
          I believe in building communities, learning from each other, and making education accessible to everyone. This platform
          is my step in that direction.
        </p>
      </div>

      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To create a collaborative learning space where students support each other, grow their skills, and connect with
          opportunities that prepare them for a brighter future.
        </p>
      </div>
    </section>
  );
}
