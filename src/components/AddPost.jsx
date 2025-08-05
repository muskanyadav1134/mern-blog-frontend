import React, { useState } from 'react';
import axios from 'axios';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/posts', { title, content });
    setTitle('');
    setContent('');
    alert('Post Added!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">✍️ Add a New Review</h2>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
        required
      />
      <textarea
        placeholder="Write your review..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border mb-3 rounded h-32"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>
    </form>
  );
};

export default AddPost;
