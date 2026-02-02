// src/components/CommentList.js
import React  from "preact/hooks";
import "./commentList.scss";

const CommentList = ({ comments }) => (
  <ul class='comment-list'>
    {comments.map((comment, index) => (
      <li key={index}>{comment}</li>
    ))}
  </ul>
);

export default CommentList;
