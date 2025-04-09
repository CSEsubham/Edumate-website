import React from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();

  return (
    <div className="post-detail">
      <h2>Tuition Offer ID: {id}</h2>
      <p>This is where you’ll see full details, reviews, schedule options, etc.</p>
      <button className="apply-btn">Apply for Class</button>
    </div>
  );
}
