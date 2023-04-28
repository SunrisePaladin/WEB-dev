const express = require('express');

function response(){
    console.log("database");
}

const router = express.Router();
module.exports = {
    router,
    response
}