let randomNumber;
let userNumbers = [];
let numberAttempts = 0;
let message;
let maxAttempts = 10;

function generateNumber() {
    randomNumber = Math.floor(Math.random() * 100 + 1);
}

function newGame() {
    window.location.reload();
}

function compareNumbers() {
    if (numberAttempts < maxAttempts) {
        let userNumber = Number(document.getElementById('inputBox').value);
        userNumbers.push(userNumber);
        document.getElementById('guesses').innerHTML = userNumbers;
        numberAttempts++;
        document.getElementById('attempts').innerHTML = numberAttempts;
        if (userNumber === randomNumber) {
            message = 'Parábens!!! Você acertou o número';
            document
                .getElementById('inputBox')
                .setAttribute('Readonly', 'Readonly');
        } else if (userNumber > randomNumber) {
            message = 'Seu número é maior';
            document.getElementById('inputBox').value = '';
        } else {
            message = 'Seu número é menor';
            document.getElementById('inputBox').value = '';
        }
        document.getElementById('textOutput').innerHTML = message;
    } else {
        document.getElementById('textOutput').innerHTML =
            'Você perdeu! O número era ' + randomNumber;
        document
            .getElementById('inputBox')
            .setAttribute('Readonly', 'Readonly');
    }
}
