const express = require("express")
const router = new express.Router() 
const baseController = require('../controllers/baseController');
const swaggerRoute = require('./swagger');
const chipsRoute = require('./chips'); 
const usersRoute = require('./users');
const contactRoute = require('./professional');  

// router.get("/", baseController.JeffRoute)
// router.get("/leighton", baseController.LeightonRoute)
// router.get("/carter", baseController.CarterRoute)
// router.get("/calder", baseController.CalderRoute)
// router.get("/decker", baseController.DeckerRoute)
// router.get("/grayson", baseController.GraysonRoute)
// router.get("/rylan", baseController.RylanRoute)
// router.get("/griffin", baseController.GriffinRoute)


router.use('/', swaggerRoute);
router.use('/users', usersRoute);
router.use('/chips', chipsRoute);
router.use('/profession', contactRoute);


module.exports = router;