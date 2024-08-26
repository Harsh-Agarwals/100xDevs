const fs = require('fs');
const { resolve } = require('path');

fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json").then(response => {
    console.log(response);
}).catch(e => {
    console.log(`Error: ${e}`);
})

function returnData() {
    return new Promise((resolve, reject) => {
        fs.readFile("a.txt", "utf-8", (err, data) => {
            resolve(data)
        })
    })
}

returnData().then(res => console.log(res)).catch(e => console.log(`Error: ${e}`))

async function returnJson(link) {
    console.log('here');
    jsn = await fetch(link)
    console.log(jsn.status);
    return jsn   
}

jsn = returnJson("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
console.log('heree');
console.log(jsn);

jsn.then(res => console.log(`Status: ${res.status}`))
