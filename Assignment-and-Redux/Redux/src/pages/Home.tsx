import '../App.css'
import Todos from '../components/Todos'

const Home = () => {
  return (
    <div className="home">
      <h3>Deposit/Withdraw Money</h3>
      <div className="container">
        <button>-</button>
        <span>Update (10)</span>
        <button>+</button>
      </div>
      <Todos />
    </div>
  )
}

export default Home
