var a = 5;
console.log(a);
a = 6;
console.log(a);

function varVslet() {
    let x = 5;
    var y = 6;
    console.log(x, y);

    try {
        let x = 8;
        var y = 3;
        console.log(x, y);
    } catch {(e) => {
        console.log("Error: ", e);
    }}
    console.log(x, y);
    // So, let variable values are available only in the block it is defined
    // var variable values are available throughtout the function block, even though it's nested deep inside
}

varVslet();

function returnEven(num) {
    if (num%2==0) {
        return num;
    }
}

function square(num) {
    return num*num;
}

function findBiggest(arr) {
    return arr.sort().slice(-1)
}

let arr = [2, 3, 5, 56, 12, 634, 73, 74, 77, 23, 27, 72, 70, 9, 4, 194, 29]
console.log(arr.filter(returnEven));
console.log(arr.map(square));
console.log(arr.sort().slice(-1));
console.log(findBiggest(arr));

let max = arr.reduce((accumulator, currentValue) => currentValue>=accumulator?currentValue:accumulator, arr[0])
console.log(max);

console.log(arr);
arr.forEach((x) => console.log(x));

for(let i=0;i<parseInt(arr.length/2);i++) {
    firstIndex = i
    secondIndex = arr.length-1-i

    let temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex]
    arr[secondIndex] = temp
}

console.log(arr);

persons = [
    {person: 'Harsh', gender:'male'},
    {person: "Time", gender: 'male'},
    {person: "Lisa", gender: 'female'},
    {person: "Carter", gender: 'female'}
]

console.log(persons.filter((p) => p.gender=='male'))

