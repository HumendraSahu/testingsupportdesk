const express = require('express');
const { checkAnyUser } = require('../controllers/userController');

const router = express.Router();

router.get('/users/exist', checkAnyUser);

module.exports = router;
