import { apiCall } from './utils/api.js'

export async function getRecipeFromGemini(ingredients) {
  if (!ingredients.length) return "No ingredients provided.";
  
  try {
    const { recipe } = await apiCall('/recipe', {
      method: 'POST',
      body: JSON.stringify({ingredients})
    });
    
    return recipe;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch recipe');
  }
}
