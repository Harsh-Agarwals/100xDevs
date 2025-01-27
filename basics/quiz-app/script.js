const getJson = async () => {
    let res = await fetch("content.json");
    let qns = await res.json();
    return qns;
}

const questions = await getJson();

const totalQuestions = questions.length;

let questionNumber = document.getElementsByClassName("question-number")[0];
let question = document.getElementsByClassName("question-desc")[0];
let options = document.querySelectorAll(".options button");

const questionIndex = document.getElementById("question-status");

let answers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let correctAnswers = [];

questions.forEach(qn => {
    let correctAnswer = qn["answer"];
    let answerIndex = qn["options"].indexOf(correctAnswer)+1;
    correctAnswers.push(answerIndex);
})

let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let clear = document.querySelector(".clear");
let confirm = document.querySelector(".confirm");

let submit = document.querySelector(".submit");
let earlySubmit = true

let startButtons = document.querySelectorAll(".modal-content button");
let timeOver = document.createElement("h3");

function startTimer (timeCase) {
    let timer = document.getElementsByClassName("time")[0].textContent;
    let min = parseInt(timer.slice(0, timer.indexOf(":")));
    let sec = parseInt(timer.slice(timer.indexOf(":")+1));
    let timerBlock = document.querySelector(".timer");
    let time = min*60 + sec;
    
    if (timeCase == 2) {
        time = 600;
        
        for (let i=0;i<=time;i++) {
            setTimeout(() => {
                let mint = parseInt(i/60);
                let mintShow = parseInt(mint/10)==0 ? `0${mint}`: `${mint}`;
                let sect = i%60;
                let sectShow = parseInt(sect/10)==0 ? `0${sect}`: `${sect}`;
                timerBlock.textContent = `${mintShow}:${sectShow}`;
                if (i==time) {
                    timeOver.textContent = "Oh NO! Time OVER!!";
                    timeOver.style.color = "red";
                }
            }, i*1000);
        }
        setTimeout(() => submit.click(), time*1000);
    } else {
        for (let i=time;i>=0;i--) {
            setTimeout(() => {
                let mint = parseInt(i/60);
                let mintShow = parseInt(mint/10)==0 ? `0${mint}`: `${mint}`;
                let sect = i%60;
                let sectShow = parseInt(sect/10)==0 ? `0${sect}`: `${sect}`;
                timerBlock.textContent = `${mintShow}:${sectShow}`;
                if (i==0) {
                    timeOver.textContent = "Oh NO! Time OVER!!";
                    timeOver.style.color = "red";
                }
            }, (time-i)*1000);
        }
        setTimeout(() => submit.click(), time*1000);
    }
}

for (let i=0;i<startButtons.length;i++) {
    startButtons[i].addEventListener("click", () => {
        let quiz = document.querySelector(".quiz")
        quiz.classList.remove("content");

        let modal = document.querySelector(".modal");
        modal.classList.add("hidden");

        let timer = document.querySelector(".time");

        if (i==0) {
            timer.textContent = "05:00";
        } else if (i==1) {
            let min = Number(document.getElementById("min").value);
            let sec = Number(document.querySelector("#sec").value);

            if (min == 0 & sec == 0) {
                min = 2;
            }

            min = parseInt(min/10)==0 ? `0${min}` : `${min}`
            sec = parseInt(sec/10)==0 ? `0${sec}` : `${sec}`
            
            timer.textContent = `${min}:${sec}`;
        } else {
            timer.textContent = "00:00";
        }
        startTimer(i);
    })
}

submit.addEventListener("click", res => {
    let correct = 0;
    for (let i=0;i<answers.length;i++) {
        if (answers[i] == correctAnswers[i]) {
            correct += 1;
        }
    }
    let resultElement = document.createElement("h3");
    resultElement.classList.add("resultElement");
    resultElement.textContent = `${correct}/10`;

    let quiz = document.querySelector(".quiz")
    quiz.classList.add("content");
    let results = document.querySelector(".results");

    try {
        let resh2 = document.querySelector(".results h2");
        console.log(document.querySelector(".results").classList);
        
        if (earlySubmit) {
            resh2.insertAdjacentElement("beforebegin", timeOver);
        }
    } catch (error) {
        console.log(`Error ${error}`);        
    }

    let resultsHeadline = document.querySelector(".results h2");
    if (!document.querySelector(".resultElement")) {
        resultsHeadline.insertAdjacentElement("afterend", resultElement);
    }
    results.classList.remove("hidden");

    let playagain = document.querySelector(".results .play-again");
    playagain.addEventListener("click", () => {
        window.location.reload();
    })
    earlySubmit=false;
})

const colorStatus = () => {
    let nums = document.querySelectorAll(".question-status li");
    let i=0;
    nums.forEach(num => {
        if (answers[i] >= 1) {
            num.style.backgroundColor = "lightgreen";
        } else {
            num.style.backgroundColor = "lightcyan";
        }
        i+=1;
    })
}
colorStatus();

