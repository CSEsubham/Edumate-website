import React from "react";
import MainPageHero from "./MainPageHero";
import { motion } from "framer-motion";

export default function MainPage() {
  return (
    <div className="main-page">
      <MainPageHero />

      {/* Section 2: How it works */}
      <motion.section
        className="section how-it-works"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">How Edumate Works</h2>
        <div className="how-grid">
          <div className="step">
            <h3>1. Explore</h3>
            <p>Find tuitions or tutors based on your subject, level, or interest.</p>
          </div>
          <div className="step">
            <h3>2. Connect</h3>
            <p>Message tutors, apply for posts, or offer your own services easily.</p>
          </div>
          <div className="step">
            <h3>3. Learn & Teach</h3>
            <p>Schedule and conduct sessions right on the platform, anytime.</p>
          </div>
        </div>
      </motion.section>

      {/* Section 3: Testimonials */}
      <motion.section
        className="section testimonials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">What Students Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"Edumate helped me find the perfect Python tutor within hours! It's the best!"</p>
            <h4>– Aakash M.</h4>
          </div>
          <div className="testimonial">
            <p>"Being able to teach and build my resume while studying is incredible. Thanks Edumate!"</p>
            <h4>– Niharika R.</h4>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
