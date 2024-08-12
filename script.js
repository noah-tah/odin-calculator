let firstNum = null;
let secondNum = null;
let operand = null;
let operandSelected = false;
let resultDisplayed = false;
let chainOperation = false;
let result = null;
const numRange = "0123456789";
const mathRange = "/*-+";
const decimal = ".";

document.addEventListener("DOMContentLoaded", () => {
    const screen = document.querySelector("#calculator-screen");
    const buttons = getButtons();
    const clearButton = getClearButton();
});

function handleButton(choice) {
    if (numRange.includes(choice)) {
        handleNumber(choice);
    } else if (mathRange.includes(choice)){
        handleOperand(choice);
    } else if (choice.toLowerCase() === "clear") {
        handleClear();
    } else if (choice === "=") {

        handleEquals();
    } else if (choice === decimal) {
        handleDecimal();
    }
}

function handleNumber(choice) {
    if (chainOperation) {
        secondNum = choice;
        clearScreen();
        displayNum(secondNum);
        chainOperation = false;
    } else if (firstNum === null) {
        firstNum = choice;
        displayNum(firstNum);
    } else if (operandSelected) {
        secondNum = choice;
        clearScreen();
        displayNum(secondNum);
        removeOperandSelected(operand);
    } else if (firstNum) {
        if (!secondNum) {
            firstNum += choice;
            clearScreen();
            displayNum(firstNum);
        } else {
            secondNum += choice;
            clearScreen();
            displayNum(secondNum);
        }

    }
}

function handleOperand(choice) {
    if (operand === null) {
        operand = choice; 
        showOperandSelected(operand);
    } else if (operand) {
        clearScreen();
        let result = operate(firstNum, secondNum, operand);
        firstNum = result;
        operand = choice;
        secondNum = null;
        displayNum(result);
        chainOperation = true;
    }
}

function handleClear() {
        if (operandSelected) {
            removeOperandSelected(operand);
        }
        clearScreen();
        clearAllChoices();
}

function handleEquals() {
        clearScreen();
        let result = operate(firstNum, secondNum, operand);
        displayNum(result);
        clearAllChoices();
        firstNum = result;
        resultDisplayed = true;
}

function handleDecimal() {
    if (operand === "") {
        if (!firstNum.includes(decimal)) {
            firstNum += choice;
            clearScreen();
            displayNum(firstNum);
        }
    } else if (mathRange.includes(operand)) {
        if (!secondNum.includes(decimal)) {
            secondNum += choice;
            clearScreen();
            displayNum(secondNum);
        }
    }
}

function getButtons() {
    const buttonsArray = document.querySelectorAll(".buttons");
    for (let button of buttonsArray) {
        button.addEventListener("click", () => {
            let choice = button.innerHTML;
            handleButton(choice);
        });
    }
    return buttonsArray;
}


function getClearButton() {
    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", () => {
        let choice = "clear"; 
        return choice;
    });
}

function displayNum(num) {
    const numberLine = document.querySelector("#number-line");
    const number = document.createElement('p');
    number.innerHTML = num;
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
        if (x === 0 && y === 0) {
            result = "Cannot divide hopes and dreams either.";
        } else if (y === 0) {
            result = "Cannot divide by dreams.";
        } else {
            result = divide(x, y);
        }
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

function showOperandSelected(operand) {
    if (mathRange.includes(operand)) {
        const operandButton = document.querySelector(`#${CSS.escape(operand)}`);
        if (operandButton) {
            operandButton.classList.add("button-pressed");
            operandSelected = true;
        } else {
            console.warn(`No element found with ID: ${operand}`);
        }
    } else {
        console.warn(`Operand ${operand} is not in the mathRange.`);
    }
}

function removeOperandSelected(operand) {
    const operandButton = document.querySelector(`#${CSS.escape(operand)}`);
    if (operandButton) {
        operandButton.classList.remove("button-pressed");
        operandSelected = false;
    } else {
        console.warn(`No element found with ID: ${operand}`);
    }
}

function clearScreen() {
    const numberLine = document.querySelector("#number-line");
    if (numberLine) {
        const numberList = document.querySelectorAll(".numbers");
        for (i = 0; i < numberList.length; i++) {
            numberLine.removeChild(numberList[i]);
        }
       } else {
        console.warn(`No element found within ID: number-line`);
    }
}

function clearAllChoices() {
    firstNum = null;
    secondNum = null;
    operand = null;
}

