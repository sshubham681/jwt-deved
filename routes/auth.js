import { Router } from "express";
import { User } from "../models/user.model.js";
import {registerValidation} from "../validation.js"

const router = Router();



router.post("/register", async (req, res) => {
  // Validate the data before we make a User
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
