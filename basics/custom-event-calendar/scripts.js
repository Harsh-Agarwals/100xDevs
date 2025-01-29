let monthDays = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31
};

let colors = ["red", "green", "blue", "yellow"];

let eventLists = {};

let dates = document.querySelector(".dates");
let monthElement = document.querySelector("#month");
let month = monthElement.value;
let description = document.querySelector(".desc");
let cut = document.querySelector(".cut");
let bg = document.querySelector(".bg");
let inputForm = document.querySelector(".inputForm");

inputForm.addEventListener("submit", e => {
    e.preventDefault();
    let eventName = document.getElementById("newEvent");
    let selectedDay = document.querySelector(".selectedDay");
    if (eventName.value.length >= 1) {
        if (!eventLists[selectedDay.textContent]) {
            eventLists[selectedDay.textContent] = [];
        }
        if (!eventLists[selectedDay.textContent].includes(eventName.value)) {
            eventLists[selectedDay.textContent].push(eventName.value);
        } else {
            alert(`${eventName.value} already present.`);
        }
        eventName.value = "";
        eventName.focus();
        let events = document.querySelector(".events");
        events.innerHTML = "";
        if (eventLists[selectedDay.textContent]) {
            let lists = eventLists[selectedDay.textContent];
            for(let i=0;i<lists.length;i++) {
                let newLi = document.createElement("li");
                newLi.textContent = lists[i];
                events.appendChild(newLi);
            }
        }
    }
})

document.addEventListener('keydown', e => {
    if (e.code == "Escape") {
        // description.classList.add("hidden");
        // bg.classList.remove("less-visible");
        cut.click();
    }
})

cut.addEventListener("click", () => {
    description.classList.add("hidden");
    bg.classList.remove("less-visible");
})

let totalDays = monthDays[month];

let color = colors[Math.floor(Math.random()*4)];
for (let day=1;day<=totalDays;day++) {
    let dayCol = document.createElement("button");
    dayCol.classList.add(color);
    dayCol.textContent = day;
    dates.appendChild(dayCol);
}

document.querySelectorAll(".dates button").forEach(btn => {
    btn.addEventListener("click", () => {
        let description = document.querySelector(".desc");
        if (description.classList.contains("hidden")) {
            description.classList.remove("hidden");
            let date = btn.textContent;
            let selectedDay = document.querySelector(".selectedDay");
            let displayDate = `${month} ${date}`;
            selectedDay.textContent = displayDate;
            let events = document.querySelector(".events");
            events.innerHTML = "";
            if (eventLists[displayDate]) {
                let lists = eventLists[displayDate];              
                for(let i=0;i<lists.length;i++) {
                    let newLi = document.createElement("li");
                    newLi.textContent = lists[i];
                    events.appendChild(newLi);
                }
            }
            let bg = document.querySelector(".bg");
            bg.classList.add("less-visible");
            let eventName = document.getElementById("newEvent");
            eventName.focus();
        }
    })
})

monthElement.addEventListener("change", () => {
    dates.textContent = "";
    month = document.querySelector("#month").value;
    totalDays = monthDays[month];
    color = colors[Math.floor(Math.random()*4)];

    for (let day=1;day<=totalDays;day++) {
        let dayCol = document.createElement("button");
        dayCol.classList.add(color);
        dayCol.textContent = day;
        dates.appendChild(dayCol);
    }

    document.querySelectorAll(".dates button").forEach(btn => {
        btn.addEventListener("click", () => {
            let description = document.querySelector(".desc");
            if (description.classList.contains("hidden")) {
                description.classList.remove("hidden");
                let date = btn.textContent;
                let selectedDay = document.querySelector(".selectedDay");
                let displayDate = `${month} ${date}`;
                selectedDay.textContent = displayDate;
                let events = document.querySelector(".events");
                events.innerHTML = "";
                if (eventLists[displayDate]) {
                    let lists = eventLists[displayDate];
                    for(let i=0;i<lists.length;i++) {
                        let newLi = document.createElement("li");
                        newLi.textContent = lists[i];
                        events.appendChild(newLi);
                    }
                }
                let bg = document.querySelector(".bg");
                bg.classList.add("less-visible");
                let eventName = document.getElementById("newEvent");
                eventName.focus();
            }
        })
    })
})

