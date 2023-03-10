const body = document.body;
// const form1 = document.getElementById("id_name");
// const form2 = document.getElementsByClassName("class_name");
// const form3 = document.getElementsByTagName("tag_name");

// const form4 = document.querySelector(".class_selector +  p"); //Только 1 элемент
// const form5 = document.querySelectorAll("empty"); //Отличается от первого варианта, отдаёт все элементы


const div = document.getElementById("div1");
const form = document.getElementById("form1");
const button = document.getElementById("btn1");
const input = document.querySelector("input");

// button.textContent = `<script defer src="кража_данных.js"></script>`;
// button.innerHTML = `<script defer src="кража_данных.js"></script>`; //можно вставить пользовательский ввод)))) ПОдходит для drop table

// body.style.backgroundColor = "green";
// console.dir(body);

div.classList.add("opened");
div.classList.remove("opened");
div.classList.toggle("opened"); //есть - исчезает, нет - добавляет

// function clickordie(event){
//     // event.stopPropagation();
//     console.log(`Клик на ${event.target} сейчас мы тут - ${event.currentTarget}`);
// }

// div.onclick = clickordie;

form.addEventListener("submit", (event)=>{
    // console.log(event);
    email = input.value;
    password = "Пароль";
    console.table({email, password});
    event.preventDefault();
});

input.addEventListener("focus", ()=> {
    console.log("focus");
})

input.addEventListener("blur", ()=> {
    // console.log("blur");
    // error.classList.add("error");
    // if (input.value !== '42'){
    //     error.innerText = "error";
    // }
    // else{
    //     error.innerText = "ok";
    // }

    if (input.validity.typeMismatch){
        error.textContent = "Не почта";
        input.serCustomValidity("не моя почта");
    }
    // if (input.validity.tooShort){
    //     error.textContent = "Мало";
    // }
    else{
        error.textContent = "";
        input.setCustomValidity("");
    }
    // console.log(input.validity);
});

button.addEventListener("click", () => {

});

// div.addEventListener("click", clickordie);
// //div.removeEventListener("click", clickordie);
// form.addEventListener("click", clickordie);
// button.addEventListener("click", clickordie);