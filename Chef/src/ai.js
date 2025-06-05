/**
 * Call the backend API to get a recipe from ingredients
 * @param {string[]} ingredients
 * @returns {Promise<string>}
 */
export async function getRecipeFromGemini(ingredients) {
  if (!ingredients.length) return "No ingredients provided.";

  try {
    const response = await fetch('http://localhost:8000/recipe', {
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
