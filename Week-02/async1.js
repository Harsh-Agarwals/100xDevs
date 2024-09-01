function counter() {
    const mins = 2;
    const seconds = mins*60;
    let second = 0;
    let secondTrack = 0
    let nowTime = new Date()
    let intervals = setInterval(() => {
        second = second%60;
        let min = parseInt(secondTrack/60);
        console.log(`${("0"+min).slice(-2)}:${("0"+second).slice(-2)}`);
        second += 1;
        secondTrack += 1;
    }, 1000)
    setTimeout(() => {
        clearInterval(intervals)
        console.log("Time Ended");
        let endTime = new Date();
        let interval = endTime - nowTime;
        console.log("Total Interval: "+interval);        
    }, (seconds+1)*1000);
}

// counter()

function timeout(second) {
    setTimeout(() => {
        console.log(second);        
    }, 1000);
}

async function counter2() {
    const mins = 2;
    let seconds = mins*60;
    while(seconds!=0) {
        await timeout(seconds)
        seconds -= 1;
    }
}

counter2();