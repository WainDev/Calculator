document.addEventListener("DOMContentLoaded", () => {
  const calculator = {
    display: document.querySelector(".calc-result__title"),
    buttons: document.querySelectorAll(".calc-button"),
    currentInput: "0",
    previousInput: "",
    operation: null,
    shouldResetDisplay: false,

    init() {
      this.buttons.forEach((button) => {
        button.addEventListener("click", () => {
          this.handleButtonClick(button.dataset.value);
        });
      });
    },

    handleButtonClick(value) {
      if (value === "=") {
        this.calculate();
      } else if (value === "ac") {
        this.clear();
      } else if (["+", "-", "*", "/"].includes(value)) {
        this.SetOperation(value);
      } else {
        this.appendNumber(value);
      }
    },

    appendNumber(number) {
      if (this.shouldResetDisplay) {
        this.currentInput = "";
        this.shouldResetDisplay = false;
      }
      if (this.currentInput === "0" && number !== ",") {
        this.currentInput = number;
      } else {
        this.currentInput += number;
      }
      this.updateDisplay();
    },

    calculate() {
      let result;
      const first = parseFloat(this.previousInput);
      const second = parseFloat(this.currentInput);

      if (isNaN(first) || isNaN(second)) return;

      switch (this.operation) {
        case "+":
          result = first + second;
          break;
        case "-":
          result = first - second;
          break;
        case "/":
          result = first / second;
          break;
        case "*":
          result = first * second;
          break;
        default:
          return;
      }

      this.currentInput = result.toString();
      this.operation = null;
      this.previousInput = "";
      this.updateDisplay();
    },
    SetOperation(value) {
      if (this.currentInput === "") return;
      if (this.previousInput !== "") {
        this.calculate();
      }
      this.operation = value;
      this.previousInput = this.currentInput;
      this.currentInput = "";
      this.shouldResetDisplay = true;
    },

    clear() {
      this.currentInput = "0";
      this.previousInput = "";
      this.operation = null;
      this.updateDisplay();
    },

    updateDisplay() {
      this.display.textContent = this.currentInput;
    },
  };

  calculator.init();
});
