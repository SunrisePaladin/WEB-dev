const express = require('express');

const {router: exportRouter} = require('./express.js');
const {errLog: errCatch} = require('./Middlewares/errCatcher.js');

const hostname = "127.0.0.1";
const port = 5500;
const app = express();

//В запросе: пароль с минимальной длинной 8 символов
//В ответе: все документы, но без самого пароля, а имя и _id

app.listen(port, () => {
    console.log(`The app is listening on port ${port} and host ${hostname}`);
})

//app.use(express.static('./public'));
app.use('/Exam', exportRouter);
app.use(errCatch);

app.get('/', (req, res) => {
    res.status(200).send('Main page!');
});
app.get('/coding', (req, res) => {     
    res.json({         
        message: 'Happy Coding',
        status: '200'    
    }); 
});

app.use((req, res) => {
    res.status(404);
    res.send("bad request");
});