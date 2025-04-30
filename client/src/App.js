import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [jokesByCategory, setJokesByCategory] = useState([]);
  const [formData, setFormData] = useState({ category: '', setup: '', delivery: '' });
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);

  const suggestedJokeAPIcategories = ['Programming', 'Misc', 'Pun', 'Spooky', 'Christmas'];

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:3000/jokebook/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories');
    }
  };

  const fetchRandomJoke = async () => {
    try {
      const res = await fetch('http://localhost:3000/jokebook/random');
      const data = await res.json();
      setJoke(data);
    } catch (err) {
      console.error('Failed to load random joke');
    }
  };

  const fetchJokesForCategory = async (category) => {
    if (!category) return;
    try {
      const res = await fetch(`http://localhost:3000/jokebook/joke/${category}`);
      if (!res.ok) throw new Error('Category not found');
      const data = await res.json();
      setSelectedCategory(category);
      setJokesByCategory(data);
      setError(null);
    } catch (err) {
      setError(`No jokes found for category: ${category}`);
      setJokesByCategory([]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { category, setup, delivery } = formData;
    if (!category || !setup || !delivery) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/jokebook/joke/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to add joke');

      const updatedJokes = await res.json();
      setJokesByCategory(updatedJokes);
      setSelectedCategory(category);
      setFormData({ category: '', setup: '', delivery: '' });
      setError(null);
    } catch (err) {
      alert('Error adding joke');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRandomJoke();
  }, []);

  return (
    <div className="container">
      <h1>Jokebook 😂</h1>

      <div className="section">
        <h2>🎲 Random Joke</h2>
        {joke && (
          <div className="joke-box">
            <p><strong>Setup:</strong> {joke.setup}</p>
            <p><strong>Delivery:</strong> {joke.delivery}</p>
            <button onClick={fetchRandomJoke}>Get Another</button>
          </div>
        )}
      </div>

      <div className="section">
        <h2>📚 Categories</h2>

        <div className="category-list">
          {categories.map((cat, i) => (
            <button key={i} onClick={() => fetchJokesForCategory(cat)}>{cat}</button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); fetchJokesForCategory(searchInput); }}>
          <input
            type="text"
            placeholder="Search category..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div style={{ marginTop: '0.5rem' }}>
          <p><em>💡 Try searching:</em> {suggestedJokeAPIcategories.join(', ')}</p>
        </div>

        {selectedCategory && <h3>Jokes in: {selectedCategory}</h3>}
        {error && <p className="error">{error}</p>}
        {jokesByCategory.map((j, i) => (
          <div key={i} className="joke-item">
            <p><strong>Setup:</strong> {j.setup}</p>
            <p><strong>Delivery:</strong> {j.delivery}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>➕ Add a New Joke</h2>
        <form onSubmit={handleFormSubmit} className="joke-form">
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Setup"
            value={formData.setup}
            onChange={(e) => setFormData({ ...formData, setup: e.target.value })}
          />
          <input
            type="text"
            placeholder="Delivery"
            value={formData.delivery}
            onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
          />
          <button type="submit">Submit Joke</button>
        </form>
      </div>
    </div>
  );
}

export default App;
