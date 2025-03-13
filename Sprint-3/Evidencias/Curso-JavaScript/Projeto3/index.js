function changeColor() {
    const colors = ['white', 'red', 'yellow', 'blue', 'green', 'brown', 'purple'];
    let color = Math.floor(Math.random() * colors.length);
    document.body.style.background = colors[color];
    document.querySelector('.color').innerHTML = colors[color];
}