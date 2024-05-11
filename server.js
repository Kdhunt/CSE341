const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const approute = require('./routes');
const db = require('./database/mongodb');
const professionalRoutes = require('./routes/professional');

//const graphqlHTTP = require('express-graphql');
//const schema = require('./database/schema')

const port = process.env.PORT|| 8080;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();


//Middleware

app
.use(bodyParser.json())
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
})

app.use('/', approute);
// app.use('/graphql', graphqlHTTP({
//     //directing express-graphql to use this schema to map out the graph 
//     schema,
//     //directing express-graphql to use graphiql when goto '/graphql' address in the browser
//     //which provides an interface to make GraphQl queries
//     graphiql:true
// }));
db.initDb((err, mongodb ) => {
if (err) {
console.log(err);
} else {
app.listen(port);
console.log(`Server is running on port ${port}`);
}
});