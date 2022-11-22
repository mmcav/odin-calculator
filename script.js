function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return 'zero division'
    }
    return x / y;
}

function operate(op, x, y) {
    const fnList = ["add", "subtract", "multiply", "divide"];
    x = parseFloat(x);
    y = parseFloat(y);
    if (fnList.indexOf(op) > -1 && !isNaN(x) && !isNaN(y)) {
        const fn = window[op];
        return fn.apply(null, [x, y]);
    }
}

function calcResult() {
    if (operation !== "zero-div" && operation !== null) {
        if (visor[2].textContent.length === 0) {
            visor[2].textContent = topOperand;
        }
    }
    bottomOperand = visor[2].textContent;
    result = operate(operation, topOperand, bottomOperand);
    if (result !== undefined) {
        if (result === "zero division") {
            visor[0].textContent = "I'm sorry, Dave. I'm afraid I can't do that."
            operation = "zero-div";
        } else {
            visor[0].textContent = result;
            operation = "equal";
        }
        visor[1].textContent = "";
        visor[2].textContent = "";
        topOperand = null;
        bottomOperand = null;
    }
}

const visor = document.querySelectorAll('div#visor > p');
let topOperand = null;
let operation = null;
let bottomOperand = null;
const maxLimit = 15; // it starts losing precision above 16 digits

const clear = document.querySelector('button#clear');
clear.addEventListener('click', () => {
    visor[0].textContent = "";
    visor[1].textContent = "";
    visor[2].textContent = "";
    topOperand = null;
    operation = null;
    bottomOperand = null;
});

const btnNums = document.querySelectorAll('div#btn-num > button');
btnNums.forEach((btnNum) => {
    btnNum.addEventListener('click', () => {
        if (operation === "equal" || operation === "zero-div") {
            visor[0].textContent = btnNum.value;
            operation = null;
        } else if (operation === null) {
            if (visor[0].textContent.length < maxLimit) {
                visor[0].textContent += btnNum.value;
            }
        } else if (visor[2].textContent.length < maxLimit) {
            visor[2].textContent += btnNum.value;
        }
    });
});

const btnOps = document.querySelectorAll('div#btn-op > button');
btnOps.forEach((btnOp) => {
    btnOp.addEventListener('click', () => {
        if (operation === "zero-div" || visor[0].textContent.length === 0) {
            visor[0].textContent = "0";
        }
        if (visor[2].textContent.length !== 0) {
            calcResult();
        }
        visor[1].textContent = btnOp.textContent;
        topOperand = visor[0].textContent;
        operation = btnOp.value;
    });
});

const btnEqual = document.querySelector('button#equal');
btnEqual.addEventListener('click', calcResult);