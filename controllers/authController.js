const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, savy, phoneNumber } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const type = savy ? "jobSeeker" : "mentor";

  const newUser = new User({
    firstName,
    lastName,
    email,
    accountType: type,
    phoneNumber,
    password: hash,
  });
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({ message: "user created" });
    }
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.status(500).send(err);
    else {
      if (user == null) res.status(201).json({ message: "user not found" });
      else {
        bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
          if (error || !isMatch)
            res.status(406).json({ message: "password not match" });
          else {
            const token = jwt.sign({ id: user._id }, "process.env.JSON_TOKEN");
            res.status(200).json({ token: token, user: user });
          }
        });
      }
    }
  });
};

exports.getUserByToken = (req, res) => {
  const idTokenDecoded = jwt.verify(req.body.token, "process.env.JSON_TOKEN");
  User.findOne({ _id: idTokenDecoded.id }, (err, user) => {
    if (err) res.status(500).send(err);
    else {
      if (user == null) res.status(201).json({ message: "user not found" });
      else {
        const token = jwt.sign({ id: user._id }, "process.env.JSON_TOKEN");
        res.status(200).json({ user: user });
      }
    }
  });
};
