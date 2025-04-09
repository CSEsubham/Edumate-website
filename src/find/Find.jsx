// src/find/Find.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./find.css";

export default function Find() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [tags, setTags] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
    } catch (error) {
      toast("Failed to fetch posts", "error");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toast = (title, icon) => {
    Swal.fire({
      toast: true,
      icon,
      title,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      background: "#fff",
      color: "#333",
      customClass: {
        popup: "animated-toast",
      },
    });
  };

  const handleCreatePost = async () => {
    const user = auth.currentUser;
    if (!user) return toast("Login required", "error");

    if (!title || !description || !subject) {
      return toast("All fields required", "error");
    }

    try {
      const newPost = {
        title,
        description,
        authorId: user.uid,
        authorName: user.displayName || user.email || "Anonymous",
        timestamp: serverTimestamp(),
        subject,
        topicTags: tags.split(",").map((tag) => tag.trim()),
        classCount: 0,
        studentCount: 0,
        duration: "1 hour/session",
      };

      await addDoc(collection(db, "posts"), newPost);
      toast("Post created!", "success");
      setTitle("");
      setDescription("");
      setSubject("");
      setTags("");
      fetchPosts();
    } catch (error) {
      toast("Error creating post", "error");
    }
  };

  const handleApply = async (post) => {
    const user = auth.currentUser;
    if (!user) return toast("Login required", "error");

    try {
      await addDoc(collection(db, "applications"), {
        postId: post.id,
        applicantId: user.uid,
        applicantName: user.displayName || user.email || "Student",
        appliedAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "posts", post.id), {
        studentCount: increment(1),
      });

      toast("Applied successfully!", "success");
    } catch (err) {
      toast("Application failed", "error");
    }
  };

  const handleDelete = async (post) => {
    const user = auth.currentUser;
    if (!user || user.uid !== post.authorId) {
      return toast("Not authorized", "error");
    }

    try {
      await deleteDoc(doc(db, "posts", post.id));
      toast("Post deleted", "success");
      fetchPosts();
    } catch (error) {
      toast("Failed to delete", "error");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const query = searchTerm.toLowerCase();
    return (
      post.title?.toLowerCase().includes(query) ||
      post.authorName?.toLowerCase().includes(query) ||
      post.topicTags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <section className="find-section">
      <motion.div className="form-card" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
        <h2>Create Tuition Post</h2>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Subject (e.g. Math, React)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button onClick={handleCreatePost}>Post</button>
      </motion.div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title, tags or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="post-list">
        {filteredPosts.length === 0 ? (
          <p className="no-posts">No matching tuition posts.</p>
        ) : (
          filteredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              className="post-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p className="post-meta">By: {post.authorName}</p>
              <p className="post-meta">Subject: {post.subject}</p>
              <p className="post-meta">Tags: {post.topicTags?.join(", ")}</p>
              <p className="post-meta">👨‍🏫 Classes: {post.classCount || 0}</p>
              <p className="post-meta">🧑‍🎓 Students: {post.studentCount || 0}</p>

              <div className="post-actions">
                <button onClick={() => handleApply(post)}>Apply</button>
                <Link to={`/find/chat?postId=${post.id}`} className="btn discuss-btn">Discuss</Link>
                <a href="https://meet.jit.si/edumate-classroom" target="_blank" rel="noreferrer" className="btn join-btn">Join Class</a>
                {auth.currentUser?.uid === post.authorId && (
                  <button className="delete-btn" onClick={() => handleDelete(post)}>Delete</button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
