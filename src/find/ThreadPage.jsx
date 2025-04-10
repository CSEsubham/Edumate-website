import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";


export default function ThreadPage() {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchThread = async () => {
    const docRef = doc(db, "discussion", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setThread({ id: docSnap.id, ...docSnap.data() });
    }
  };

  const fetchComments = async () => {
    const q = query(
      collection(db, "discussion_comments"),
      where("threadId", "==", id)
    );
    const snap = await getDocs(q);
    const all = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setComments(all);
  };

  useEffect(() => {
    fetchThread();
    fetchComments();
  }, [id]);

  const handleComment = async () => {
    if (!comment.trim()) return alert("Write something first!");
    const user = auth.currentUser;
    if (!user) return alert("You must be logged in!");

    try {
      await addDoc(collection(db, "discussion_comments"), {
        threadId: id,
        comment,
        user: user.displayName || user.email || "Anonymous",
        createdAt: serverTimestamp(),
      });
      setComment("");
      fetchComments();
    } catch (err) {
      alert("Failed to comment");
    }
  };

  return (
    <div className="thread-page">
      {thread ? (
        <div className="thread-card">
          <h2>{thread.title}</h2>
          <p>{thread.content}</p>
          <p className="author">Posted by: {thread.sender}</p>
        </div>
      ) : (
        <p>Loading thread...</p>
      )}

      <div className="comment-section">
        <h3>Comments</h3>
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleComment}>Comment</button>

        <div className="comment-list">
          {comments.map((c) => (
            <div className="comment" key={c.id}>
              <p>{c.comment}</p>
              <span className="comment-author">- {c.user}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
