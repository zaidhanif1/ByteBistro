import { login } from './utils/login.js'
import { signup } from './utils/signup.js'
import { recipe } from './utils/recipe.js'
import express from 'express'

export const apiRouter = express.Router()

apiRouter.post('/recipe', recipe)
apiRouter.post('/signup', signup)
apiRouter.post('/login', login)
