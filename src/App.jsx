import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './shared/Header';
import Footer from './shared/Footer';
import MainPageHero from './shared/MainPageHero';
import Aboutus from './aboutus/Aboutus';
import SigninSignup from './signin.jsx/signin';

const Layout = ({ children }) => {
  const location = useLocation();
  const isSigninPage = location.pathname === '/signin';

  return (
    <div className="page-container">
      {!isSigninPage && <Header />}
      <main className="main-content">{children}</main>
      {!isSigninPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPageHero />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/signin" element={<SigninSignup />} />
      </Routes>
    </Layout>
  );
}

export default App;
