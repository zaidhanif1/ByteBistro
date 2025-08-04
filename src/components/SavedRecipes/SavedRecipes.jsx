import './SavedRecipes.css'
import React, { useEffect, useState } from 'react';
import { apiCall } from '../../utils/api.js';
import ReactMarkdown from 'react-markdown';
import Cooking from '../../assets/orange-cooking.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ByteBistro from '../ByteBistro/ByteBistro'

export default function SavedRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);



//--------- load recipes from DB ---------
    async function fetchRecipes() {
        setLoading(true);
        setError(null);
        try {
            const data = await apiCall('/saved-recipes', { method: 'GET' });
            setRecipes(data.recipes );
        } catch (err) {
            setError(err.message || 'Failed to fetch saved recipes');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, []);
    console.log(recipes)


               useEffect(() => {
        const generateImages = async () => {
            const needToGen = recipes.filter(recipe => !recipe.imageurl);
                console.log('Recipes needing images:', needToGen.length);
            
            if (needToGen.length === 0) return;
            
            for (const recipe of needToGen) {
                try {
                    const data = await apiCall('/generate-image', {
                        method: 'POST',
                        body: JSON.stringify({ recipe_id: recipe.id })
                    });
                    
                } catch (error) {
                    console.error('Failed to generate image for recipe:', recipe.id, error);
                }
            }
        };
        
        if (recipes.length > 0) {
            generateImages();
        }
    }, [recipes.length]);




//--------- delete recipe ---------
    async function handleDelete(recipeid) {
        try {
            await apiCall(`/images/${recipeid}`, { method: 'DELETE' });
            await apiCall(`/saved-recipes/${recipeid}`, { method: 'DELETE' });
            
            setSelectedRecipe(null);
            setRecipes(recipes.filter(recipe => recipe && recipe.id !== recipeid));
        } catch (err) {
            alert(`Failed to delete recipe: ${err.message}`);
        }
    }


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
                {recipe.imageurl ? (
                    <img 
                        src={recipe.imageurl} 
                        className='recipe-img' 
                        alt={recipe.title}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <p style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', gap: '1rem' }}>
                        Generating image...<span className='loader'></span>
                    </p>
                )}
                <h3>{recipe.title}</h3>
            </div>
        )
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
        <motion.div
        initial = {{ opacity : 0 }}
        animate = {{ opacity: 1 }}
        exit= {{ opacity : 0}}
        transition={{duration : 1.3}}
        >
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
            <ByteBistro

            savedRecipes = {recipes}
            />
            
            <Link to = '/main' className = 'generate-more-recipes'>Generate more recipes</Link>
        </div>
        </motion.div>
    );
}