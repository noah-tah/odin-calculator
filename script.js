let firstNum = '';
let secondNum = '';
let operand = '';
const numRange = "0123456789";
const mathRange = "/*-+=.";
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
// TODO: don't display operand

function handleButtonClick(choice) {
    if (choice.toLowerCase() === "clear") {
        clearScreen();
    } else if (numRange.includes(choice)) {
        if (operand === '') {
            firstNum += choice; 
            displayNum(firstNum);
        } else {
            secondNum += choice;
            removeOperandSelected(operand); // gets rid of button pressed background color
            removeCurrentNumber();
            displayNum(firstNum);
        }
    } else if (choice === "=") {
        removeCurrentNumber();
        displayNum(operate(firstNum, secondNum, operand));
    } else if (mathRange.includes(choice)){
        operand = choice;
        operandSelected(operand);
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
    if (mathRange.includes(operand)) {
        const operandButton = document.querySelector(`#${CSS.escape(operand)}`);
        if (operandButton) {
            operandButton.classList.add("button-pressed");
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
    } else {
        console.warn(`No element found with ID: ${operand}`);
    }
}

function clearScreen() {
    firstNum = '';
    secondNum = '';
    operand = '';
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

function removeCurrentNumber() {
    const numberLine = document.querySelector("#number-line");
    if (numberLine) {
        const firstNum = document.querySelector(".numbers");
        if (firstNum) {
            numberLine.removeChild(firstNum);
        } else {
            console.warn("No element found within class: numbers");
        }
    } else {
        console.warn("No element found within ID: number-line");
    }

}