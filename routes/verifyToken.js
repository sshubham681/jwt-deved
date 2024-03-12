import Jwt from 'jsonwebtoken'

function verifyToken(req, res, next){
  const token = req.header('auth-token')
  if(!token) return res.status(401).send('Access Denied')

  try {
    const verified = Jwt.verify(token, process.env.TOEKN_SECRET)
    req.user = verified;
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}

export default verifyToken