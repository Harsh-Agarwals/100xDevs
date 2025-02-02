const express = require("express");
const cors = require("cors");
const references = require("./reference");

// METHOD-1
require('dotenv').config();
const PORT = process.env.PORT;
console.log(PORT);

// METHOD-2
// const { PORT } = require("./utils")
// console.log(PORT);

function hashing(num) {
    let hash = [];
    while (num!= 0) {
        let rem = num%62;
        hash.push(rem);
        num = parseInt(num/62);
    }
    const mappedHash = hash.map((n) => {
        return references.slice(n, n+1);
    })
    return mappedHash.reverse().join('');
}

let answer1 = hashing(1115710);
console.log(answer1);
