import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import MainPageHero from "./shared/MainPageHero";
import Aboutus from "./aboutus/Aboutus";
import Find from "./find/Find";
import SigninSignup from "./signin/signin";
import PostDetail from "./find/PostDetail"; // create this file if missing
 import PostTution from "./find/PostTution";   // create this file if missing
 import Discuss from "./find/Discuss";
 import ThreadPage from "./find/ThreadPage";

export default function App() {
  return (
   <head>
   <!-- Basic Meta Tags -->

<meta name="description" content="EduMate is an AI-powered, project-based learning platform created by Subham Kumar. Build skills in React, Python, and more with real-world projects.">
<meta name="author" content="Subham Kumar">

<!-- Open Graph (for social sharing) -->
<meta property="og:title" content="EduMate - Project-Based Learning by Subham Kumar">
<meta property="og:description" content="Created by Subham Kumar, EduMate helps learners build real projects in web development and AI.">
<meta property="og:url" content="https://edumate-website.vercel.app/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://edumate-website.vercel.app/og-image.png"> <!-- Add an image for previews -->

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="EduMate - Learn with Projects by Subham Kumar">
<meta name="twitter:description" content="Build your skills in web dev and AI with real projects. Created by Subham Kumar.">
<meta name="twitter:image" content="https://edumate-website.vercel.app/og-image.png">

<!-- Canonical URL -->
<link rel="canonical" href="https://edumate-website.vercel.app/">

   </head>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPageHero />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/find" element={<Find />} />
        <Route path="/find/:id" element={<PostDetail />} />
        <Route path="/discuss" element={<Discuss />} />
        <Route path="/find/chat" element={<PostTution/>} />
       <Route path="/thread/:id" element={<ThreadPage />} />

      </Route>
      <Route path="/signin" element={<SigninSignup />} />
    </Routes>
  );
}
