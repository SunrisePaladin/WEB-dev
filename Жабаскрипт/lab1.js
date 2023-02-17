function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const myFunc = function () {};

//Задача 1
// let a  = prompt('Speed in km/h');
// console.log(`${a} km/h - is ${a*1000/3600} m/s`);
// let b  = prompt('Speed in m/s');
// console.log('${b} + m/s - is ${b/1000*3600} km/h`);


//задача 2
// let a  = +prompt('сторона a');
// let b  = +prompt('сторона b');
// let c  = +prompt('сторона c');
// let p = (a+b+c)/2;
// if (!(a+b>c && b+c>a && c+a>b)) console.log('треугольник не существует')
// else {
//     console.log('треугольник существует');
//     console.log(`Периметр - ${a+b+c}`);
//     console.log(`Площадь - ${Math.sqrt(p*(p-a)*(p-b)*(p-c))}`);
//     console.log(`Отношение - ${(a+b+c) / Math.sqrt(p*(p-a)*(p-b)*(p-c))}`)
// };


// let ih = +prompt("длина", 11);
// console.log(typeof(ih));
// if (typeof(ih) === 'number') {
// if(!isNaN(ih)){ 
//         for (let i = 0; i < ih; i++){
//         if (i%5 == 0 && i != 0){
//             console.log(i, "fizz buzz");
//             continue;
//         }
//         if (i%2 == 0){
//             console.log(i, "buzz");
//         }
//         else {
//             console.log(i, "fizz");
//         }
//     };
// }

//Задача 4
// let pine = '>';
// for (let i = 1; i <=12; i++){
//     pine = pine + "\n";
//     if (i%2!=0) 
//         for (let j = 0; j < i; j++) {
//             pine = pine + "*";
//         }
//     else 
//         for (let j = 0; j < i; j++) {
//             pine = pine + "#";
//         }
// }
// pine += "\n||";
// console.log(pine);

//Задача 5
// let r = getRandomInt(0, 20);
// alert('Загадано число от 0 до 20');
// alert('Угадайте его');
// alert(r);
// let guess = prompt('Ваше число: ');
// var check = false;
// while (check == false){
//     if (isNaN(guess)) alert(guess + ' - это не число')
//     else if (guess>r) alert('Ваше число больше загаданного')
//     else if (guess<r) alert('Ваше число меньше загаданного')
//     else {alert('Вы угадали число'); console.log(Number(guess)); check=true; break;}
//     guess = prompt('Ваше число: ');
// }

// Задача 6
// let d  = +prompt('Число');
// let n1  = +prompt('Делитель 1');
// let n2  = +prompt('Делитель 2');
// let res;
// if (d%n1 == 0){
//     if (d%n2 == 0){
//         res = true;
//     }
//     else res = false;
// }
// else res = false;
// // (d%n1 == 0)? (d%n2 == 0) ? res=true : res = false : res=false;
// console.log('n = ', d, ', x = ', n1, ', y = ', n2, ' => ', res);

//Задача 7
let mn = +prompt('Введите месяц');
console.log('месяц', mn, '=>', `${Math.ceil(mn/3)}`, 'квартал')