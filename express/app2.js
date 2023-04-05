const http = require('node:http');
const comJScnt = require('counter_mod');
const express = require('express');
const browser = require('browser-detect');
const fs = require('fs');

const host = "127.0.0.1";
const port = 5501;
const app = express();

let comments = ['comment 1', 'comment 2', 'comment 3', 'comment 4'];
let isStated = false;
let num = comJScnt.m_count;
let resp_ans = 'undefined response';
let tableRows=[["Chrome Web Kit", "0"]];

//app.use(express.static('public'));
//app.use(express.static(__dirname + "/public"));
//app.use(express.static(`${__dirname}/public`));

function generateHTMLTable(array) {
    let html = '<table border="1">';
    for (let i = 0; i < array.length; i++) {
        html += `<tr><td>${array[i][0]}</td><td>${array[i][1]}</td></tr>`;
    }
    html += '</table>';
    return html
}

function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    var obj = {};

    if (queryString) {
        queryString = queryString.split('#')[0];

        var arr = queryString.split('&');

        for (var i=0; i<arr.length; i++) {
            var a = arr[i].split('=');

            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
            paramNum = v.slice(1,-1);
            return '';
            });

            var paramValue = typeof(a[1])==='undefined' ? true : a[1];

            if (obj[paramName]) {
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    obj[paramName].push(paramValue);
                }
                else {
                    obj[paramName][paramNum] = paramValue;
                }
            }
            else {
                obj[paramName] = paramValue;
            }
        }
    }
    return obj;
}

function* gen() {
    while(true) {
        let value = yield null;
        console.log(value);
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port} and host ${host}`);
})

app.get('/', (req, res) => {
    res.statusCode = 302;
    res.redirect('http://127.0.0.1:5501/homepage');
});

app.get('/homepage', (req, res) => {
    app.use(express.static(__dirname + "/public"));
    //comJScnt.m_increase();
    res.statusCode = 200;
    res.send('Hello GetWorld!');
})

app.post('/post', (req, res) => {
    app.use(express.static(__dirname + "/public"));
    //comJScnt.m_reset();
    res.statusCode = 200;
    res.send('Hello PostWorld!');
});

app.get('/register', (req, res) => {
    console.log("registration");
    res.statusCode = 200;
    let ua = browser(req.headers['user-agent']);
    res.end(`User ${getAllUrlParams(req.url).id} registered!`);
    isStated = false;
        for (let i = 0; i < tableRows.length; i++) {
            if (tableRows[i][0] === ua.name + ' ' + ua.version) {
                isStated = true;
            }
        }
        if (isStated){
            tableRows[tableRows.length - 1][1]++;
        }
        else tableRows.push([ua.name+' '+ua.version, 1]);
});

app.post('/comments', (req, res) => {
    res.statusCode = 200;
    let tree = "";
    req.on('data', (chunk) => {
        tree += chunk;
    })
    req.on('end', () => {
        comments.push(tree);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    })   
});

app.get('/stats', (req, res) => {res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(generateHTMLTable(tableRows));
});
