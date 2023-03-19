const http = require('node:http')

const host = "127.0.0.1"
const port = 5500

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.end("hello world");
});

server.on("connection", () => {
    console.log("new connect");
});

server.listen(port, host, () => {
    console.log("bububu");
})