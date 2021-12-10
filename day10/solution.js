const {array: {sum, sort}} = require('../utils');

const lines = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`.split('\n').filter(l => l);

const chunks = {
    '[': ']',
    '(': ')',
    '{': '}',
    '<': '>'
};

const parseChunks = (line, index=0, history=[]) => {
    const chunk = line[index];
    
    if (!chunk || !chunks[chunk] && chunks[history.pop()] !== chunk) {
        return {
            corruptedChunk: chunk, 
            addition: !chunk && history.map(h => chunks[h]).reverse()
        };  
    }

    chunks[chunk] && history.push(chunk);
    return parseChunks(line, index + 1, history);
}

const part1 = lines.map(line => parseChunks(line)).map(c => c.corruptedChunk).filter(c => c)
    .map(c => ({')': 3, ']': 57, '}': 1197, '>': 25137}[c]));

const part2 = lines.map(line => parseChunks(line)).map(c => c.addition).filter(a => a)
    .map(a => a.reduce((acc, c) => acc * 5 + ({')': 1, ']': 2, '}': 3, '>': 4}[c]), 0));


console.log('Part 1 result', sum(part1));
console.log('Part 2 resukt', sort(part2)[Math.floor(part2.length/2)])
