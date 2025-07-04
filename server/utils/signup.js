import bcrypt from 'bcrypt'
import { pool } from '../config/database.js'

const saltRounds = 10;

export const signup = async (req, res) => {
const { email, password } = req.body

  
const hash = await bcrypt.hash(password, saltRounds)

try{
  const existingUser = await pool.query(
    'SELECT id FROM users WHERE email = $1', 
    [email]
  );
  if (existingUser.rows.length > 0) {
  return res.status(409).json({ error: 'Email already in use' });
}
  const result = await pool.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
    [email, hash]
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

}