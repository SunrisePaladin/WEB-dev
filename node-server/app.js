const http = require('node:http')

const host = "127.0.0.1"
const port = 5500
let i = 0
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain');
    res.end(`hello, user #${i}`);
});

server.on("connection", () => {
    i++;
    console.log("new connect");
});

server.listen(port, host, () => {
    console.log("bububu");
    console.log(`Server running at http://${host}:${port}/`);
})