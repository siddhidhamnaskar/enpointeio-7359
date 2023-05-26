// import logo from './logo.svg';
import './App.css';
import Banker from './Components/Banker_login';
import Customer from './Components/Customer_login';

function App() {
  return (
    <div className="App">
      <Customer/>
      <Banker/>
    </div>
  );
}

export default App;
