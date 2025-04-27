import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function SignUpForm({ onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState({
    cuisine: '',
    dishType: '',
    allergens: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const allergensArray = preferences.allergens
        .split(',')
        .map((a) => a.trim())
        .filter((a) => a.length > 0);

      const res = await api.post('/auth/signup', {
        email,
        password,
        preferences: {
          cuisine: preferences.cuisine,
          dishType: preferences.dishType,
          allergens: allergensArray,
        },
      });
      onSignUp(res.data.token);
      navigate('/recipes');
    } catch (err) {
      setError(err.response?.data?.msg || 'Sign up failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="block mb-2">
          Preferred Cuisine:
          <input
            type="text"
            name="cuisine"
            className="w-full p-2 border rounded mt-1"
            value={preferences.cuisine}
            onChange={handleChange}
          />
        </label>
        <label className="block mb-2">
          Preferred Dish Type:
          <input
            type="text"
            name="dishType"
            className="w-full p-2 border rounded mt-1"
            value={preferences.dishType}
            onChange={handleChange}
          />
        </label>
        <label className="block mb-4">
          Allergens (comma separated):
          <input
            type="text"
            name="allergens"
            className="w-full p-2 border rounded mt-1"
            value={preferences.allergens}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignUpForm;
