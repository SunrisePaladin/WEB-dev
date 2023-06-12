const http = require('node:http');
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerOptions = {
//   definition:{
//     openapi: '3.0.2',
//   info: {
//     title: 'SWAGGER UI yaml',
//     version: '1.1'
//   },
//   servers: [
//     {
//       url: '/v3'
//     }
//   ],
//   tags: [
//       {
//         name: "user",
//         description: "Tampering with user credentials"
//       },
//       {
//         name: "models",
//         description: "Operations on models"
//       }
//     ]
//   },
//   apis: [
//     './openapi.yml'
//   ]
// }

// const swaggerDocs = swaggerJSDoc(swaggerOptions);
const openapi_json = require('./openapi.json');

const { router: exportRouterV1 } = require('./express');
const { router: exportRouterV2 } = require('./mongoDB');
const { router: exportRouterV3 } = require('./Models/models');
const {errLog: errCatch} = require('./Models/Errors/errCatcher');

const host = "127.0.0.1";
const port = 5501;
const app = express();

let corsOptions = {
    origin: 'http://127.0.0.1:5501',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.listen(port, () => {
    console.log(`The app is listening on port ${port} and host ${host}`);
})

//app.use(cors(corsOptions));
app.use(errCatch);
//app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(openapi_json));

app.get('/homepage', (req, res) => {
    res.statusCode = 200;
    res.send('Please use routes like "/v1" and so on to access the website');
});

app.use('/v1', exportRouterV1);
app.use('/v2', exportRouterV2);
app.use('/v3', exportRouterV3);

app.get('/coding', cors(corsOptions), (req, res) => {     
        res.json({         
        message: 'Happy Coding'    
    }); 
});

app.all('/', (req, res) => {
    res.statusCode = 200;
    res.redirect('/homepage');
});


app.use((req, res) => {
    res.status(404);
    res.send("bad request");
});

