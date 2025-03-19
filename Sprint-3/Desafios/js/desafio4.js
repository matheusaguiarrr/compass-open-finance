const options = ['pedra', 'papel', 'tesoura'];
console.log('Digite sua escolha (pedra, papel ou tesoura):');

function rockPaperScissors(playerChoice) {
	let computerChoice = Math.floor(Math.random() * 3);
	computerChoice = options[computerChoice];
	let result = '';
	if (playerChoice === computerChoice) result = 'Empate!';
	if (playerChoice === 'pedra' && computerChoice == 'papel') result = 'Você perdeu!';
	if (playerChoice === 'pedra' && computerChoice == 'tesoura') result = 'Você ganhou!';
	if (playerChoice === 'papel' && computerChoice == 'pedra') result = 'Você ganhou!';
	if (playerChoice === 'papel' && computerChoice == 'tesoura') result = 'Você perdeu!';
	if (playerChoice === 'tesoura' && computerChoice == 'pedra') result = 'Você perdeu!';
	if (playerChoice === 'tesoura' && computerChoice == 'papel') result = 'Você ganhou!';
	console.log(`*cpu escolheu ${computerChoice}*`);
	console.log(result);
}

process.stdin.on('data', (data) => {
	const input = data.toString().replace(/\s/g, '').toLowerCase();
	rockPaperScissors(input);
	process.exit();
});
