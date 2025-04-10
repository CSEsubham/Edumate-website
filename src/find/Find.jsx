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
  Timestamp,
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
  const [classTime, setClassTime] = useState("");

  const navigate = useNavigate();

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

  const fetchPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const appSnap = await getDocs(collection(db, "applications"));

      const applications = appSnap.docs.map((doc) => doc.data());

      const data = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const post = { id: docSnap.id, ...docSnap.data() };
          const appliedUsers = applications
            .filter((a) => a.postId === post.id)
            .map((a) => a.applicantName);

          return { ...post, appliedBy: appliedUsers };
        })
      );

      setPosts(data);
    } catch (error) {
      toast("Failed to fetch posts", "error");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    const user = auth.currentUser;
    if (!user) return toast("Login required", "error");

    if (!title || !description || !subject || !classTime) {
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
        classStartTime: Timestamp.fromDate(new Date(classTime)),
      };

      await addDoc(collection(db, "posts"), newPost);
      toast("Post created!", "success");
      setTitle("");
      setDescription("");
      setSubject("");
      setTags("");
      setClassTime("");
      fetchPosts();
    } catch (error) {
      toast("Error creating post", "error");
    }
  };

  const handleApply = async (post) => {
    const user = auth.currentUser;
    if (!user) return toast("Login required", "error");

    if (user.uid === post.authorId) {
      return toast("You can't apply to your own class", "error");
    }

    const alreadyApplied = post.appliedBy?.includes(user.displayName || user.email);
    if (alreadyApplied) return toast("You already applied", "error");

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
      fetchPosts(); // Refresh data
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
        <input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Subject (e.g. Math, React)" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <input type="datetime-local" value={classTime} onChange={(e) => setClassTime(e.target.value)} />
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
          filteredPosts.map((post, i) => {
            const startTime = post.classStartTime?.toDate?.() || new Date(post.classStartTime);
            const now = new Date();
            const classStarted = now >= startTime;

            return (
              <motion.div
                key={post.id}
                className="post-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="title-aaa">{post.title}</h3>
                <p className="title-aaa">{post.description}</p>
                <p className="post-meta">📘 Subject: {post.subject}</p>
                <p className="post-meta">🏷 Tags: {post.topicTags?.join(", ")}</p>
                <p className="post-meta">👨‍🏫 Classes: {post.classCount || 0}</p>
                <p className="post-meta">🧑‍🎓 Students: {post.studentCount || 0}</p>
                <p className="post-meta">📝 Posted by: {post.authorName}</p>
                <p className="post-meta">🕒 Class Time: {startTime.toLocaleString()}</p>

                {post.appliedBy?.length > 0 && (
                  <p className="post-meta">🙋‍♂️ Applied By: {post.appliedBy.join(", ")}</p>
                )}

                <div className="post-actions">
                  <button onClick={() => handleApply(post)}>Apply</button>
                  <Link to="/discuss" className="btn discuss-btn">Discuss</Link>

                  {classStarted ? (
                    <a
                      href="https://meet.jit.si/edumate-classroom"
                      target="_blank"
                      rel="noreferrer"
                      className="btn join-btn"
                    >
                      Join Class
                    </a>
                  ) : (
                    <button className="btn join-btn disabled" disabled>
                      ⏳ Starts at {startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </button>
                  )}

                  {auth.currentUser?.uid === post.authorId && (
                    <button className="delete-btn" onClick={() => handleDelete(post)}>Delete</button>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </section>
  );
}