prev.style.display = "none";

options.forEach(btn => {
    btn.addEventListener("click", e => {
        options.forEach(btn => {
            btn.classList.remove("select");
        })
        btn.classList.toggle("select");
    })
})

confirm.addEventListener("click", e => {
    let i=0;
    let empty = true;
    let current = document.querySelector(".question-number").textContent;
    let currentIndex = current.indexOf('-');
    let currentQuestion = parseInt(current.slice(currentIndex+1));
    options = document.querySelectorAll(".options button");

    options.forEach(btn => {
        if (btn.classList.contains("select")) {
            answers[currentQuestion - 1] = i+1;
            empty = false;
        }
        i+=1;
    })
    if (empty == true) {
        answers[currentQuestion - 1] = 0;
    }
    colorStatus();
})

clear.addEventListener("click", e => {
    options = document.querySelectorAll(".options button");

    options.forEach(btn => {
        if (btn.classList.contains("select")) {
            btn.classList.remove("select");
        }
        btn.style.backgroundColor = "rgb(238, 251, 251)";
    })
})

prev.addEventListener("click", e => {
    let current = document.querySelector(".question-number").textContent;
    let currentIndex = current.indexOf('-');
    let currentQuestion = parseInt(current.slice(currentIndex+1));

    let newQuestion = questions[currentQuestion-2];
    
    questionNumber.textContent = `Question-${currentQuestion-1}`;
    question.textContent = newQuestion.question;
    let optionIndex = 0;
    options.forEach(opt => {
        opt.textContent = newQuestion["options"][optionIndex];
        optionIndex+=1;
    })

    if (currentQuestion-1 == 1) {
        prev.style.display = "none";
        next.style.display = "inline";
    } else {
        prev.style.display = "inline";
        next.style.display = "inline";
    }

    let answer = answers[currentQuestion - 2];
    let optionIndex2 = 0;
    options.forEach(btn => {
        if (btn.classList.contains("select")) {
            btn.classList.remove("select");
        }
        btn.style.backgroundColor = "rgb(238, 251, 251)";
        if (answer != 0 & optionIndex2+1==answer) {
            btn.classList.add("select");
        }
        optionIndex2+=1;
    })

    options.forEach(btn => {
        btn.addEventListener("click", e => {
            options.forEach(btn => {
                btn.classList.remove("select");
            })
            btn.classList.toggle("select");
        })
    })
})

next.addEventListener("click", e => {
    let current = document.querySelector(".question-number").textContent;
    let currentIndex = current.indexOf('-');
    let currentQuestion = parseInt(current.slice(currentIndex+1));

    let newQuestion = questions[currentQuestion];
    
    questionNumber.textContent = `Question-${currentQuestion+1}`;
    question.textContent = newQuestion.question;
    let optionIndex = 0;
    options.forEach(opt => {
        opt.textContent = newQuestion["options"][optionIndex];
        optionIndex+=1;
    })

    if  (currentQuestion+1 == 10) {
        next.style.display = "none";
        prev.style.display = "inline"
    } else {
        prev.style.display = "inline";
        next.style.display = "inline";
    }

    let answer = answers[currentQuestion];
    let optionIndex2 = 0;
    options.forEach(btn => {
        if (btn.classList.contains("select")) {
            btn.classList.remove("select");
        }
        btn.style.backgroundColor = "rgb(238, 251, 251)";
        if (answer != 0 & optionIndex2+1==answer) {
            btn.classList.add("select");
        }
        optionIndex2+=1;
    })

    options.forEach(btn => {
        btn.addEventListener("click", e => {
            options.forEach(btn => {
                btn.classList.remove("select");
            })
            btn.classList.toggle("select");
        })
    })
})

questionIndex.addEventListener("click", e => {
    let questionAsked = parseInt(e.target.textContent);
    let newQuestion = questions[questionAsked-1]; 
    
    questionNumber.textContent = `Question-${questionAsked}`;
    question.textContent = newQuestion.question;
    let optionIndex = 0;
    options.forEach(opt => {
        opt.textContent = newQuestion["options"][optionIndex];
        optionIndex+=1;
    })

    if (questionAsked == 1) {
        prev.style.display = "none";
        next.style.display = "inline";
    } else if  (questionAsked == 10) {
        next.style.display = "none";
        prev.style.display = "inline"
    } else {
        prev.style.display = "inline";
        next.style.display = "inline";
    }

    let answer = answers[questionAsked - 1];
    let optionIndex2 = 0;
    options.forEach(btn => {
        if (btn.classList.contains("select")) {
            btn.classList.remove("select");
        }
        btn.style.backgroundColor = "rgb(238, 251, 251)";
        if (answer != 0 & optionIndex2+1==answer) {
            btn.classList.add("select");
        }
        optionIndex2+=1;
    })

    options.forEach(btn => {
        btn.addEventListener("click", e => {
            options.forEach(btn => {
                btn.classList.remove("select");
            })
            btn.classList.toggle("select");
        })
    })
})
