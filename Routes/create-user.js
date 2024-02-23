const express = require("express");
const route = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const jwt_secret="asdasfw#$343429(&^&%%";

route.post(
  "/create-user",[
  body("email").isEmail(),
  body("password", "must contain atleast 5 characters").isLength({ min: 5 })],
  body("name").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });
      res.json({ success: true });
    } catch (err) {
      res.json({ success: false });
    }
  }
);


route.post(
  "/login",
  body("password", "must contain atleast 5 characters").isLength({ min: 5 }),
  body("email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;

    try {
      let user_email = await User.findOne({ email });
      if (!user_email) {
        res.status(400).json({ errors: "Invalid email" });
      }
      const passcompare=await bcrypt.compare(req.body.password,user_email.password);
      if (!passcompare) {
        res.status(400).json({ errors: "Invalid password" });
      }

    const data={
        user:{
            id:user_email.id
        }
    }
        const authToken=jwt.sign(data,jwt_secret);
      return res.json({ success: true,authToken });
    } catch (err) {
      res.json({ success: false });
    }
  }
);

module.exports = route;
