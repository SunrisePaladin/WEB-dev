let count = 0

const increase = () => {
    ++count;
    console.log(count);
}

const reset = () => {
    count = 0
    console.log('Счетчик сброшен.')
}

exports.increase = increase;
exports.reset = reset;
exports.count = count;
// или (эквивалентно)
//module.exports = {
//    increase,
//    reset,
//    count
//}