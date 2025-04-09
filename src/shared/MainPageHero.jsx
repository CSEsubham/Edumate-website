import React from 'react';


export default function MainPageHero() {
  return (
    <section className="hero-section">
      <h1 className="hero-title">
        Empower Your Learning With <br />
        <span>Edumate</span>
      </h1>
      <p className="hero-description">
        Discover, connect, and grow with personalized learning tools, student mentors, and tutoring support — all in one collaborative platform.
      </p>
      <div className="hero-buttons">
        <a href="/signup" className="neumorphic-btn primary">Get Started</a>
        <a href="/about" className="neumorphic-btn secondary">Learn More</a>
      </div>
    </section>
  );
}
