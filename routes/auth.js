import { Router } from "express";
import { User } from "../models/user.model.js";
import {registerValidation, loginValidation} from "../validation.js"
import bcrypt from "bcryptjs"
const router = Router();


// Register a user
router.post("/register", async (req, res) => {
  // Validate the data before we make a User
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  // checking if user already exist in db
  const userExisted = await User.findOne({ email: req.body.email})
  if(userExisted) return res.status(400).send("User already exist")

  // Hash the password 
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  // create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({user: user._id});
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', async(req, res) => {
  // Validate the data
  const {error} = loginValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  // checking if the email exist
  const user = await User.findOne({ email: req.body.email})
  if(!user) return res.status(400).send("User doesn't exist")

  // if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.status(400).send('Invalid Password')

  res.send('Logged in')

})

export default router;
