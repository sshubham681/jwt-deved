import { Router } from "express";
import verifyToken from './verifyToken.js'
const router = Router();

router.get('/', verifyToken, (req, res) =>{
  res.json({
    posts: {
      title: 'My first Post',
      description: "Random data shouldn't be allowed"
    }
  })
})

export default router