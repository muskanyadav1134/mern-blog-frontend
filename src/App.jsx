import React, { useEffect, useState } from 'react';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [view, setView] = useState('login'); // 'login', 'signup', or 'blog'
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchBlogs = () => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error('Error fetching blogs:', err));
  };

  useEffect(() => {
    if (user) fetchBlogs();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newBlog = { title, content };

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        const savedBlog = await response.json();
        setBlogs([savedBlog, ...blogs]);
        setTitle('');
        setContent('');
      } else {
        console.error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password) {
      alert('Signup successful. Please login.');
      setEmail('');
      setPassword('');
      setView('login');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ email });
      setEmail('');
      setPassword('');
      setView('blog');
    }
  };

  return (
    <div className="App" style={{ padding: '30px', maxWidth: '700px', margin: 'auto', fontFamily: 'Arial' }}>
      {view === 'login' && (
        <div>
          <h2>🔐 Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
            />
            <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
          </form>
          <p style={{ marginTop: '10px' }}>
            Don't have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setView('signup')}>Signup</span>
          </p>
        </div>
      )}

      {view === 'signup' && (
        <div>
          <h2>📝 Signup</h2>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
            />
            <button type="submit" style={{ padding: '10px 20px' }}>Signup</button>
          </form>
          <p style={{ marginTop: '10px' }}>
            Already have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setView('login')}>Login</span>
          </p>
        </div>
      )}

      {view === 'blog' && user && (
        <>
          <h1 style={{ textAlign: 'center' }}>Welcome, {user.email}!</h1>
          <h2 style={{ textAlign: 'center' }}>📝 Blog Brew</h2>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>“Your Space. Your Stories. Just Brew It.”</h3>
          <button onClick={() => setView('login')} style={{ float: 'right', marginBottom: '10px' }}>Logout</button>

          <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
            <input
              type="text"
              placeholder="Enter Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            />
            <textarea
              placeholder="Enter Blog Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="5"
              style={{ padding: '10px', width: '100%', marginBottom: '10px', resize: 'vertical' }}
            />
            <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px' }}>
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </form>

          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} style={{
                border: '1px solid #ddd',
                padding: '15px',
                marginBottom: '15px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}>
                <h3 style={{ marginBottom: '5px' }}>{blog.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{blog.content}</p>
                <p style={{ fontSize: '12px', color: '#777', marginTop: '10px' }}>
                  🕒 {new Date(blog.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No blogs found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
