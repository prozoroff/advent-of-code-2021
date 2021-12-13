const {splitBy} = require('./string');
const {Matrix} = require('./matrix');

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

exports.parseMatrix = (input, getter) => new Matrix(
    splitBy(input, '\n')
    .filter(x => x)
    .map((row, j) => row.split('')
        .map((item, i) => getter ? getter(item, j, i) : parseInt(item))));

exports.parseConnections = input =>
    splitBy(input, '\n')
    .filter(x => x)
    .map(connection => splitBy(connection, '-'));


exports.parsePaper = input => ({
    dots: splitBy(input, 'fold along')[0]
    .split('\n')
    .filter(x => x)
    .map(dot => splitBy(dot).map(coord => parseInt(coord))).map(([x, y]) => ({x, y})),
    folds: input.match(/fold along (y|x)=(\d+)/g).map(fold => splitBy(fold)[2].split('='))
});