import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader ? authHeader.split(' ')[1] : null

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET environment variable is not set')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' })
    }
    console.log(decodedPayload)
    req.user = decodedPayload
    next()
  })
} 

