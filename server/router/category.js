const express = require('express');
const { categoryController } = require('../controller/index');

const router = express.Router();

// * /category
router.get('/', categoryController.getAll);

module.exports.categoryRouter = router;
