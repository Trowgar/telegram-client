import './App.css';
import {useEffect} from "react";
import Header from "./components/Header/Header";

function App() {
  const telegram = window.Telegram.WebApp;

  useEffect(() =>{
    telegram.ready();
  }, []);

  return (
    <Header />
  );
}

export default App;
