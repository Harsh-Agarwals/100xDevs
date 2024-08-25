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
        if (num === 0) {
            this.clear();
            return new Error("Cannot divide by zero");
        }
        this.result /= num;
    }
    
    clear() {
        this.result = 0
    }
    getResult() {
        return this.result
    }
    calculate(expression) {
        try {
            return eval(expression.split('').filter(x => x!=' ').join(''))
        } catch(e) {
            console.log("Bad Code!")
        }
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
console.log(calculator1.calculate('2 + 3 * 4'));
console.log(calculator1.calculate('(   15 + 3) /   6   '));
console.log(calculator1.calculate('(2 + 3) * (6 - (4 + 1) / 2) + 7'));
console.log(calculator1.calculate('10 / 0'));
console.log(calculator1.calculate('10 + (2 + 3'));





