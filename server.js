import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { Pool } from 'pg'
import { GoogleGenerativeAI } from '@google/generative-ai'


dotenv.config()
const app = express()
app.use(express.json())
const pool = new Pool
({
  connectionString: process.env.DATABASE_URL,
})


const allowed = process.env.ALLOWED_ORIGINS.split(',').map(wesbite => wesbite.trim())
console.log('CORS whitelist', allowed)
app.use(cors({
      origin: (origin, callBack) => {
        if (!origin || allowed.includes(origin))   return callBack(null, true); 
           
        console.log('DENIED', origin)    
        const corsError = new Error("CORS: origin not allowed: " + origin) 
        callBack(corsError, false)          
      },
      methods: ['GET', 'POST', 'OPTIONS'],               
    })
  );
  

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const SYSTEM_PROMPT = 
`You are ByteBistro, a refined 
and inventive culinary chef. Given
a list of ingredients, craft a 
single, original recipe. Make it
elegant, imaginative, and grounded
in culinary technique. Only use the ingredients 
provided. If you feel an additional ingredient
could work well with provided ingredients, be sure to mention
it is optional. Write clearly
and concisely in markdown format. `


app.post('/api/recipe', async (req, res) => {
    const {ingredients} = req.body
    if (!Array.isArray(ingredients) || ingredients.length === 0)
    {
        return res.status(400).json({error: "No ingredients provided"})
    }


    try {
        const model = genAI.getGenerativeModel({model : 'gemini-1.5-flash'})
        const prompt = `${SYSTEM_PROMPT}\n Create a recipe using : ${ingredients.join(',')}`
        const result = await model.generateContent(prompt)
        const text = result.response.text()
        res.json({ recipe: text.trim()})  
    }
    catch (error)
    {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

app.post('/api/signup', async (req, res) =>{
const { email, password } = req.body
try{
  const result = await pool.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
    [email, password]
  )
  res.status(201).json({ message: 'User created', userId: result.rows[0].id })
}
catch (error) {
  console.error(error);
  if (error.code === '23505')
  {
    res.status(409).json({ error: 'Email already in use' });
    
  } else {
    res.status(500).json({ error: error.message || "Something went wrong. "})
  }
}

})

app.post('/api/login', async (req, res) => {
  const [logEmail, logPass] = req.body
  try {
    const result = await pool.query(
      'SELECT * from users WHERE email = $1', 
      [logEmail]
    )
    const user = result.rows[0];

    if(!user)
    {
      return res.status(400).json({error : 'Invalid email or password'})
    }
    if (user.password_hash !== logPass)
    {
      return res.status(400).json({error: "Invalid email or password"})
    }

    res.status(200).json({message: "Login Successful", user: user.id})
  } catch(error)
  {
    console.error("Error is " + error);
    res.status(500).json({error: "Something went wrong, please try again."})
  }
})


const PORT = process.env.PORT || 8000


app.listen(PORT, () => console.log(`Server connected on port: ${PORT}!`))