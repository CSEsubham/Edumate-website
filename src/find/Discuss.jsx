// src/pages/Discuss.jsx
import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { AuthContext } from "../firebase/AuthContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";
import "./discuss.css";

SyntaxHighlighter.registerLanguage("javascript", js);

export default function Discuss() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "discussionMessages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      Swal.fire("Empty!", "Please enter a message", "warning");
      return;
    }

    await addDoc(collection(db, "discussionMessages"), {
      text: input,
      uid: user.uid,
      name: user.displayName,
      timestamp: Timestamp.now(),
      reactions: { like: 0, laugh: 0, fire: 0 },
    });

    setInput("");
  };

  const handleReact = async (id, type) => {
    const messageRef = doc(db, "discussionMessages", id);
    const message = messages.find((msg) => msg.id === id);
    const updatedReactions = {
      ...message.reactions,
      [type]: message.reactions[type] + 1,
    };
    await updateDoc(messageRef, { reactions: updatedReactions });
  };

  return (
    <div className="discuss-container">
      <h2>💬 Discussion Room</h2>
      <div className="messages-box">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className={`message ${msg.uid === user.uid ? "own" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="msg-header">
              <strong>{msg.name}</strong>
              <span className="timestamp">
                {msg.timestamp?.toDate().toLocaleTimeString()}
              </span>
            </div>

            <div className="msg-body">
              <ReactMarkdown
                children={msg.text}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    return !inline ? (
                      <SyntaxHighlighter
                        style={docco}
                        language="javascript"
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>

            <div className="reactions">
              <button onClick={() => handleReact(msg.id, "like")}>❤️ {msg.reactions?.like || 0}</button>
              <button onClick={() => handleReact(msg.id, "laugh")}>😂 {msg.reactions?.laugh || 0}</button>
              <button onClick={() => handleReact(msg.id, "fire")}>🔥 {msg.reactions?.fire || 0}</button>
            </div>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSend} className="message-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message... Use markdown or paste code!"
          rows={3}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
