function checkReturnType(x: (string | number)[]) {
    return x[0];
}

const n = [1, 3, 6];
const k = checkReturnType(n);
console.log(k);

const n2 = [1, "3", 6];
const k2 = checkReturnType(n2);
console.log(k2);
// console.log(k2.toLowerCase());

function returnType<K>(arr: K[]): K {
    return arr[0]
};

const kk = returnType<string>(["asdfb", "bdafd", "nrrsg"]);
const kk2 = returnType<number>([1, 6, 3]);

interface Usern22 {
    name: string,
    age?: number
}

const kk3 = returnType<Usern22>([{name: 'abdbadf', age: 23}, {name: 'babd', age: 63}, {name: 'nbec'}]);

console.log(kk, kk2);
console.log(kk.toUpperCase());
console.log(kk3.name);
