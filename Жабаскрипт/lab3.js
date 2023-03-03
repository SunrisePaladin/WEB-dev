const body = document.body;
// const form1 = document.getElementById("id_name");
// const form2 = document.getElementsByClassName("class_name");
// const form3 = document.getElementsByTagName("tag_name");

// const form4 = document.querySelector(".class_selector +  p"); //Только 1 элемент
// const form5 = document.querySelectorAll("empty"); //Отличается от первого варианта, отдаёт все элементы


const div = document.getElementById("div1");
const form = document.getElementById("form1");
const button = document.getElementById("btn1");

// button.textContent = `<script defer src="кража_данных.js"></script>`;
// button.innerHTML = `<script defer src="кража_данных.js"></script>`; //можно вставить пользовательский ввод)))) ПОдходит для drop table

// body.style.backgroundColor = "green";

function clickordie(){
    console.log("click")
}

// div.onclick = clickordie;

div.addEventListener("click", clickordie);
div.removeEventListener("click", clickordie);


form.addEventListener("click", clickordie);
button.addEventListener("click", clickordie);
// console.dir(body);