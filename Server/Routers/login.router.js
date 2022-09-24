const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/login.controller')

router.post('/', loginController.checkLogin)

module.exports = router;