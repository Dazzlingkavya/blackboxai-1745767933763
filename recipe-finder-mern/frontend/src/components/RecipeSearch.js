import React, { useState, useEffect } from 'react';
import api from '../api';
import RecipeCard from './RecipeCard';

function RecipeSearch({ token }) {
  const [cuisine, setCuisine] = useState('');
  const [dishType, setDishType] = useState('');
  const [allergens, setAllergens] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    setError('');
    try {
      const params = {};
      if (cuisine) params.cuisine = cuisine;
      if (dishType) params.dishType = dishType;
      if (allergens) params.excludeAllergens = allergens;

      const res = await api.get('/recipes', {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(res.data);
    } catch (err) {
      setError('Failed to fetch recipes');
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
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
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Search Recipes</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSearch} className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Cuisine (e.g., South Indian)"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Dish Type (e.g., Gravy)"
          value={dishType}
          onChange={(e) => setDishType(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Exclude Allergens (comma separated)"
          value={allergens}
          onChange={(e) => setAllergens(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
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

export default RecipeSearch;
