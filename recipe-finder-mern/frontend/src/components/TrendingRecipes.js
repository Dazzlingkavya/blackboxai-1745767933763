import React, { useEffect, useState } from 'react';
import api from '../api';
import RecipeCard from './RecipeCard';

function TrendingRecipes({ token }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('views');

  useEffect(() => {
    const fetchTrending = async () => {
      setError('');
      try {
        const res = await api.get('/recipes', {
          params: { },
          headers: { Authorization: `Bearer ${token}` },
        });
        let sortedRecipes = res.data;
        if (sortBy === 'views') {
          sortedRecipes = sortedRecipes.sort((a, b) => b.views - a.views);
        } else if (sortBy === 'name') {
          sortedRecipes = sortedRecipes.sort((a, b) => a.name.localeCompare(b.name));
        }
        setRecipes(sortedRecipes.slice(0, 10));
      } catch (err) {
        setError('Failed to fetch trending recipes');
      }
    };
    fetchTrending();
  }, [token, sortBy]);

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
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Trending Recipes</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="views">Most Viewed</option>
          <option value="name">Name</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onShareWhatsApp={handleShareWhatsApp}
            onShareEmail={handleShareEmail}
          />
        ))}
      </div>
    </div>
  );
}

export default TrendingRecipes;
