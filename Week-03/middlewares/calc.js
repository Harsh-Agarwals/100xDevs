// const btn = document.querySelector(".submit");
const answer = document.querySelector(".answer");

async function onSubmit(a, b) {
    let getres = await fetch(`http://localhost:3000/sum?a=${a}&b=${b}`);
    let result = await getres.text();
    return result
}

let a = document.querySelector("#a");
let b = document.querySelector("#b");

a.addEventListener("input", async () => {
    let a = document.querySelector("#a").value || null;
    let b = document.querySelector("#b").value || null;
    let result = await onSubmit(a, b);
    answer.innerHTML = result;
})

b.addEventListener("input", async () => {
    let a = document.querySelector("#a").value || null;
    let b = document.querySelector("#b").value || null;
    let result = await onSubmit(a, b);
    answer.innerHTML = result;
})

// btn.addEventListener("click", async (e) => {
//     e.preventDefault();
//     const a = document.querySelector("#a").value;
//     const b = document.querySelector("#b").value;
//     let result = onSubmit(a, b);
//     answer.innerHTML = result;
// })