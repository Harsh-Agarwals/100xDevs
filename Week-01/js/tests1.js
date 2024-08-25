class Calculator {
    constructor(result) {
        this.result = result;
    }
    add(num) {
        this.result += num
    }
    subtract(num) {
        this.result -= num
    }
    multiply(num) {
        this.result*=num
    }
    divide(num) {
        if (num==0) {
            throw "Wrong variable";
        }
        this.result/=num
    }
    clear() {
        this.result = 0
    }
    getResult() {
        return this.result
    }
    calculate(expression) {
        return true
    }
}

let calculator1 = new Calculator()
calculator1.clear()
calculator1.add(5)
calculator1.add(3)
console.log(calculator1.getResult())
calculator1.subtract(5)
calculator1.subtract(3)
calculator1.add(4)
calculator1.multiply(3)
console.log(calculator1.getResult());
calculator1.divide(4)
calculator1.divide(0)
console.log(calculator1.getResult());


