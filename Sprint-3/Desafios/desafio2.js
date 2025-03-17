console.log('Digite um número:');

function isPrime(number) {
	if (number < 2) return false;
	if (number === 2 || number === 3) return true;
	if (number % 2 === 0 || number % 3 === 0) return false;
	for (let i = 5; i <= Math.sqrt(number); i += 2) {
		if (number % i === 0) return false;
	}
	return true;
}

process.stdin.on('data', (data) => {
	const inputNumber = Number(data.toString().trim());
	if (isNaN(inputNumber)) {
		console.log('Valor inválido detectado');
		process.exit();
	}
	console.log(isPrime(inputNumber));
	process.exit();
});
