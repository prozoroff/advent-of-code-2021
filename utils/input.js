const {splitBy} = require('./string');

exports.parseInts = input => splitBy(input, '\n')
    .map(item => parseInt(item));

exports.parseCommands = input => splitBy(input, '\n')
    .map(item => item.split(' '));

exports.parseBits = input => splitBy(input, '\n')
    .map(num => num.split('').map(bit => parseInt(bit)));

exports.parseBingo = input => {
    const parseNumbers = arr => arr.filter(x => x).map(n => parseInt(n));
    const parseBoards = (boardLines, acc = []) => {
        const [a, b, c, d, e, ...rest] = boardLines;
        const rows = [a, b, c, d, e].map(str => splitBy(str).map(item => parseInt(item)));
        const columns = rows.map((_,i) => rows.map(line => line[i]));
        const result = [...acc, [...rows, ...columns]];
        return rest.length ? parseBoards(rest, result) : result;
    };

    const [numbersLine, ...boardsLines] = splitBy(input, '\n');
    return [
        parseNumbers(splitBy(numbersLine)),
        parseBoards(boardsLines),
    ];
}

exports.parseVectors = input =>
    splitBy(input, '\n')
    .map(vector => vector.split(/\s|,/)
        .map(c => parseInt(c))
        .filter(num => !Number.isNaN(num)));

exports.parseDigits = input =>
    splitBy(input, '\n')
    .filter(x => x)
    .map(line => splitBy(line, ' | ')
        .map(str => splitBy(str, ' ')));

exports.parseMatrix = input =>
    splitBy(input, '\n')
    .filter(x => x)
    .map(row => row.split('')
        .map(item => parseInt(item)));
