import './App.css';
import Home from './pages/Home'
import Header from './components/Common/Header/Header'
import Footer from './components/Common/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Home/>
      <Footer />
    </div>
  );
}

export default App;
