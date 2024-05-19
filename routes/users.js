const express = require('express');

const controller = require('../controllers/users');
const validator = require('../middleware/users-validator');
const utils = require('../utilities');

const router = express.Router();


router.get('/', controller.getData);
router.get('/:id', utils.handleErrors(controller.getDataById));
router.post('/', validator.saveData, utils.handleErrors(controller.createData));
router.put('/:id', validator.saveData, utils.handleErrors(controller.updateData));
router.delete('/:id',  utils.handleErrors(controller.deleteData));

module.exports = router;