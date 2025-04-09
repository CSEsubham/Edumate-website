// src/find/Discuss.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "./discuss.css";

export default function Discuss() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const bottomRef = useRef();

  const fetchMessages = () => {
    const q = query(collection(db, "discussion"), orderBy("timestamp"));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !msg.trim()) return;

    try {
      await addDoc(collection(db, "discussion"), {
        text: msg,
        sender: user.displayName || user.email,
        uid: user.uid,
        timestamp: serverTimestamp(),
      });
      setMsg("");
    } catch (err) {
      Swal.fire("Error", "Message not sent!", "error");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatroom-container">
      <h2 className="chatroom-title">💬 Discussion Room</h2>

      <div className="messages-container">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            className={`message ${m.uid === auth.currentUser?.uid ? "sent" : "received"}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="sender">{m.sender}</p>
            <p>{m.text}</p>
          </motion.div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <form className="input-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
