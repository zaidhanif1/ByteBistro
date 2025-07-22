import './SavedRecipes.css'
import React, { useEffect, useState } from 'react';
import { apiCall } from '../../utils/api.js';
import ReactMarkdown from 'react-markdown';
import Cooking from '../../assets/orange-cooking.png'
import { Link } from 'react-router-dom'

export default function SavedRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        async function fetchRecipes() {
            setLoading(true);
            setError(null);
            try {
                const data = await apiCall('/saved-recipes', { method: 'GET' });
                setRecipes(data.recipes || []);
            } catch (err) {
                setError(err.message || 'Failed to fetch saved recipes');
            } finally {
                setLoading(false);
            }
        }
        fetchRecipes();
    }, []);


    async function handleDelete(recipeid) {
        try {
            await apiCall(`/saved-recipes/${recipeid}`, { method: 'DELETE' });
            setSelectedRecipe(null);
            setRecipes(recipes => recipes.filter(r => r && r.id !== recipeid));
        } catch (err) {
            alert('Failed to delete recipe');
        }
    }



    if (loading) return <div className="loading-div"><span className='loader' ></span></div>;
    if (error) return <div className="saved-recipe-display"><p className="error-message">{error}</p></div>;

    if (selectedRecipe) { 
        return (
            <div className="saved-recipe-display">
                <button className = 'back-button' onClick={() => setSelectedRecipe(null)}>← </button>
                <ReactMarkdown>{selectedRecipe.content}</ReactMarkdown>
            </div>
        );
    }

    return (
        
        <div className="saved-recipes-container">
            <div className='saved-recipes-header'>
            <h1>Saved Recipes</h1>
            <img src={Cooking} alt="ByteBistro Cooking" className='bistro-cooking' />
            </div>
            {recipes.length === 0 && <p className='no-saved-recipes'>No saved recipes yet.</p>}
            <div className="recipes-grid">
                {recipes.map(recipe => (
                    <div
                        key={recipe.id}
                        className="recipe-card"
                        onClick={() => setSelectedRecipe(recipe)}
                        style={{ cursor: 'pointer', border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', margin: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <button className='delete-recipe-btn' onClick={e => {e.stopPropagation(); handleDelete(recipe.id)} }>🗑️</button>
                        <img src="#" alt="Recipe Icon"  />
                        <h3>{recipe.title}</h3>
                    </div>
                ))}
            </div>
            <Link to = '/main' className = 'generate-more-recipes'>Generate more recipes</Link>
        </div>
    );
}