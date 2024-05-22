const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
      title: 'an api',
      description: 'woot',
    },
    host: 'cse341-0mym.onrender.com:8080',
    schemes: ['https'],
  };

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);