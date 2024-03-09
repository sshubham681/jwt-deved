import { Router } from "express";
import { User } from "../models/user.model.js";
import Joi from "@hapi/joi";

const router = Router();

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  // Validate the data before we make a User
  const validation = schema.validate(req.body);
  res.send(validation);

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
