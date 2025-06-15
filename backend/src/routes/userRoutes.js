const express = require('express');
const {
  registerAdmin,
  registerContact,
  registerAgent,
} = require('../controllers/user/registerController');

const router = express.Router();

router.post('/admin', registerAdmin);
router.post('/contact', registerContact);
router.post('/agent', registerAgent);

module.exports = router;
