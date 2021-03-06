const {input: {parseCommands}} = require('../utils');

const commands = parseCommands(`
forward 5
down 5
forward 8
up 3
down 8
forward 2
`);

const commandHandlers = {
    forward: value => ({horizontal, depth, aim}) => ({
        horizontal: horizontal + value,
        depth: depth + aim * value,
        aim,
    }),
    down: value => ({aim, ...rest}) => ({
        aim: aim + value,
        ...rest,
    }),
    up: value => ({aim, ...rest}) => ({
        aim: aim - value,
        ...rest,
    }),
};

const coordinates = commands.reduce(
    (coordinates, [command, value]) => (commandHandlers[command](parseInt(value)))(coordinates),
    {horizontal: 0, depth: 0, aim: 0}
);

console.log('Final coordinates is', coordinates);
console.log('Multiplying these together produces', coordinates.depth * coordinates.horizontal);
