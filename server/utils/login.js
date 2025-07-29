import bcrypt from 'bcrypt'
import { pool } from '../config/database.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const {email, password} = req.body
  console.log(req.body)
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }
  
  
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }
  
  try {
    const result = await pool.query(
      'SELECT * from users WHERE email = $1', 
      [email]
    )
    const user = result.rows[0];
    console.log(user)

    if(!user || !(await bcrypt.compare(password, user.password_hash)))
    {
      return res.status(400).json({error : 'Invalid email or password'})
    }

    // Create JWT token for successful login
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: "Login Successful", 
      userId: user.id,
      token: token
    })
  } catch(error)
  {
    console.error('Login error:', error);
    res.status(500).json({error: "Something went wrong, please try again."})
  }
}
