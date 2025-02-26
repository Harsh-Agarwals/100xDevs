const answer = document.querySelector(".answer");
let a = document.querySelector("#a");
let b = document.querySelector("#b");

function debounce(func, delay) {
    let timeOut;
    return function (...args) {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            func(...args);
        }, delay);
    }
}

async function onSubmit() {
    let a = document.querySelector("#a").value || null;
    let b = document.querySelector("#b").value || null;
    console.log(a, b);
    
    let getres = await fetch(`http://localhost:3000/sum?a=${a}&b=${b}`);
    let result = await getres.text();
    answer.innerHTML = result;
}

a.addEventListener("input", debounce(onSubmit, 1000));

b.addEventListener("input", debounce(onSubmit, 1000));
