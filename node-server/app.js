const http = require('node:http')
const fs = require('fs');
let comments = ['comment 1', 'comment 2', 'comment 3', 'comment 4'];
const host = "127.0.0.1";
const port = 5500;
let serv_act_count = 0;
let resp_ans = 'undefined response';
let tableRows=[["Chrome Web Kit", "0"]];
var now = new Date();
let express = require('express');
let router = express();
let browser = require('browser-detect');

function generateHTMLTable(array) {
    let html = '<table border="1">';
    for (let i = 0; i < array.length; i++) {
        html += `<tr><td>${array[i][0]}</td><td>${array[i][1]}</td></tr>`;
    }
    html += '</table>';
    return html
}


const server = http.createServer((req, res) => {
    const my_html = 'index.html';
    if (req.url === '/' || req.url === '/homepage'){
        if (req.method === 'GET') {
            resp_ans = 'Hello GetWorld!';
            res.statusCode = 200;
            res.end(resp_ans);
        }
        else if (req.method === 'POST') {
            resp_ans = 'Hello PostWorld!';
            res.statusCode = 200;
            res.end(resp_ans);
        }
    }
    else if (req.url.includes('/register')){
        res.statusCode = 200;

        let user_agent = req.headers['user-agent'];
        let ua = browser(req.headers['user-agent']);
        console.log(ua);
        res.end(`User ${getAllUrlParams(req.url).id} registered!`);
        tableRows.push([ua.name+' '+ua.version, serv_act_count]);
        //tableRows.push([getAllUrlParams(req.url).id, getAllUrlParams(req.url).stat]);
        // console.log(`${resp_ans}\nYour status is - ${getAllUrlParams(req.url).stat}\nHello, user ${getAllUrlParams(req.url).id}\nYou have connected at ${now}`);
    }
    else if (req.url === '/comments'){
        res.statusCode = 200;
        console.log("I'm active");
        if (req.method === 'GET') {
            console.log(req.body);
            res.setHeader('Content-Type', 'application/json');
            res.end('advance in using GET method');
        }
        else if (req.method === 'POST') {
            let tree = "";
            req.on('data', (chunk) => {
                tree += chunk;
            });
            req.on('end', () => {
                comments.push(tree);
                console.log(comments);
                res.setHeader('Content-Type', 'text/html');
                res.end(JSON.stringify(comments));
            });
        }    
    }
    else if (req.url === '/stats'){
        res.statusCode = 200;
        if (req.method === 'GET'){
            res.setHeader('Content-Type', 'text/html');
            res.end(generateHTMLTable(tableRows));
        }
    }
    else {
        res.statusCode = 400;
        res.writeHead(200, {'Content-Type': 'text/html'});
        //fs.createReadStream('C:/проекты/WEB/WEB-dev/node-server/Styles/style.css');
        //let mygif = fs.createReadStream('C:/проекты/WEB/WEB-dev/node-server/Pic/sans-undertale-dance.gif');
        fs.createReadStream('C:/проекты/WEB/WEB-dev/node-server/index.html').pipe(res);
        //res.end(mygif);
    }
});


server.on("connection", () => {
    serv_act_count++;
    console.log(now);
    console.log("new connect");
});

server.on("request", () => {
    console.log("I've recieved a new request");
})

server.listen(port, host, () => {
    console.log("bububu");
    console.log(`Server running at http://${host}:${port}/`);
})

function getAllUrlParams(url) {
    // извлекаем строку из URL или объекта window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // объект для хранения параметров
    var obj = {};

    // если есть строка запроса
    if (queryString) {
        // данные после знака # будут опущены
        queryString = queryString.split('#')[0];

        // разделяем параметры
        var arr = queryString.split('&');

        for (var i=0; i<arr.length; i++) {
            // разделяем параметр на ключ => значение
            var a = arr[i].split('=');

            // обработка данных вида: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
            paramNum = v.slice(1,-1);
            return '';
            });

            // передача значения параметра ('true' если значение не задано)
            var paramValue = typeof(a[1])==='undefined' ? true : a[1];

            // преобразование регистра
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            // если ключ параметра уже задан
            if (obj[paramName]) {
              // преобразуем текущее значение в массив
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // если не задан индекс...
                if (typeof paramNum === 'undefined') {
                    // помещаем значение в конец массива
                    obj[paramName].push(paramValue);
                }
                // если индекс задан...
                else {
                    // размещаем элемент по заданному индексу
                    obj[paramName][paramNum] = paramValue;
                }
            }
            // если параметр не задан, делаем это вручную
            else {
                obj[paramName] = paramValue;
            }
        }
    }
    return obj;
}
