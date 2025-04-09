import React from "react";
import "./footer.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaLaptopCode } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-brand">Edumate</h2>

        <div className="footer-icons">
          <a href="https://github.com/CSEsubham" target="_blank"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/subham-kumar-8048052a7/" target="_blank"><FaLinkedin /></a>
          <a href="mailto:mutnurisubham@gmail.com"><FaEnvelope /></a>
          <a href="https://leetcode.com/u/subham_kumar_m/" target="_blank"><FaLaptopCode /></a>
        </div>

        <p className="footer-copy">© 2025 Subham Kumar. All rights reserved.</p>
      </div>
    </footer>
  );
}
