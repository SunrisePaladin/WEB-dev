let count = 0

const increase = () => {
    ++count;
    console.log(count);
}

const reset = () => {
    count = 0
    console.log('Счетчик сброшен.')
}

exports.m_increase = increase;
exports.m_reset = reset;
exports.m_count = count;
// или (эквивалентно)
//module.exports = {
//    increase,
//    reset,
//    count
//}