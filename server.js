const express = require('express');
const bodyParser = require('body-parser');
const approute = require('./routes/approute');
const db = require('./database/mongodb');
const professionalRoutes = require('./routes/professional');
const app = express();

//Middleware

app
.use(bodyParser.json())
.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
next();
})
.use('/professional', professionalRoutes);

db.initDb((err, mongodb ) => {
if (err) {
console.log(err);
} else {
app.listen(3000);
}
});