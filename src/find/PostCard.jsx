import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <div className="post-card" onClick={() => navigate(`/find/${post.id}`)}>
      <h3>{post.subject}</h3>
      <p><strong>Tutor:</strong> {post.tutor}</p>
      <p>{post.description}</p>
      <button className="view-btn">
        View Details <FaArrowRight />
      </button>
    </div>
  );
}
