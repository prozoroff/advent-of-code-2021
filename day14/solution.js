const {array: {max, min}, function: {memoize}} = require('../utils');

const [polymer, ...rules] = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`.split('\n').filter(x => x);

const lookup = rules.map(c => c.split(' -> ')).reduce((acc, [pair, symbol]) => ({...acc, [pair]: symbol}), {});
const symbolsLookup = rules.map(c => c.split(' -> ')[1]).reduce((acc, symbol) => ({...acc, [symbol]: 0}), {});

const countPair = memoize((pair, count, isSecond) => {
    if (count === 0){
        const obj = {...symbolsLookup};

        obj[pair[1]]++
        !isSecond && (obj[pair[0]]++)

        return Object.keys(symbolsLookup).map(key => obj[key]);
    } else {
        const pair1 = countPair([pair[0], lookup[pair.join('')]], count-1, true);
        const pair2 = countPair([lookup[pair.join('')], pair[1]], count-1, true);

        return pair1.map((_, i) => pair1[i] + pair2[i]);
    }
})

const result = polymer.split('').slice(1).reduce((acc, _, i) => {
    const res = countPair([polymer[i], polymer[i + 1]], 40, i > 0);
    return res.map((_, i) => acc[i] + res[i]);
}, Object.keys(symbolsLookup).map(key => 0));

console.log(max(result) - min(result));