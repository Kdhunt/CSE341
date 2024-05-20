const express = require('express');

const professionalController = require('../controllers/professional');
const validator = require('../middleware/contact-validator');
const utils = require('../utilities');

const router = express.Router();

router.get('/', utils.handleErrors(professionalController.getData));
router.get('/:id', utils.handleErrors(professionalController.getDataById));
router.post('/', validator.saveData, professionalController.createData);
router.put('/:id', validator.saveData, utils.handleErrors(professionalController.updateData));
router.delete('/:id',  utils.handleErrors(professionalController.deleteData));

module.exports = router;