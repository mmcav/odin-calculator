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
        if (result === Infinity || isNaN(result)) {
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
const maxLimit = 16; // it starts losing precision above 16 digits

const btnClear = document.querySelector('button#clear');
btnClear.addEventListener('click', (e) => {
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

const btnPoint = document.querySelector('button#point');
btnPoint.addEventListener('click', () => {
    if (operation === "equal" || operation === "zero-div") {
        visor[0].textContent = '.';
        operation = null;
    } else if (operation === null) {
        if (visor[0].textContent.indexOf('.') === -1) {
            visor[0].textContent += '.';
        }
    } else if (visor[2].textContent.indexOf('.') === -1) {
        visor[2].textContent += '.';
    }
});

const btnBack = document.querySelector('button#backspace');
btnBack.addEventListener('click', () => {
    if (operation === "equal" || operation === "zero-div") {
        visor[0].textContent = "";
        operation = null;
    } else if (operation === null) {
        if (visor[0].textContent.length > 0) {
            visor[0].textContent = visor[0].textContent.slice(0, -1);
        }
    } else if (visor[2].textContent.length > 0) {
        visor[2].textContent = visor[2].textContent.slice(0, -1);
    }
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

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Delete':
        case 'Escape':
            btnClear.click();
            break;
        case '1':
            btnNums[0].click();
            break;
        case '2':
            btnNums[1].click();
            break;
        case '3':
            btnNums[2].click();
            break;
        case '4':
            btnNums[3].click();
            break;
        case '5':
            btnNums[4].click();
            break;
        case '6':
            btnNums[5].click();
            break;
        case '7':
            btnNums[6].click();
            break;
        case '8':
            btnNums[7].click();
            break;
        case '9':
            btnNums[8].click();
            break;
        case '0':
            btnNums[9].click();
            break;
        case ',':
        case '.':
            btnPoint.click();
            break;
        case 'Backspace':
            btnBack.click();
            break;
        case '+':
            btnOps[0].click();
            break;
        case '-':
            btnOps[1].click();
            break;
        case '*':
            btnOps[2].click();
            break;
        case '/':
            e.preventDefault();
            btnOps[3].click();
            break;
        case '=':
        case 'Enter':
            btnEqual.click();
            break;
    }
});