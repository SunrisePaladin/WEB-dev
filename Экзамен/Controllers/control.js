const {serviceSearch: search,
    serviceModels: showModels,} = require('../Services/serv');

const {ObjectId} = require('mongodb'); 

let result="";

function generateHTMLTable(array) {
    let html = '<table border="1">';
    for (let i = 0; i < array.length; i++) {
        html += `<tr><td>${array[i][0]}</td><td>${array[i][1]}</td></tr>`;
    }
    html += '</table>';
    return html;
} 

async function getAllModels(){
    let res = await fetch("http://127.0.0.1:5500/Exam/models");
    let body = await res.json();
    console.log(body);
}

async function authorize(req, res, next) {
    console.log("authorization!");
    let key = req.headers['password'];
    if (key == "" || key == null){
        console.log("no password");
        res.status(401).json({
            status: "error",
            message: "No password provided!",
        });
    }
    else if (typeof key != "string"){
        res.status(403).json({
            status: "error",
            message: "Password is not symbolic!"
        });
    }
    else if (key.length < 8){
        console.log("password is too short");
        res.status(403).json({
            status: "error",
            message: "Password is too short!"
        });
    }
    else{
        console.log("final check");
        let check = await search(key);
        console.log(check);
        if (check) next();
        else {
                console.log("error 2");
                res.status(403).json({
                status: "error",
                message: "No such password"
            })
        }
    }
}

async function ctrlPassword(req, res, next){
    console.log("ctrlPassword");
    try{
        let models_list;
        models_list = await showModels("all");
        console.table(models_list); 
        res.status(200);
        res.json(models_list);
    }
    catch(error){
        let err = new Error(error.message);
        err.status = "error";
        err.statusCode = 501;
        next(err);
    }
}

module.exports = {
    authorize,
    ctrlPassword,
    getAllModels
}