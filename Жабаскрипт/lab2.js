function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function convertSpeed(speed, mode) {
    if (mode == 'toMS') console.log(`${speed*1000/3600} м/с`)
    else if (mode == 'toKMH') console.log(`${speed/1000*3600} км/ч`)
    else console.log('Неверный параметр перевода')
}

function absValue(num) {
    return Math.abs(num);
}

function sampleArray(arr, len) {
    let myarr =[];
    for (let i =0; i < len; i++){
        let pos = getRandomInt(0, arr.length);
        myarr.push(arr[pos]);
    }
    return myarr;
}

//Задача1
// let guess = prompt('Скорость: ');
// let par = prompt('Перевод в: ');
// convertSpeed(guess, par);

//Задача2
// let a = +prompt("Введите число");
// console.log(absValue(a));

//задача3
// let student = {
//     group: +prompt("Группа"),
//     last_name: prompt("Имя"),
//     first_name: prompt("Фамилия")
// };
// let keyNames = Object.keys(student);
// console.log(`Свойства: ${keyNames}`);
// console.log(`Студент ${student.last_name} ${student.first_name} учится в ${student.group} группе`);

//задача4
// let g1 = +prompt("От: ")
// let g2 = +prompt("До: ")
// alert(`${getRandomInt(g1, g2)}`);

//задача5
let n = +prompt("Введите длину массива: ");
let mas = [];
for (let i = 0; i < n; i++){
    mas.push(+prompt("Введите число в массив: "));
}
let r = +prompt("Введите кол-во элементов в новом массиве: ");
console.log(sampleArray(mas, r))