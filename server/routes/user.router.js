const router = require("express").Router();
const {getSessions,getchat, handlePrompt,deleteSession} = require("../controller/user.controller");
const authUser = require("../middleware/userAuth");


router.get('/getsessions',authUser,getSessions);
router.get('/getchat/:sessionId',authUser,getchat);
router.delete('/session/:sessionId',authUser,deleteSession);

router.post('/prompt',authUser,handlePrompt);


module.exports = router;