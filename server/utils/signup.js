import bcrypt from 'bcrypt'
import { pool } from '../config/database.js'
import jwt from 'jsonwebtoken'
const saltRounds = 10;

export const signup = async (request, response) => {
const { email, password } = request.body

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET environment variable is not set');
  return response.status(500).json({ error: 'Server configuration error' });
}
const hash = await bcrypt.hash(password, saltRounds)





try{
  const existingUser = await pool.query(
    'SELECT id FROM users WHERE email = $1', 
    [email]
  );
  if (existingUser.rows.length) {
  return response.status(409).json({ error: 'Email already in use' });
}
  const result = await pool.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
    [email, hash]
  )
  

  const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  
  response.status(201).json({ 
    message: 'User created', 
    userId: result.rows[0].id,
    token: token 
  })
}
catch (error) {
  console.error(error);
  response.status(500).json({ error: error.message || "Something went wrong. "})

}

}