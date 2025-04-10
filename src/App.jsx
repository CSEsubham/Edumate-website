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
