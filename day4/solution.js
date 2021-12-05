const {
	input: {parseBingo},
	array: {sum},
} = require('../utils');

const [puzzleNumbers, puzzleBoards] = parseBingo(`
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
`);

const findNSolved = (n, boards=puzzleBoards, [num, ...rest]=puzzleNumbers) => {
    const tickedBoards = boards
		.filter(board => !board.find(array => !array.length))
		.map(arrays => arrays.map(array => array.filter(n => n !== num)));

	const solvedBoard = tickedBoards
		.find(board => board.find(array => !array.length));

    return solvedBoard && tickedBoards.length === puzzleBoards.length - n
		? [sum(solvedBoard.slice(0, solvedBoard.length/2).map(sum)), num]
		: findNSolved(n, tickedBoards, rest);
}

const [firstSum, firstNum] = findNSolved(0);
console.log('The first solved sum is', firstSum, 'after the number is', firstNum);
console.log('The multiplication is', firstSum * firstNum);

const [lastSum, lastNum] = findNSolved(puzzleBoards.length - 1);
console.log('The last solved sum is', lastSum, 'after the number is', lastNum);
console.log('The multiplication is', lastSum * lastNum);

