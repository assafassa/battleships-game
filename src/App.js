import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Navbar from './navbar';
import Home from './Home';
import './styles/home.css'
import Game from './game/Game';
import { useState } from "react";

function App() {
  const [isRedirected, setRedirected] = useState(false);
  const [playername, setPlayername]=useState('');
  const [gameoption,setGameoption]=useState('computer');

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home setRedirected={setRedirected} setGameoption={setGameoption} 
              setPlayername={setPlayername} gameoption={gameoption} playername={playername}/>
            </Route>
            <Route path="/game">
              <Game gameoption={gameoption} playername={playername}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
/*
{isRedirected &&<Route path="/game">
              <Game gameoption={gameoption} playername={playername}/>
            </Route>}
*/