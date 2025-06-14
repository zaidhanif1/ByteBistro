/**
 *
 * @param {string[]} ingredients
 * @returns {Promise<string>}
 */
export async function getRecipeFromGemini(ingredients) {
  if (!ingredients.length) return "No ingredients provided.";
  const API_BASE = import.meta.env.MODE==='development' ? 'http://localhost:8000' : 'bytebistro-production.up.railway.app';

  const res = await fetch (`${API_BASE}/api/recipe`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
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
