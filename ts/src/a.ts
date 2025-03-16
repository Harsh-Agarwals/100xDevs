const nm: string = 'harsh';

function hello(name: string) {
    console.log(`Hello, ${name}`);    
}

// an another function
function sum(a: number, b: number): string {
    return (a+b).toString();
}

function eighteenPlus(age: number): boolean {
    return age>=18;
}

function nestedFunction(fn: () => void): void {
    setTimeout(() => {
        fn();
    }, 1000);
}

function func(): void {
    console.log("harshharsh");
}

hello(nm);
const sm = sum(5, 7);
console.log(sm);

const harsh: boolean = eighteenPlus(25);
const ansh = eighteenPlus(12);
console.log(`Harsh: ${harsh}, Ansh: ${ansh}`);

nestedFunction(func);

