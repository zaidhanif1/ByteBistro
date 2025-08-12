import './SavedRecipes.css'
import React, { useEffect, useState } from 'react';
import { apiCall, API_BASE } from '../../utils/api.js';
import ReactMarkdown from 'react-markdown';
import Cooking from '../../assets/orange-cooking.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ByteBistro from '../ByteBistro/ByteBistro'

export default function SavedRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null);



//--------- load recipes from DB ---------
    async function fetchRecipes() {
        try {
            const data = await apiCall('/saved-recipes', { method: 'GET' });
            setRecipes(data.recipes );
        } catch (err) {
            console.error(err || 'Failed to fetch saved recipes');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchRecipes();
    }, [])
        
    


//--------- delete recipe function ---------
    async function handleDelete(recipe, userId) {
        try {
            await apiCall(`/saved-recipes/${recipe.id}`, { method: 'DELETE' });
            
            setSelectedRecipe(null);
            setRecipes(recipes.filter(currentRecipe => currentRecipe && currentRecipe.id !== recipe.id));
        } catch (err) {
            alert(`Failed to delete recipe: ${err.message}`);
        }
        
    }



    if (loading) return <div className="loading-div"><span className='loader'></span></div>;

    if (selectedRecipe) { 
        return (
            
            <div className="saved-recipe-display">
                <button className = 'back-button' onClick={() => setSelectedRecipe(null)}>←</button>
                <ReactMarkdown>{selectedRecipe.content}</ReactMarkdown>
            </div>
        );
    }
    return (
        <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
>
    <div className="saved-recipes-container">
        <div className='saved-recipes-header'>
            <h1>Saved Recipes</h1>
            <img src={Cooking} alt="ByteBistro Cooking" className='bistro-cooking' />
        </div>
        
            {recipes.length ? (
                <div className="recipes-grid">
                    {recipes.map(currentRecipe => (
                        <div key={currentRecipe.id} className='recipe-card' onClick={() => setSelectedRecipe(currentRecipe)}>
                            <button 
                                className="delete-recipe-btn" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm(`Are you sure you want to delete "${currentRecipe.title}"?`)) {
                                        handleDelete(currentRecipe, currentRecipe);
                                    }
                                }}
                                title="Delete recipe"
                            >
                                ✕
                            </button>

                            {currentRecipe.imageUrl ? (
                                <img 
                                    src={`${API_BASE}${currentRecipe.imageUrl}`} 
                                    className='recipe-img' 
                                    alt={currentRecipe.title}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <p style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', gap: '1rem' }}>
                                    Generating image...<span className='loader'></span>
                                </p>
                            )}
                            <h3>{currentRecipe.title}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='no-saved-recipes'>No saved recipes yet.</p>
            )
        }

            <ByteBistro
            savedRecipes = {recipes}
            />
            <Link to = '/main' className = 'generate-more-recipes'>Generate more recipes</Link>
        </div>
        </motion.div>
    );
    
}