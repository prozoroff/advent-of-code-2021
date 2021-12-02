commands = [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2',
];

command_handlers = {
    'forward': lambda value: lambda (horizontal, depth, aim): (horizontal + value, depth + aim * value, aim),
    'down': lambda value: lambda (horizontal, depth, aim): (horizontal, depth, aim + value),
    'up': lambda value: lambda (horizontal, depth, aim): (horizontal, depth, aim - value)
}

get_command_handler = lambda (command, value): command_handlers[command](int(value))
handle_command = lambda command_str: get_command_handler(command_str.split(' '))

start = (0, 0, 0)
command_reducer = lambda coordinates, command: handle_command(command)(coordinates)
(horizontal, depth, aim) = reduce(command_reducer, commands, start)

print('Final coordinates is ' + str((horizontal, depth, aim)))
print('Multiplying these together produces ' + str(horizontal * depth))
