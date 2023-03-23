const modal = document.querySelector('.modal-container');
const cont = document.querySelector('.modal-content');
let closeButton = document.querySelector('.close');
let modalTriggers = document.querySelectorAll('[data-trigger]');
let isModalOpen = false;
let pageOffset = 0;
const mod = document.getElementById("modal");

let openModal = function() {
    modal.classList.add('is-open');
    isModalOpen = true;
    pageOffset = window.scrollY;
}
let closeModal = function() {
    modal.classList.remove('is-open');
    isModalOpen = false;
    // console.dir(input1);
}

modal.addEventListener("click", (event)=>{
    if (isModalOpen && event.target == modal){
        closeModal();
        console.log(event.target);
    }
    else console.log(event.target);
});

modalTriggers.forEach(function(item) { 
    item.addEventListener('click', openModal)
})
closeButton.addEventListener('click', closeModal);

let onScroll = function(e) {
    if (isModalOpen) {
        window.scrollTo(0, pageOffset);
    }
}

document.addEventListener('scroll', onScroll);

const body = document.body;
const form = document.getElementById("form1");
const btn_show = document.getElementById("btn1");
const btn_send = document.getElementById("btn2");
const input1 = document.getElementById("id1");
const input2 = document.getElementById("id2");


form.addEventListener("submit", (event)=>{
    email = input1.value;
    password = input2.value;
    console.table({email, password});
    event.preventDefault();
    closeModal();
    input1.value="";
    input2.value="";
    btn_show.setAttribute("disabled", 'false');
});

input1.addEventListener("focus", ()=> {
    console.log("focus1");
})
input2.addEventListener("focus", ()=> {
    console.log("focus2");
})

btn_show.addEventListener("pointerdown", ()=>{
    input2.setAttribute("type", "text");
    // event.preventDefault();
    btn_show.setAttribute("disabled", 'true');
})

btn_show.addEventListener("pointerleave", ()=>{
    input2.setAttribute("type", "password");
    btn_show.setAttribute("disabled", 'false');
    console.dir(btn_show);
    // console.dir(input2);
})

input1.addEventListener("blur", ()=> {
    if (input1.validity.typeMismatch){
        error1.textContent = "Не почта";
        input1.setCustomValidity("Не почта");
    }
    else if (input1.validity.tooShort){
    error1.textContent = "Мало";
    }
    else{
        error1.textContent = "";
        input1.setCustomValidity("");
    }
    console.log(input1.validity);
});

input2.addEventListener("blur", ()=> {
    if (input2.validity.typeMismatch){
        error2.textContent = "Неверный пароль";
        input2.setCustomValidity("Неправильный пароль");
    }
    else if (input2.validity.tooShort){
    error2.textContent = "Мало";
    }
    else{
        error2.textContent = "";
        input2.setCustomValidity("");
    }
    console.log(input2.validity);
});