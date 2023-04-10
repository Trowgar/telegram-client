import './App.css';
import {useEffect} from "react";
import Header from "./components/Header/Header";
import {useTelegram} from "./hooks/useTelegram";

function App() {
  const {onToggleButton, telegram} = useTelegram();

  useEffect(() =>{
    telegram.ready();
  }, [telegram]);

  return (
    <div className="App">
      <Header />
      <button onClick={onToggleButton}>Toggle</button>
    </div>
  );
}

export default App;
