import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import RecipeSearch from './components/RecipeSearch';
import TrendingRecipes from './components/TrendingRecipes';
import SurpriseMeButton from './components/SurpriseMeButton';
import ChatbotComponent from './components/ChatbotComponent';
import VoiceSearch from './components/VoiceSearch';

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token') || '');

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/recipes" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<SignUpForm onSignUp={handleLogin} />}
          />
          <Route
            path="/recipes"
            element={
              token ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="m-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                  <TrendingRecipes token={token} />
                  <RecipeSearch token={token} />
                  <SurpriseMeButton token={token} />
                  <ChatbotComponent />
                  <VoiceSearch />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
