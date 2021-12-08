const {array: {sum, sort}, input: {parseDigits}} = require('../utils');

const data = parseDigits(`
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`);

const has = (str, l) => str.includes(l);
const find = (str, condition) => str.split('').find(condition);

const partOne = ([_, digits]) =>
    digits.filter(d => [2,3,4,7].includes(d.length)).length;

const partTwo = ([patterns, digits]) => {
    
    const [one, seven, four, ...rest] = sort(patterns, x=>x.length);
    const eight = rest.pop();

    const t = find(seven, l => !has(one, l));

    let [lb, b] = eight.split('').filter(l => l!==t && !has(four, l));
    patterns.find(p => has(p, lb) && !has(p, b)) && ([lb, b] = [b, lb])

    let [rt, rb] = one;
    !patterns.find(p => p.length === 6 && !has(p, one[0])) && ([rt, rb] = [rb, rt])

    const c = patterns.filter(p => p.length === 5)
        .find(p => has(p, t) && has(p, rt) && has(p, lb) && has(p, b)).split('')
        .find(l => ![t, rt, lb, b].includes(l));

    const lt = find(eight, l => ![t, b, lb, c, rt, rb].includes(l));
        
    const lookupDigit = [
        [t, lb, lt, b, rb, rt],
        [rb, rt],
        [t, lb, b, rt, c],
        [t, b, rb, rt, c],
        [lt, c, rt, rb],
        [t, lt, c, rb, b],
        [t, lt, lb, c, b, rb],
        [t, rb, rt],
        [t, lb, lt, b, c, rb, rt],
        [t, lt, rt, c, rb, b]
    ].map(arr => sort(arr).join(''));

    const strToInt = str => lookupDigit.indexOf(sort(str.split('')).join(''));

    return parseInt(digits.map(strToInt).join(''));
}

console.log('Part 1 result', sum(data.map(partOne)));
console.log('Part 2 result', sum(data.map(partTwo)));