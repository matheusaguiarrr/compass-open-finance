function formatMoney(value){
    value = Math.ceil(value * 100) / 100;
    return "R$ " + value.toFixed(2);
}

function updateValues() {
    let bill = Number(document.getElementById('bill').value);
    let percentTip = Number(document.getElementById('tipInput').value);
    let numberPeople = document.getElementById('numberPeople').value;
    document.getElementById('tipPercent').innerHTML = percentTip + "%";
    document.getElementById('splitValue').innerHTML = numberPeople;
    let tip = bill * (percentTip / 100);
    let billWithTip = bill + tip;
    let billEach = billWithTip / numberPeople;
    document.getElementById('tipValue').innerHTML = formatMoney(tip);
    document.getElementById('totalWithTip').innerHTML = formatMoney(billWithTip);
    document.getElementById('billEach').innerHTML = formatMoney(billEach);
}