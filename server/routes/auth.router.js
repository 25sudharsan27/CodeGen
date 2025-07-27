const router = require("express").Router();

const {Login, SignUp} = require("../controller/auth.controller.js");

router.post("/login",Login);
router.post("/signup",SignUp);

module.exports = router;