const express = require('express');
const bodyParser = require('body-parser');
const approute = require('./routes/approute');
const ihatemylife = require('./database/poolofstupid');
const professionalRoutes = require('./routes/professional');
const app = express();

//Middleware - UG



ihatemylife.initDb((err, mongodb ) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(3000);
  }
});
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/professional', professionalRoutes);

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
