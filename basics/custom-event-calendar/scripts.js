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

let dates = document.querySelector(".dates");
let monthElement = document.querySelector("#month");
let month = monthElement.value;

let totalDays = monthDays[month];

for (let day=1;day<=totalDays;day++) {
    let dayCol = document.createElement("button");
    dayCol.textContent = day;
    dates.appendChild(dayCol);
}

monthElement.addEventListener("change", () => {
    dates.textContent = ""
    month = document.querySelector("#month").value;
    totalDays = monthDays[month];

    for (let day=1;day<=totalDays;day++) {
        let dayCol = document.createElement("button");
        dayCol.textContent = day;
        dates.appendChild(dayCol);
    }
})


