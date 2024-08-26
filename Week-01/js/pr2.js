function callingFunction() {
    return new Promise((res, req) => {
        setTimeout(() => {
            console.log("Hi there1!");
            res(100);
        }, 3000);
    })
}

async function main() {
    const value = await callingFunction();
    console.log("Hii");
    console.log(value);    
}

console.log("Here");
main();
console.log("Here after main");
