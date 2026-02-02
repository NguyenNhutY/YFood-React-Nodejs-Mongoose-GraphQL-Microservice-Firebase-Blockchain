import React, { useState }  from "preact/hooks";
import { useParams } from "preact-router";
import { BlogPost, NewComment } from "../../types/typesBlog";
import { blogList } from "../../types/typesBlog";
import CommentSection from "../CommentSection/CommentSection";
import "./blogDetail.scss";
import { FunctionalComponent } from "preact";

const BlogDetail: FunctionalComponent = () => {
  const { id } = useParams<{ id: string }>(); // Ensure this matches the route parameter
  console.log("Blog ID:", id); // Thêm log để kiểm tra giá trị blogId

  const [blog, setBlog] = useState<BlogPost | undefined>(
    blogList.find((b) => b.id === id) // Use the parameter to find the blog
  );

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const handleAddComment = (newComment: NewComment) => {
    if (blog) {
      setBlog({
        ...blog,
        comments: [
          ...blog.comments,
          {
            id: Date.now().toString(),
            content: newComment.content,
            author: "Anonymous",
            date: new Date().toISOString(),
          },
        ],
      });
    }
  };

  const handleLike = () => {
    if (blog) {
      setBlog({
        ...blog,
        likes: blog.likes + 1, // Tăng số lượt thích
      });
    }
  };

  return (
    <div class='blog-detail'>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      {blog.image && <img src={blog.image} alt={blog.title} />}
      <div class='likes-section'>
        <button onClick={handleLike}>Like</button>
        <p>{blog.likes} Likes</p> {/* Hiển thị số lượt thích */}
      </div>
      <CommentSection
        comments={blog.comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default BlogDetail;
