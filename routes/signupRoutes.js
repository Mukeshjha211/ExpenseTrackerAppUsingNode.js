const express = require('express');

const signupControllers = require('../Controller/signupController');

const router = express.Router();

router.post('/signup', signupControllers.SignupUsers)
router.post('/login', signupControllers.loginUsers)

module.exports = router;