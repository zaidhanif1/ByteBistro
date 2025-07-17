import bcrypt from 'bcrypt'
import { pool } from '../config/database.js'

export const login = async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
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



    res.status(200).json({message: "Login Successful", user: user.id})
  } catch(error)
  {
    console.error('Login error:', error);
    res.status(500).json({error: "Something went wrong, please try again."})
  }
}
