import bcrypt from 'bcrypt'
import { pool } from '../../config/database.js'

export const login = async (req, res) => {
  const {logEmail, logPass} = req.body

  try {
    const result = await pool.query(
      'SELECT * from users WHERE email = $1', 
      [logEmail]
    )
    const user = result.rows[0];
    console.log(user)

    if(!user || !(await bcrypt.compare(logPass, user.password_hash)))
    {
      return res.status(400).json({error : 'Invalid email or password'})
    }

console.log("Login attempt:", logEmail, logPass);
console.log("User found in DB:", user);

    res.status(200).json({message: "Login Successful", user: user.id})
  } catch(error)
  {
    res.status(500).json({error: "Something went wrong, please try again."})
  }
}
