const express = require('express');

const professionalController = require('../controllers/professional');

const router = express.Router();


router.get('/', professionalController.getData);
router.get('/:id', professionalController.getDataById);
router.post('/',professionalController.createData);
router.put('/:id', professionalController.updateData);
router.delete('/:id', professionalController.deleteData);

module.exports = router;