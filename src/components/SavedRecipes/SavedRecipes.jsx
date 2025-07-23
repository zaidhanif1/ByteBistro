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
    const [token, setToken] = useState(null);

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

    useEffect(() => {
        // Get token from localStorage
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const createImage = async (recipeId) => {
        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ recipe_id: recipeId }),
            });
            
            if (!response.ok) {
                throw new Error(`Image generation failed: ${response.status}`);
            }
            
            const data = await response.json();
            return data.imageUrl;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchRecipesAndImages = async () => {
            if (recipes.length > 0 && token) {
                const updatedRecipes = await Promise.all(
                    recipes.map(async (recipe) => {
                        try {
                            const imageUrl = await createImage(recipe.id);
                            return { ...recipe, imageUrl };
                        } catch (error) {
                            console.error(`Failed to generate image for recipe ${recipe.id}:`, error);
                            return { ...recipe, imageUrl: null };
                        }
                    })
                );
                setRecipes(updatedRecipes);
            }
        };

        fetchRecipesAndImages();
    }, [recipes.length > 0 && token ? recipes.map(r => r.id).join(',') : '', token]);

    function RecipeCard({ recipe }) {
        const [imageUrl, setImageUrl] = useState(recipe.imageUrl || '')
        useEffect(() => {
            if(!imageUrl && token) {
                createImage(recipe.id).then(setImageUrl);
            }
        }, [recipe.id, imageUrl, token]);

        return (
            <div className='recipe-card'>
                {imageUrl && <img src={imageUrl} alt={recipe.title} />}
                <h3>{recipe.title}</h3>
            </div>
        )
    }

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
                <button className = 'back-button' onClick={() => setSelectedRecipe(null)}>←</button>
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
                <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
            <Link to = '/main' className = 'generate-more-recipes'>Generate more recipes</Link>
        </div>
    );
}