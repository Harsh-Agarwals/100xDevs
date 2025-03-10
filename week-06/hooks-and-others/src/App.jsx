import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';

// let counter = 4;

const App = () => {

  // Basics

  // const t = [{
  //   'id': 1,
  //   'title': 'eat x',
  //   'description': 'eating x'
  // }, {
  //   'id': 2,
  //   'title': 'eat y',
  //   'description': 'eating y'
  // }, {
  //   'id': 3,
  //   'title': 'eat z',
  //   'description': 'eating z'
  // }];
  // const [todos, setTodos] = useState(t);

  // function addTodoBtn() {
  //   setTodos([...todos, {
  //     'id': counter++,
  //     'title': 'asvda',
  //     'description': 'asb asdjvi brj'
  //   }])
  // }

  // return (
  //   <>
  //     <button onClick={addTodoBtn}>Add Todo</button>
  //     {todos.map(todo => {
  //       return <Todo key={todo.id} title={todo.title} description={todo.description} />
  //     })}
  //   </>
  // )

  // Problem-2: Wrapper Components

  // return <div>
  //     {/* <h1>hello wo</h1> */}
  //     {/* <WrapperComp innerComponent={<JustAcomp />} /> */}
  //     <WrapperComp>
  //       hi there
  //     </WrapperComp>
  //     <WrapperComp>
  //       <WrapperComp>
  //         hi there222
  //       </WrapperComp>
  //     </WrapperComp>
  //   </div>

  // Problem-3 useEffect external API Calling
  // const [jokes, setJokes] = useState([]);
  // const ref = useRef(false);

  // const [joke, setJoke] = useState([]);

  // useEffect(() => {
  //   if (ref.current) return;
  //   ref.current = true;
  //   axios.get("https://icanhazdadjoke.com/", {
  //     headers: {
  //       'Accept': 'application/json'
  //     }
  //   })
  //   .then(res => {
  //     let joke = res.data;
  //     setJokes([...jokes, joke]);
  //   })
  // }, [])

  // useEffect(() => {
  //   console.log(jokes);    
  // }, [jokes]);

  // function clickBtn() {
  //   axios.get("https://icanhazdadjoke.com/", {
  //     headers: {
  //       'Accept': 'application/json'
  //     }
  //   })
  //   .then(res => {
  //     let joke = res.data;
  //     setJokes([...jokes, joke]);
  //   })
  // }

  // Example -4 pagination
//   return (<div>
//     <div style={{display: "flex", flexDirection: 'row'}}>
//       <GetBtn btnId={"aaUKeahqWvc"} jokes={joke} setJoke={setJoke} />
//       <GetBtn btnId={"nWvcUD5orrc"} jokes={joke} setJoke={setJoke} />
//       <GetBtn btnId={"EIJmGY8Etrc"} jokes={joke} setJoke={setJoke} />
//       <GetBtn btnId={"ysHQZvcpbFd"} jokes={joke} setJoke={setJoke} />
//     </div>
//     {/* <button onClick={clickBtn}>Add Joke</button> */}
//     <RenderJokes jokes={joke} />
//   </div>)
// }

// function GetBtn ({ btnId, jokes, setJoke }) {

//   function getJokeById(e) {
//     e.preventDefault();
//     axios(`https://icanhazdadjoke.com/j/${btnId}`, {
//       headers: {
//         'Accept': 'application/json'
//       }
//     })
//     .then(res => {
//       let joke = res.data.joke;
//       // setJoke([...jokes, {'joke': joke, 'id': btnId}]);
//       setJoke([{'joke': joke, 'id': btnId}]);
//     })
//   }

//   useEffect(() => {
//     console.log(jokes);
//   }, [jokes]);

//   return (
//     <div style={{margin: "4px"}}>
//       <button onClick={getJokeById}>{btnId}</button>
//     </div>
//   )

  // Example-5 memoization
  let [count, setCount] = useState(0);
  let [num, setNum] = useState(0);

  const incCount = (e) => {
    e.preventDefault();
    setCount(count += 1);
  }

  // Using useMemo, only 1 rerender happens, when num changes
  const sum = useMemo(() => {
    console.log('memo called here');
    
    let s = 0;
    for (let i=1;i<=num;i++) {
      s += i;
    }
    return s;
  }, [num]);

  // Method 2, using useEffect: Will invoke 2 rerenders: first when num changes, and second when total changes;
  const [total, setTotal] = useState(0);
  useEffect(()=> {
    let s = 0;
    for (let i=1;i<=num;i++) {
      s += i;
    }
    setTotal(s);
  }, [num]);

  function changeNum (e) {
    setNum(parseInt(e.target.value) || 0);
  }

  return (
    <div>
      <form>
        <input type="number" name="num" id="num" onChange={changeNum} placeholder='Number' />
        <div>Sum is {sum}</div>
        <button onClick={incCount}>Count is {count}</button>
      </form>
    </div>
  )
}

function RenderJokes ({ jokes }) {
  return (<div>
    {jokes.map(joke => (
      <div key={joke.id}>
        <h1>{joke.joke}</h1>
        <p>{joke.id}</p>
      </div>
    ))}
  </div>)
}

function WrapperComp ({ children }) {
  console.log(children);
  
  return <div style={{'border': "2px solid black"}}>
      {children}
    </div>
}

function JustAcomp () {
  return <div>
      Hello
    </div>
}

// function Todo({ title, description }) {
//   return (
//     <>
//       <h1>{title}</h1>
//       <h2>{description}</h2>
//     </>
//   )
// }

export default App
