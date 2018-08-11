class Processor {
  constructor() {
    this.que = [];
    this.cache = [];

    this.isCalcurated = false;
    this.tempNumber = "";
    this.tempFunc = "";
  }

  reset() {
    this.que = [];
    this.tempNumber = "";
    this.tempFunc = "";
    this.isCalcurated = false;
  }

  input(par) {
    const { type, value } = par;

    if (type === "func") {
      if (this.tempNumber) {
        const number = this.tempNumber;
        if (!this.que.length) {
          this.que.push(this._createProc("multiply", number));
        } else {
          this.que.push(this._createProc(this.tempFunc, number));
        }
        this.tempNumber = "";
      }

      if (value !== "calc") {
        this.tempFunc = value;
        this.isCalcurated = false;
      } else {
        if (this.isCalcurated) {
          this.que.push(this.que[this.que.length - 1]);
        }
        this.isCalcurated = true;
        return this.calc();
      }
    }

    if (type === "number") {
      if (this.isCalcurated) {
        throw new Error("Please Click the +,-,*,/ before Number");
      } else {
        this.tempNumber += value;
      }
    }
  }

  calc() {
    return this.que.reduce((x, func) => func(x), 1);
  }

  _createProc(func, number) {
    switch (func) {
      case "multiply":
        return x => parseFloat(x) * parseFloat(number);
      case "divide":
        return x => parseFloat(x) / parseFloat(number);
      case "plus":
        return x => parseFloat(x) + parseFloat(number);
      case "minus":
        return x => parseFloat(x) - parseFloat(number);
    }
  }

  _sort() {}
}

export default Processor;