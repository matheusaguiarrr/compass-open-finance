const productValue = Number(prompt('Enter the product value: '));
const result = productValue >= 20 ? 'Approved' : 'Denied';
document.getElementById('result').innerHTML = result;