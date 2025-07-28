const router = require("express").Router();

const {Login, SignUp,LogOut} = require("../controller/auth.controller.js");

router.post("/login",Login);
router.post("/signup",SignUp);
router.post("/logout",LogOut);
module.exports = router;