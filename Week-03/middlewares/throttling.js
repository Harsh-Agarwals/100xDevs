const btn = document.querySelector(".throttle");

function throttle(func, delay) {
    let shouldCall = true;
    return function(...args) {
        if (!shouldCall) return;
        func(...args);
        shouldCall = false;

        setTimeout(() => {
            shouldCall = true;
        }, delay);
    }
}

function toPrint() {
    console.log("Throttle");
}

btn.addEventListener('click', throttle(toPrint, 1000));