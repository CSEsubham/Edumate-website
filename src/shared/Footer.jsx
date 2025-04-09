import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-brand">Edumate</h2>

        <div className="footer-icons">
          <a href="mailto:mutnurisubham@gmail.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope />
          </a>
          <a href="https://github.com/CSEsubham" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/subham-kumar-8048052a7/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://leetcode.com/u/subham_kumar_m/" target="_blank" rel="noopener noreferrer">
            <FaCode />
          </a>
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} Edumate | Built with ❤️ by Subham Kumar</p>
      </div>
    </footer>
  );
}
