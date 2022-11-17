const display1El = document.querySelector(".display1");
const display2El = document.querySelector(".display2");
const display3El = document.querySelector(".display3");
const numberEl = document.querySelectorAll(".number");
const operatorEl = document.querySelectorAll(".operator");
const equalEl = document.querySelector(".equals");
const clearAllEl = document.querySelector(".clear-all");
const clearLastEl = document.querySelector(".clear-last-entry");

let display1 = "";
let display2 = "";
let tempResult = null;
let operation = "";
let haveDot = false;
let zeroAgain = false;

numberEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true; //--------------------------------------------First . in the number
    } else if (e.target.innerText === "." && haveDot) {
      return; //----------------------------------------------------If already contains '.' -> return
    }
    display2 += e.target.innerText;
    display2El.innerText = display2;
  });
});

operatorEl.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (!display2) return;
    haveDot = false;

    if (display2 === ".") {
      return;
    }

    const opName = e.target.innerText;
    if (display1 && display2 && operation) {
      compute();
    } else {
      tempResult = parseFloat(display2);
    }
    display(opName); //----------------------------------------------- passing opName only for display
    operation = opName;
  });
});

function display(op = "") {
  display1 += display2 + " " + op + " ";
  display1El.innerText = display1;
  display2El.innerText = "";
  display2 = "";
  display3El.innerText = tempResult;
}

function compute() {
  if (operation === "x") {
    tempResult *= parseFloat(display2);
  } else if (operation === "+") {
    tempResult += parseFloat(display2);
  } else if (operation === "-") {
    tempResult -= parseFloat(display2);
  } else if (operation === "/") {
    tempResult /= parseFloat(display2);
  } else if (operation === "%") {
    tempResult %= parseFloat(display2);
  }
}

clearAllEl.addEventListener("click", () => {
  display1 = "";
  display2 = "";
  tempResult = null;
  operation = "";
  haveDot = false;

  display1El.innerText = "0";
  display2El.innerText = "0";
  display3El.innerText = "0";
});

clearLastEl.addEventListener("click", () => {
  display2 = "";
  display2El.innerHTML = "0";
});

equalEl.addEventListener("click", () => {
  if (!display1 || !display2) return;
  haveDot = false;
  compute();
  display();
  display2El.innerText = tempResult;
  display3El.innerText = "0";
  display2 = tempResult; //------------------------------- Dont clear tempResult, store for next operations
  display1 = "";
  display1El.innerText = "0";
  //   console.log(tempResult);
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickNumber(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*" || e.key === "x") {
    clickOperation("x");
  } else if (e.key == "Enter" || e.key === "=") {
    equalEl.click();
  }
});

function clickNumber(key) {
  numberEl.forEach((number) => {
    if (number.innerText === key) {
      number.click();
    }
  });
}

function clickOperation(key) {
  operatorEl.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
