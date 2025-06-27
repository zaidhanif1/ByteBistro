import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { apiRouter } from './routes/apiRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())

const allowed = process.env.ALLOWED_ORIGINS.split(',').map(wesbite => wesbite.trim())
app.use(cors({
      origin: (origin, callBack) => {
        if (!origin || allowed.includes(origin))   return callBack(null, true); 
           
        console.log('DENIED', origin)    
        const corsError = new Error("CORS: origin not allowed: " + origin) 
        callBack(corsError, false)          
      },
      methods: ['GET', 'POST', 'OPTIONS'],               
    }))

// Routes
app.use('/api', apiRouter)

app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})

app.listen(PORT, () => console.log(`Server connected on port: ${PORT}!`))