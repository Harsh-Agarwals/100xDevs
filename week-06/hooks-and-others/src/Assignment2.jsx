import React, { useEffect, useMemo, useState } from 'react'

const words = ["hi", "my", "name", "is", "for", "to", "random", "word" ];
const TOTAL_LINES = 1000;
const ALL_WORDS = [];
for (let i = 0; i < TOTAL_LINES; i++) {
    let sentence = "";
    for (let j = 0; j < words.length; j++) {
        sentence += (words[Math.floor(words.length * Math.random())])
        sentence += " "
    }
    ALL_WORDS.push(sentence);
}

const Assignment2 = () => {
    const [sent, setSent] = useState(ALL_WORDS);
    const [inp, setInp] = useState("");

    // const inputText = (e) => {
    //     let inputs = e.target.value;
    //     setInp(inputs);
    //     setSent(sent.filter((x) => x.includes(inputs)));
    // }

    const filterSentences = useMemo(() => {
        return sent.filter(x => x.includes(inp))
    }, [sent, inp]);

    return (
        <div>
            <input type="text" name="inp" id="inp" onChange={(e) => setInp(e.target.value)} value={inp} />
            <ShowSent sentences={filterSentences} />
        </div>
    )
}

function ShowSent ({ sentences }) {
    return (
        <div>
            {sentences.map(s => (
                <p>{s}</p>
            ))}
        </div>
    )
}

export default Assignment2
