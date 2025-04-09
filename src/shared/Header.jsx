import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "./header.css";

export default function Header() {
  const { isAuth, setIsAuth, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00bcd4',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      background: '#1a1a1a',
      color: '#fff',
      customClass: {
        popup: 'logout-popup'
      }
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        setIsAuth(false);
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully signed out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#1a1a1a',
          color: '#fff',
        });
        navigate("/signin");
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      }
    }
  };

  return (
    <motion.header
      className="header-blur"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        <h1 className="brand">
          <Link to="/">Edumate</Link>
        </h1>

        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/find">Find</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        <div className="greeting">
          {isAuth ? (
            <>
              <span>Welcome, {user?.displayName || "Subham"}!</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/signin" className="signin-link">Sign In</Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
