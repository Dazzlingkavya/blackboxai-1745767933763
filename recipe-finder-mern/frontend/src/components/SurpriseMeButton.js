import React, { useState } from 'react';
import api from '../api';
import RecipeCard from './RecipeCard';

function SurpriseMeButton({ token }) {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  const handleSurpriseMe = async () => {
    setError('');
    try {
      const res = await api.get('/recipes/random', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipe(res.data);
    } catch (err) {
      setError('Failed to fetch a surprise recipe');
    }
  };

  const handleShareWhatsApp = (recipe) => {
    const text = `Check out this recipe: ${recipe.name} - ${window.location.origin}/recipes/${recipe._id}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareEmail = (recipe) => {
    const subject = `Recipe: ${recipe.name}`;
    const body = `Check out this recipe: ${recipe.name}\n\nInstructions:\n${recipe.instructions}\n\nLink: ${window.location.origin}/recipes/${recipe._id}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow mt-6 text-center">
      <button
        onClick={handleSurpriseMe}
        className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
      >
        Surprise Me
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {recipe && (
        <div className="mt-6">
          <RecipeCard
            recipe={recipe}
            onShareWhatsApp={handleShareWhatsApp}
            onShareEmail={handleShareEmail}
          />
        </div>
      )}
    </div>
  );
}

export default SurpriseMeButton;
