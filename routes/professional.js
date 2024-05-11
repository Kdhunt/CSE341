const express = require('express');

const professionalController = require('../controllers/professional');
const validator = require('../valodation/contact-validator');

const router = express.Router();


router.get('/', professionalController.getData);
router.get('/:id', validator.checkCreateCreateDataRules(),  professionalController.getDataById);
router.post('/',validator.checkCreateCreateDataRules(), professionalController.createData);
router.put('/:id', validator.checkUpdateContactValidationRules(), professionalController.updateData);
router.delete('/:id', validator.checkCreateCreateDataRules(), professionalController.deleteData);

module.exports = router;