import { useState, useEffect } from 'react';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    fetch('https://mern-blog-backend.onrender.com/api/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error('Failed to fetch blogs:', err));
  }, []);

  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content || !newBlog.author) return;

    try {
      await fetch('https://mern-blog-backend.onrender.com/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      setNewBlog({ title: '', content: '', author: '' });

      // Refresh blogs after posting
      const res = await fetch('https://mern-blog-backend.onrender.com/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Error creating blog:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 MERN Blog</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          name="title"
          placeholder="Title"
          value={newBlog.title}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newBlog.content}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          name="author"
          placeholder="Author"
          value={newBlog.author}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button type="submit">Create Blog</button>
      </form>

      <h2>📚 All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>
              <em>Author: {blog.author}</em>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
