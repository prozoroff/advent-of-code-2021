const {input: {parseConnections}} = require('../utils');

const connections = parseConnections(`
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`);

const isLowerCaseCave = cave => cave !== 'end' && cave[0] === cave[0].toLowerCase();
const same = first => second => first === second;
const notSame = first => second => first !== second;

const firstCondition = (path, cave) => path.filter(same(cave)).length > 0;

const secondCondition = (path, cave) => {
    const lastVisited = path.filter(same(cave));
    const othersVisited = path.filter(isLowerCaseCave).filter(notSame(cave));
    return lastVisited.length > 1 || lastVisited.length && othersVisited.find(c => othersVisited.filter(same(c)).length > 1)
}

const findPath = (condition, path=[], cave='start') => {
    if (cave === 'end') {
        return [[...path, cave].join(',')];
    }

    if (isLowerCaseCave(cave) && condition(path, cave)) {
        return [];
    }

    return connections.filter(c => c.includes(cave))
        .map(connection => connection.find(notSame(cave))).filter(notSame('start'))
        .map(nextCave => findPath(condition, [...path, cave], nextCave)).flat(Infinity);
}

console.log('Part 1 result:', findPath(firstCondition).length);
console.log('Part 2 result:', findPath(secondCondition).length);

