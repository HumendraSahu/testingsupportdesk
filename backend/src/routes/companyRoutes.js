const express = require('express');
const { addCompany } = require('../controllers/companyController');

const router = express.Router();

router.post('/company', addCompany);

module.exports = router;
