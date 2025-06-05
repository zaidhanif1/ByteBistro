/**
 * Call the backend API to get a recipe from ingredients
 * @param {string[]} ingredients
 * @returns {Promise<string>}
 */
export async function getRecipeFromGemini(ingredients) {
  if (!ingredients.length) return "No ingredients provided.";

  try {
    // Use Netlify Functions for production, localhost for development
    const apiUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:8000/recipe'
      : '/api/recipe-cjs';
    
    console.log('🐛 Debug - Hostname:', window.location.hostname);
    console.log('🐛 Debug - API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate recipe');
    }

    const data = await response.json();
    return data.recipe;
  } catch (error) {
    console.error('Error calling recipe API:', error);
    return "Sorry, I couldn't generate a recipe right now. Please try again later.";
  }
}
