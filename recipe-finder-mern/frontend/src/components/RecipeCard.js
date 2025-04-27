import React from 'react';

function RecipeCard({ recipe, onShareWhatsApp, onShareEmail }) {
  return (
    <div className="bg-white rounded shadow p-4 m-2 max-w-sm">
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-48 object-cover rounded"
        />
      )}
      <h3 className="text-xl font-semibold mt-2">{recipe.name}</h3>
      <p className="text-gray-600">
        Cuisine: {recipe.cuisine} | Dish Type: {recipe.dishType}
      </p>
      <p className="text-gray-600">Allergens: {recipe.allergens.join(', ') || 'None'}</p>
      <p className="mt-2">{recipe.instructions}</p>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => onShareWhatsApp(recipe)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
          Share WhatsApp
        </button>
        <button
          onClick={() => onShareEmail(recipe)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Share Email
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
