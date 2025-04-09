import React from 'react';


export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <p className="brand-name"><a href="https://github.com/CSEsubham">Edumate</a></p>
      </div>

      <nav className="nav-links">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/find">Find</a></li>
          <li><a href="../aboutus/Aboutus.jsx">About Us</a></li>
        </ul>
      </nav>

      <div className="auth-buttons">
        <a href="/signup" className="signup-btn">Sign Up</a>
      </div>
    </header>
  );
}
