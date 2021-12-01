data = [
	199,
	200,
	208,
	210,
	200,
	207,
	240,
	269,
	260,
	263,
];

count_positive = lambda array: len(filter(lambda item: item > 0, array))
get_window_diff = lambda index, size: index < len(data) - size and (data[index + size] - data[index])
get_diffs_array = lambda window_size: [get_window_diff(i, window_size) for i, item in enumerate(data)]
count_increases = lambda window_size: count_positive(get_diffs_array(window_size))

print('Measurement increases ' + str(count_increases(1)) + ' times')
print('Sliding window increases ' + str(count_increases(3)) + ' times')
