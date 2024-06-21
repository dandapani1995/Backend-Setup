const express = require('express');
const router = express.Router();


const authRouter = require('../routes/auth.route');
const userRouter = require('../routes/user.route');

router.use('/auth',authRouter);
router.use('/user',userRouter);

module.exports = router;