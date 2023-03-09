var modal = document.querySelector('.modal-container');
var closeButton = document.querySelector('.close');
var modalTriggers = document.querySelectorAll('[data-trigger]');

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