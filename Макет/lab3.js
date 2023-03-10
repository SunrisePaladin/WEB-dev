var modal = document.querySelector('.modal-container');
var closeButton = document.querySelector('.close');
var modalTriggers = document.querySelectorAll('[data-trigger]');
var isModalOpen = false;
var pageYOffset = 0;

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
document.addEventListener('scroll', onScroll);

var onScroll = function(e) {
    if (isModalOpen) {
        window.scrollTo(0, pageYOffset);
    }
}

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

input1.addEventListener("focus", ()=> {
    console.log("focus");
})
input2.addEventListener("focus", ()=> {
    console.log("focus");
})

btn_show.addEventListener("pointerdown", ()=>{
    input2.setAttribute("type", "text");
    // console.dir(input2);
})

btn_show.addEventListener("pointerleave", ()=>{
    input2.setAttribute("type", "password");
    // console.dir(input2);
})

input1.addEventListener("blur", ()=> {
    if (input1.validity.typeMismatch){
        error.textContent = "Не почта";
        input1.serCustomValidity("Не почта");
    }
    else if (input1.validity.tooShort){
    error.textContent = "Мало";
    }
    else{
        error.textContent = "";
        input1.setCustomValidity("");
    }
    console.log(input1.validity);
});

input2.addEventListener("blur", ()=> {
    if (input2.validity.typeMismatch){
        error.textContent = "Неверный пароль";
        input2.serCustomValidity("Неправильный пароль");
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