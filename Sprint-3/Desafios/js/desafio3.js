console.log('Digite uma palavra ou frase:');

function isPalindrome(string) {
	let inputReverse = Array.from(string);
	inputReverse = inputReverse.reverse().join('');
	return string === inputReverse;
}

process.stdin.on('data', (data) => {
	const input = data.toString().replace(/\s/g, '').toLowerCase();
	console.log(isPalindrome(input));
	process.exit();
});
