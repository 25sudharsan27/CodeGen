const router = require("express").Router();
const {getSessions,getchat, handlePrompt} = require("../controller/user.controller");
const authUser = require("../middleware/userAuth");

router.get('/getsessions',authUser,getSessions);
router.get('/getchat/:sessionId',authUser,getchat);

router.post('/prompt',authUser,handlePrompt);

module.exports = router;