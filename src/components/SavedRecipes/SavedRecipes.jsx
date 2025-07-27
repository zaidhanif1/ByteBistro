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
        fetchRecipes();
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    
// functions ---------------------------------------------------------------------------------------------
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
    const createImage = async (recipeId) => {
        try {
            const data = await apiCall('/generate-image', {
                method: 'POST',
                body: JSON.stringify({ recipe_id: recipeId }),
            });
            return data.imageUrl;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    useEffect(() => {
        const loadImages = async () => {
            if (recipes.length > 0 && token) {
                    recipes.forEach(async (recipe) => {
                        if (!recipe.imageUrl) {
                            try{
                                const imageUrl = await createImage(recipe.id);
                                setRecipes(prev => prev.map(r => 
                                    r.id === recipe.id ? {...r, imageUrl} : r
                                ));
                            }catch(error) {
                                console.error(`Failed to generate image for recipe {recipe.id}`)
                                setRecipes(prev => prev.map(r => 
                                    r.id === recipe.id ? { ...r, imageUrl: null } : r
                                ));
                            }
                        }
                    }
                );
                setRecipes(updatedRecipes);
            }
        };

        loadImages();
    }, [recipes.length > 0 && token ? recipes.map(r => r.id).join(',') : '', token]);

    function RecipeCard({ recipe }) {
        const handleDeleteClick = (e) => {
            e.stopPropagation();
            if (window.confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
                handleDelete(recipe.id);
            }
        };

        return (
            <div className='recipe-card' onClick={() => setSelectedRecipe(recipe)}>
                <button 
                    className="delete-recipe-btn" 
                    onClick={handleDeleteClick}
                    title="Delete recipe"
                >
                    ✕
                </button>
                {recipe.imageUrl ? <img src={recipe.imageUrl} className = 'recipe-img' alt={recipe.title}/> : <p style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', gap: '1rem' }}>Generating image...<span className='loader'></span></p> }
                <h3>{recipe.title}</h3>
            </div>
        )
    }

    async function handleDelete(recipeid) {
        try {
         
            try {
                await apiCall(`/images/${recipeid}`, { method: 'DELETE' });
                console.log('Images deleted successfully');
            } catch (imageError) {
                console.warn('Failed to delete images:', imageError.message);
            }
            
            const response = await apiCall(`/saved-recipes/${recipeid}`, { method: 'DELETE' });
            console.log('Recipe deleted successfully');
            
            
            setSelectedRecipe(null);
            setRecipes(recipes => recipes.filter(r => r && r.id !== recipeid));
        } catch (err) {
            console.error('Delete error:', err);
            alert(`Failed to delete recipe: ${err.message}`);
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