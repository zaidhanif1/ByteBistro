import { login } from '../utils/login.js'
import { signup } from '../utils/signup.js'
import { recipe } from '../utils/recipe.js'
import { savedRecipe, getSavedRecipes, deleteSavedRecipe } from '../utils/savedRecipe.js'
import { authenticateToken } from '../utils/auth.js'
import { generateAndSaveImage } from '../utils/generateImages.js'
import express from 'express'

export const apiRouter = express.Router()

apiRouter.post('/recipe', recipe)
apiRouter.post('/signup', signup)
apiRouter.post('/login', login)
apiRouter.post('/saved-recipe', authenticateToken, savedRecipe)
apiRouter.get('/saved-recipes', authenticateToken, getSavedRecipes)
apiRouter.delete('/saved-recipes/:id', authenticateToken, deleteSavedRecipe);
apiRouter.post('/generate-image', generateAndSaveImage)
