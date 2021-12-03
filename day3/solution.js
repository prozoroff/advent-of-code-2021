const report = [
'00100',
'11110',
'10110',
'10111',
'10101',
'01111',
'00111',
'11100',
'10000',
'11001',
'00010',
'01010',
];

const reportBits = report.map(num => num.split('').map(bit => parseInt(bit)));

const toDecimal = arr => parseInt(arr.join(''), 2);
const handlePerBit = (arr, handler) => arr[0].map((_, i) => handler(arr, i));

const getMostCommon = (arr, i) => arr.reduce((acc, n) => acc + n[i], 0) >= arr.length / 2 ? 1 : 0;
const getLeastCommon = (arr, i) => 1 - getMostCommon(arr, i);

const filterByCriteria = (arr, bitCriteria, i=0) => {
	const filtered = arr.filter(n => n[i] === bitCriteria(arr, i));
	return arr.length === 1 ? arr[0] : filterByCriteria(filtered, bitCriteria, i + 1);
}

const gammaRate = toDecimal(handlePerBit(reportBits, getMostCommon));
const omegaRate = toDecimal(handlePerBit(reportBits, getLeastCommon));

const oxygenGeneratorRating = toDecimal(filterByCriteria(reportBits, getMostCommon));
const CO2ScrubberRating = toDecimal(filterByCriteria(reportBits, getLeastCommon));

console.log('Power consumption is:', gammaRate * omegaRate);
console.log('Life support rating:', oxygenGeneratorRating*CO2ScrubberRating);
