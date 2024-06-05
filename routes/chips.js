const express = require('express');

const controller = require('../controllers/chips');
const validator = require('../middleware/chips-validator');
const {isAuthenticated} = require('../middleware/authenticate');
const utils = require('../utilities');

const router = express.Router();


router.get('/', controller.getData);
router.get('/:id', controller.getDataById);
router.post('/', isAuthenticated, validator.saveData, controller.createData);
router.put('/:id', isAuthenticated, validator.saveData, controller.updateData);
router.delete('/:id', isAuthenticated, controller.deleteData);

module.exports = router;