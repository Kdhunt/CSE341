const express = require("express")
const router = new express.Router() 
const baseController = require('../controllers/baseController')


router.get("/", baseController.JeffRoute)
router.get("/leighton", baseController.LeightonRoute)
router.get("/carter", baseController.CarterRoute)
router.get("/calder", baseController.CalderRoute)
router.get("/decker", baseController.DeckerRoute)
router.get("/grayson", baseController.GraysonRoute)
router.get("/rylan", baseController.RylanRoute)
router.get("/griffin", baseController.GriffinRoute)

module.exports = router;