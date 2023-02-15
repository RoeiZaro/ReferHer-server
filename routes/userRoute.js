const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserByToken,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/getUser", getUserByToken);

module.exports = router;
