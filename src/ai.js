/**
 *
 * @param {string[]} ingredients
 * @returns {Promise<string>}
 */
export async function getRecipeFromGemini(ingredients) {
  if (!ingredients.length) return "No ingredients provided.";


  const res = await fetch ('http://localhost:8000/api/recipe', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({ingredients})
  })


    if (!res.ok)
    {
      const { error } = await res.json()
      throw new Error(error || 'Failed to fetch recipe')
    }


    const { recipe } = await res.json()
    return recipe
  }
