const input = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

const splitStringBy = (str, delimiter=/\s+|,/) => str.split(delimiter).filter(s => s);
const parseInts = arr => arr.filter(x => x).map(n => parseInt(n));

const parseBoards = (boardLines, acc = []) => {
    const [a, b, c, d, e, ...rest] = boardLines;
    const rows = [a, b, c, d, e].map(str => parseInts(splitStringBy(str)));
    const columns = rows.map((_,i) => rows.map(line => line[i]));
    const result = [...acc, [...rows, ...columns]];
    return rest.length ? parseBoards(rest, result) : result;
};

const [numbersLine, ...boardsLines] = splitStringBy(input, '\n');
const pazzleNumbers = parseInts(splitStringBy(numbersLine));
const pazzleBoards = parseBoards(boardsLines);

const tickNumber = number => arrays => arrays.map(array => array.filter(n => n !== number));
const isBoardSolved = condition => arrays => !!arrays.find(array => !array.length) === condition;
const sumArray = arr => arr.reduce((a, b) => a + b, 0)
const allNumbersSum = arrays => sumArray(arrays.slice(0, arrays.length/2).map(sumArray));

const findNSolved = (n, boards=pazzleBoards, [num, ...rest]=pazzleNumbers) => {
    const tickedBoards = boards.filter(isBoardSolved(false)).map(tickNumber(num));
    const solved = tickedBoards.find(isBoardSolved(true));
    const isDone = solved && tickedBoards.length === pazzleBoards.length - n;
    return isDone ? [allNumbersSum(solved), num] : findNSolved(n, tickedBoards, rest);
}

const [firstSum, firstNum] = findNSolved(0);
console.log('The first solved sum is', firstSum, 'after the number is', firstNum);
console.log('The multiplication is', firstSum * firstNum);

const [lastSum, lastNum] = findNSolved(pazzleBoards.length - 1);
console.log('The last solved sum is', lastSum, 'after the number is', lastNum);
console.log('The multiplication is', lastSum * lastNum);

