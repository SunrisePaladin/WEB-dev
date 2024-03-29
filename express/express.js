const express = require('express');
const browser = require('browser-detect');
const fs = require('fs');
const helmet = require('helmet');
const passport = require('passport');
const morgan = require('morgan');

const fileRouter = express.Router();
const router = express.Router();

let comments = ['comment 1', 'comment 2', 'comment 3', 'comment 4'];
let apis = [{key : '1234', value : "value1"}, {key : '5678', value : "value2"}, {key : '9012', value : "value3"}];
let isStated = false;
let tableRows=[["Chrome Web Kit", "0"]];

LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

function generateHTMLTable(array) {
    let html = '<table border="1">';
    for (let i = 0; i < array.length; i++) {
        html += `<tr><td>${array[i][0]}</td><td>${array[i][1]}</td></tr>`;
    }
    html += '</table>';
    return html;
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

morgan.token('host', function(req, res) {
    return req.hostname;
});

router.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
        "script-src": ["'self'", "codeacademy.com"],
        "style-src": null,
        },
    })
);

router.use(
    helmet({
        xDownloadOptions: false,
    })
);

router.use(morgan('normal'));
router.use(helmet());
router.use(express.json());

fileRouter.use("/sans", function(req, res){
    res.statusCode = 200;
    router.use(express.static(__dirname + "/public"));
    res.end(fs.readFileSync(`${__dirname}/public/Pic/sans-undertale-dance.gif`));
});

fileRouter.use("/zhaba", function(req, res){
    res.statusCode = 200;
    router.use(express.static(__dirname + "/public"));
    res.end(fs.readFileSync(`${__dirname}/public/Pic/zhaba.png`));
});

router.use("/pic", fileRouter);

router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

router.post('/profile', function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
});

router.post('/comments', (req, res) => {
    res.statusCode = 200;
    comments.push(req.body.comment);
    res.json(comments);
});

router.get('/stats', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(generateHTMLTable(tableRows));
});

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/gif');
    res.end(fs.readFileSync(`${__dirname}/public/doge.jpg`));
});

router.get('/index', (req, res) => {
    res.statusCode = 200;
    router.use(express.static(__dirname + "/public"));
    res.end(fs.readFileSync(`${__dirname}/public/index.html`));
});

router.get('/register', (req, res) => {
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

module.exports = {
    router,
    comments
}