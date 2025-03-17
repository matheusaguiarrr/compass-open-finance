console.log('Digite os números separados por vírgula:');

function arrayCount(array) {
	let total = 0;
	for (let number of array) {
		if (isNaN(number)) {
			console.log('Valor inválido detectado');
			process.exit();
		}
		total += number;
	}
	console.log(total);
}

process.stdin.on('data', (data) => {
	const input = data.toString().trim();
	const numbers = input.split(',').map((input) => Number(input));
	arrayCount(numbers);
	process.exit();
});
