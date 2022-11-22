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
        if (visor[2].innerHTML.length === 0) {
            visor[2].innerHTML = topOperand;
        }
    }
    bottomOperand = visor[2].innerHTML;
    result = operate(operation, topOperand, bottomOperand);
    if (result !== undefined) {
        if (result === "zero division") {
            visor[0].innerHTML = "I'm sorry, Dave. I'm afraid I can't do that."
            operation = "zero-div";
        } else {
            visor[0].innerHTML = result;
            operation = "equal";
        }
        visor[1].innerHTML = "";
        visor[2].innerHTML = "";
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
    visor[0].innerHTML = "";
    visor[1].innerHTML = "";
    visor[2].innerHTML = "";
    topOperand = null;
    operation = null;
    bottomOperand = null;
});

const btnNums = document.querySelectorAll('div#btn-num > button');
btnNums.forEach((btnNum) => {
    btnNum.addEventListener('click', () => {
        if (operation === "equal" || operation === "zero-div") {
            visor[0].innerHTML = btnNum.value;
            operation = null;
        } else if (operation === null) {
            if (visor[0].innerHTML.length < maxLimit) {
                visor[0].innerHTML += btnNum.value;
            }
        } else if (visor[2].innerHTML.length < maxLimit) {
            visor[2].innerHTML += btnNum.value;
        }
    });
});

const btnOps = document.querySelectorAll('div#btn-op > button');
btnOps.forEach((btnOp) => {
    btnOp.addEventListener('click', () => {
        if (operation === "zero-div" || visor[0].innerHTML.length === 0) {
            visor[0].innerHTML = "0";
        }
        if (visor[2].innerHTML.length !== 0) {
            calcResult();
        }
        visor[1].innerHTML = btnOp.innerHTML;
        topOperand = visor[0].innerHTML;
        operation = btnOp.value;
    });
});

const btnEqual = document.querySelector('button#equal');
btnEqual.addEventListener('click', calcResult);