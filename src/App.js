import './App.css';
import {useEffect} from "react";

const telegram = window.Telegram.WebApp;

function App() {
    useEffect(() =>{
        telegram.ready();
    }, []);

    const closeApp = () => {
        telegram.close();
    }
  return (
    <div className="App">
     <button onClick={closeApp}>Close</button>
    </div>
  );
}

export default App;
