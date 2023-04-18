const http = require('node:http');
const express = require('express');
const cors = require('cors');
const { router: exportRouterV1 } = require('./express');

const host = "127.0.0.1";
const port = 5501;
const app = express();

app.listen(port, () => {
    console.log(`The app is listening on port ${port} and host ${host}`);
})

app.use(cors());

app.get('/homepage', (req, res) => {
    res.statusCode = 200;
    res.send('Please use routes like "/v1" and so on to access the website');
});

app.use('/v1', exportRouterV1);

app.get('/coding', cors(), (req, res) => {     
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
    //res.redirect('http://127.0.0.1:5501/homepage');
});

