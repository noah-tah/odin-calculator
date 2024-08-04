let firstNum = '';
let secondNum = '';
let operand = '';
document.addEventListener("DOMContentLoaded", () => {
    const screen = document.querySelector("#calculator-screen");
    const buttons = getButtons();
    const clearButton = getClearButton();
});

function getButtons() {
    const buttonsArray = document.querySelectorAll(".buttons");
    for (let button of buttonsArray) {
        button.addEventListener("click", () => {
            let choice = button.innerHTML;
            handleButtonClick(choice);
        });
    }
    return buttonsArray;
}



function handleButtonClick(choice) {
    const numRange = "0123456789";
    const mathRange = "/*-+=.";
    if (choice.toLowerCase() === "clear") {
        clearScreen();
    } else if (numRange.includes(choice)) {
        if (operand === '') {
            firstNum += choice; 
            displayNum(firstNum);
        } else {
            secondNum += choice;
            displayNum(secondNum);
        }
    } else if (choice === "=") {
        displayNum(operate(firstNum, secondNum, operand));
    } else if (mathRange.includes(choice)){
        operand = choice;
        operandSelected(operand);
        displayNum(operand);
    } else {
        console.log("if statement fired");
        displayNum((operate(firstNum, secondNum, operand)));
    }
}

function getClearButton() {
    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", () => {
        let choice = "clear"; 
        return choice;
    });
}

function displayNum(choice) {
    const numberLine = document.querySelector("#number-line");
    const number = document.createElement('p');
    number.innerHTML = choice;
    number.classList.add("numbers");
    numberLine.appendChild(number);
}

function operate(x, y, operator) {
    x = parseFloat(x);
    y = parseFloat(y);
    let result;
    if (operator === "+") {
        result = add(x, y);
    } else if (operator === "-") {
        result = subtract(x, y);
    } else if (operator === "/") {
        result = divide(x, y);
    } else if (operator === "*") {
        result = multiply(x, y);
    }
    return result;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}


function operandSelected(operand) {
    console.log(operand);
    const operandButton = document.querySelector(`#${operand}`);
    operandButton.classList.add("button-pressed");
}