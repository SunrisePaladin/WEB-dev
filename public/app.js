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
            comJScnt.m_increase();
            res.statusCode = 200;
            res.end(resp_ans);
        }
        else if (req.method === 'POST') {
            resp_ans = 'Hello PostWorld!';
            comJScnt.m_reset();
            res.statusCode = 200;
            res.end(resp_ans);
        }
    }
    else if (req.url.includes('/register')){
        res.statusCode = 200;
        let ua = browser(req.headers['user-agent']);
        console.log(ua.name);
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
    }
    else if (req.url === '/comments'){
        res.statusCode = 200;
        if (req.method === 'GET') {
            res.setHeader('Content-Type', 'text/plain');
            res.end('advance in using GET method');
        }
        else if (req.method === 'POST') {
            let tree = "";
            req.on('data', (chunk) => {
                tree += chunk;
            });
            req.on('end', () => {
                comments.push(tree);
                res.setHeader('Content-Type', 'application/json');
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
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad request');
    }
});

server.on("connection", () => {
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