import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => {
        setBlogs(res.data);
      })
      .catch(err => {
        console.error('Error fetching blogs:', err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 All Blog Posts</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">No blogs found.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map(blog => (
            <div
              key={blog._id}
              className="p-6 border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2 text-indigo-600">
                {blog.title}
              </h2>
              <p className="text-gray-800 whitespace-pre-line">{blog.content}</p>
              <p className="text-sm text-gray-500 mt-3">
                🕒 Posted on: {new Date(blog.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
