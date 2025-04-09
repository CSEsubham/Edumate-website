// src/find/NewPostModal.jsx
import React, { useState, useContext } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../firebase/AuthContext";
import Swal from "sweetalert2";
import "./posttution.css"
export default function NewPostModal({ onClose }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tuitionPosts"), {
        title,
        subject,
        description,
        duration,
        topicTags: tags.split(",").map((t) => t.trim()),
        authorId: user.uid,
        authorName: user.displayName,
        classCount: 0,
        studentCount: 0,
        timestamp: Timestamp.now(),
      });
      Swal.fire("Posted!", "Tuition offer created.", "success");
      onClose();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <h2>📢 Post a Tuition</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (e.g., 1.5 hrs)" required />
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma-separated)" required />

        <div className="modal-buttons">
          <button type="submit" className="btn-primary">Post</button>
          <button onClick={onClose} className="btn-outline">Cancel</button>
        </div>
      </form>
    </div>
  );
}

