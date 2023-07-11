//global Variables
let calcNumbers = document.getElementsByClassName('number');
let calcOperators = document.getElementsByClassName('operator');
let calcOutput = document.getElementsByClassName('output')[0]
let history = [];
let clear = document.getElementsByClassName('clear')[0];
let equals = document.getElementsByClassName('equals')[0];
let allClear = document.getElementsByClassName('all_clear')[0];
let k = 0;
let hasDecimal = false;


// on click functions

function backOnClickHande() {
    if (calcOutput.innerHTML !== 'PlaceHolder') {
        let length = calcOutput.innerHTML.length
        if (calcOutput.innerHTML[length - 1] === '.') {
            hasDecimal = false
        }
        calcOutput.innerHTML = calcOutput.innerHTML.slice(0, -1);
    }
    else {
        alert('Try pressing a different button!')
    }
}

function allClearOnClickHandle() {
    calcOutput.innerHTML = '';
    history = [];
    k=0;
    document.getElementsByClassName('history')[0].innerHTML = '';
}

function equalsOnClickHandler() {
    if (calcOutput.innerText === 'PlaceHolder' || calcOutput.innerHTML === '') {
        alert("Try hitting numbers first! ")
    }
    else {
        let toEvaluate = calcOutput.innerHTML
        history.push(calcOutput.innerHTML)
        let result = eval(toEvaluate)
        let formattedResult = Number.isInteger(result) ? result.toFixed(0) : result.toFixed(3);
        // calcOutput.innerHTML = eval(toEvaluate).toFixed(3)
        calcOutput.innerHTML = formattedResult
        history.push(calcOutput.innerHTML)
        if (document.getElementsByClassName('history')[0].innerHTML === '') {
            document.getElementsByClassName('history')[0].innerText = `${history[k]} = ${history[k + 1]}`
            k += 2;
        }
        else {
            document.getElementsByClassName('history')[0].innerText += `\n ${history[k]} = ${history[k + 1]}`;
            k += 2;
        }
    }
}

function clearOnClickHandler() {
    calcOutput.innerHTML = ' '
    hasDecimal = false
}

function numbersNnClickHandler() {
    let keeper = calcOutput.innerText.length
    if (calcOutput.innerHTML === "PlaceHolder") {
        calcOutput.innerHTML = this.innerHTML
    }
    else{
        calcOutput.innerText += this.innerHTML
    }
}

function dotNnClickHandler() {
    let keeper = calcOutput.innerText.length
    if (calcOutput.innerHTML === "PlaceHolder") {
        calcOutput.innerHTML = this.innerHTML
        hasDecimal = true
    }
    else {
        calcOutput.innerText += this.innerHTML
        hasDecimal = true
    }
}

function operatorsOnClickHandler() {
    if (calcOutput.innerHTML === "PlaceHolder" || calcOutput.innerHTML === '') {
        alert("Please Select numbers first!")
    }
    else {
        calcOutput.innerText += this.innerHTML
    }
}


// add onClick events

for (let i = 0; i < calcNumbers.length; i++) {
    calcNumbers[i].addEventListener('click', numbersNnClickHandler)
}
for (let i = 0; i < calcOperators.length; i++) {
    calcOperators[i].addEventListener('click', operatorsOnClickHandler)
}
document.getElementsByClassName('dot')[0].addEventListener('click', dotNnClickHandler)
clear.addEventListener('click', clearOnClickHandler)
equals.addEventListener('click', equalsOnClickHandler)
allClear.addEventListener('click', allClearOnClickHandle)
document.getElementsByClassName('back_button')[0].addEventListener('click', backOnClickHande)


//add keyboard events

document.addEventListener('keydown', function (e) {

    let key = e.key;

    //numbers
    if (/[0-9]/.test(key)) {
        const numberButton = document.querySelector(`.number[data-value='${key}']`);
        if (numberButton) {

            numberButton.click()
        }
    }
    //operators
    if (/[+-/*]/.test(key)) {
        const operatorButtons = document.querySelector(`.operator[data-value='${key}']`);
        if (operatorButtons) {
            operatorButtons.click();
            hasDecimal = false;
        }
    }
    //equals 
    if (/[=]/.test(key)) {
        const equalsButton = document.querySelector(`.equals[data-value='${key}']`);
        if (equalsButton) {
            equalsButton.click()
        }
    }
    //decimal point
    if (key === '.') {
        const dotButton = document.getElementsByClassName('dot')[0];
        if (dotButton && !hasDecimal) {
            dotButton.click();
            hasDecimal = true;
        }
    }
    //equals enter key
    if (key === 'Enter') {
        const equalsButton = document.getElementsByClassName('equals')[0];
        if (equalsButton) {
            e.preventDefault()
            equalsButton.click();
        }
    }

    //all delete and backspace keys
    if (/DEL/.test(key) || /Delete/.test(key) || /Backspace/.test(key)) {
        const backButton = document.querySelector(`.back_button[data-value='${key}']`);
        if (backButton) {
            e.preventDefault()
            backButton.click()
        }
    }
})
