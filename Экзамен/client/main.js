const modelsTableInfo = document.getElementsByClassName('models-info-table')[0];
const emptyText = document.getElementsByClassName('empty-text-default')[0];
let someData = [{"_id":"64648adaf5294c788ca2369f","name":"Cube"},
    {"_id":"6464a117b525643ea451bc73","name":"Cube"},
    {"_id":"646788ad989af1677f393f2d","name":"Romb"},
    {"_id":"646789d9967b5be9584f2e3e","name":"Romb"},,
    {"_id":"646795a70bc2f13c2dfaf71e","name":"Square"}];

const input1 = document.getElementById("id1");
const form = document.getElementById("form1");

let pass ="", object

form.addEventListener("submit", (event)=>{
    pass = input1.value;
    event.preventDefault();
    input1.value="";
});

async function getAllModels(){
    // try {
        let res = await fetch("http://127.0.0.1:5502/Exam/models");
        let body = await res.json();
        console.log(body);}
        // let response = someData;
        // if (response.ok || typeof response === 'object') {
        //     if (response.body.lenght !== 0)
        //     // if (response.length !== 0)
        //     {
        //         let tableBody = document.createElement('tbody');
        //         response.body.forEach(element => {
        //         // response.forEach(element => {
        //             let newTr = document.createElement('tr');
        //             let newTd = document.createElement('td');
        //             let buttonDelTd = document.createElement('td');
        //             let btnViewTd = document.createElement('td');
        //             let deleteButton = document.createElement('button');
        //             let viewButton = document.createElement('button');
        //             deleteButton.textContent = 'Delete Model';
        //             viewButton.textContent = 'View model'
        //             buttonDelTd.appendChild(deleteButton);
        //             btnViewTd.appendChild(viewButton);
        //             newTd.textContent = element.name;
        //             newTd.dataset.modelId = element['_id'];
        //             newTr.style.border = '1px solid #000000';
        //             newTr.appendChild(newTd);
        //             newTr.appendChild(btnViewTd);
        //             newTr.appendChild(buttonDelTd);
        //             tableBody.appendChild(newTr);
        //         });
        //         modelsTableInfo.appendChild(tableBody);
        //     }
        //     emptyText.classList.remove('empty-text-visible')
        // } 
        // else{ 
        //     emptyText.classList.add('empty-text-visible');
        // }
    // }
    // catch {
    //     emptyText.classList.add('empty-text-visible');
    //     emptyText.textContent = 'Ошибка запроса!'
    // }
// };

//getAllModels();