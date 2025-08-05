import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookReview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📚 Book Reviews</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-700 mt-2">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BookReview;
