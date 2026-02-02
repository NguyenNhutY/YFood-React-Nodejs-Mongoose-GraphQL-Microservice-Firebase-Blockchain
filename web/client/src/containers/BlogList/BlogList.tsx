// src/components/BlogList.tsx
import React  from "preact/hooks";
import { Link } from "preact-router";
import { BlogPost } from "../../types/typesBlog";
import "./blogList.scss";
import { useParams } from "preact-router";
import { FunctionalComponent } from "preact";

interface BlogListProps {
  blogs: BlogPost[];
}

const BlogList: FunctionalComponent<BlogListProps> = ({ blogs }) => (
  <div class='blog-list'>
    <h2>Blog Posts</h2>
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blog/${blog.id}`}>
            <h3>{blog.title}</h3>
            <p>{blog.summary}</p>
            <img src={blog.image} alt='' />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default BlogList;
