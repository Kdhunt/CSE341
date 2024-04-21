const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.send("Welcome to the Dark Side! We have cookies.");
});
 

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});