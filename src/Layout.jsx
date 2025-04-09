import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin";

  return (
    <div className="page-container">
      {!isAuthPage && <Header />}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="main-content"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {!isAuthPage && <Footer />}
    </div>
  );
}
