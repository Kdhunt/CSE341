
const killmenow = require('../database/mongodb');

const baseController = {}

baseController.JeffRoute = (req, res) => {
  res.send("Jeffrey's Favorite Quote: Welcome to the Dark Side! We have cookies.");
}
baseController.LeightonRoute = (req, res) => {
    res.send("Leighton's Favorite Quote: Go for the eyes Boo!!.");
  }
  baseController.CarterRoute = (req, res) => {
    res.send("Carter's Favorite Quote: <Dramatic eyeroll>");
  }
  baseController.CalderRoute = (req, res) => {
    res.send("Calder's Favorite Quote: The only place like home is pie.");
  }
  baseController.DeckerRoute = (req, res) => {
    res.send("Decker's Favorite Quote: The darkness hates you, but it needs you.");
  }
  baseController.GraysonRoute = (req, res) => {
    res.send("Decker's Favorite Quote: Cya in the millenium!");
  }
  baseController.RylanRoute = (req, res) => {
    res.send("Rylan's Favorite Quote: Wheee!.");
  }
  baseController.GriffinRoute = (req, res) => {
    res.send("Griffin's Favorite Quote: The cake is a lie.");
  }

module.exports = baseController
