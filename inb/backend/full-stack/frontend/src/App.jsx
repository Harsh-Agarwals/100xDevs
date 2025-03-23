import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const[joke, setJoke] = useState([]);

  useEffect(() => {
    axios.get("/api/jokes")
    .then((response) => {
      setJoke(response.data)
    })
    .catch(e => {
      console.log(`Error: ${e}`);
    })
  })
  
  return (
    <>
      <div>
          Hello, Harsh!!
      </div>
      <div className="joke">
        <h2>Jokes: {joke.length}</h2>
        {
          joke.map((j) => {
            return (
            <div key={j.joke_id}>
              <h3>Joke {j.joke_id}</h3>
              <p>{j.joke}</p>
            </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
