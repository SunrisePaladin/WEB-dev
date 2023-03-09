var modal = document.querySelector('.modal-container');
var closeButton = document.querySelector('.close');
var modalTriggers = document.querySelectorAll('[data-trigger]');

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
});

input1.addEventListener("blur", ()=> {
    if (input1.validity.typeMismatch){
        error.textContent = "Не почта";
        input1.serCustomValidity("не моя почта");
    }
    else if (input1.validity.tooShort){
    error.textContent = "Мало";
    }
    else{
        error.textContent = "";
        input.setCustomValidity("");
    }
    console.log(input1.validity);
});

input2.addEventListener("blur", ()=> {
    if (input2.validity.typeMismatch){
        error.textContent = "Неверный пароль";
        input2.serCustomValidity("не мой пароль");
    }
    else if (input2.validity.tooShort){
    error.textContent = "Мало";
    }
    else{
        error.textContent = "";
        input2.setCustomValidity("");
    }
    console.log(input2.validity);
});

var openModal = function() {
    modal.classList.add('is-open')
}
var closeModal = function() {
    modal.classList.remove('is-open')
}
modalTriggers.forEach(function(item) { 
    item.addEventListener('click', openModal)
})
closeButton.addEventListener('click', closeModal)

var isModalOpen = false;
var pageYOffset = 0;
var openModal = function() {

isModalOpen = true;
scrollY = window.pageYOffset;
}
var closeModal = function() {
isModalOpen = false;
}
var onScroll = function(e) {
    if (isModalOpen) {
        window.scrollTo(0, scrollY);
    }
}

document.addEventListener('scroll', onScroll);