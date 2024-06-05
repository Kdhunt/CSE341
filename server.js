const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const approute = require('./routes');
const session = require('express-session')
const db = require('./database/mongodb');
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy; 
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
.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  }))
.use(passport.initialize())
.use(passport.session())
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
})

app.use('/', approute);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUBCLIENTID,
    clientSecret: process.env.GITHUBCLIENTSECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    //User.indOrCreate({githubId: profile.id}, function(err, user) {
      return done(null, profile)
    // });
  }))
    
  passport.serializeUser((user, done) => {
    done(null, user)
  });
  passport.deserializeUser((user, done) => {
    done(null, user)
  });
  
  app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: "please login")
  });

  app.get('/oauth-callback', passport.authenticate('github',{
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
      req.session.user = req.user;
      res.redirect('/');
    })
  process.on('uncaughtException', (err, origin) => {
      console.log(process.stderr.fd, `Caught exception ${err}\n` + `exception origin: ${origin}`);
  })   

db.initDb((err, mongodb ) => {
if (err) {
console.log(err);
} else {
app.listen(port);
console.log(`Server is running on port ${port}`);
}
});