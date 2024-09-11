import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Navbar from './navbar';
import Home from './Home';
import './styles/home.css'
import Game from './game/Game';
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const history=useHistory()
  const [isRedirected, setRedirected] = useState(false);
  const [playername, setPlayername]=useState('');
  const [playerID, setPlayerID]=useState(null);
  const [gameoption,setGameoption]=useState('computer');
  const [opponent,setopponent]=useState(null);
  ////dont forget sound
  const [sound,setsound]=useState(true);
  return (
    <Router>
      <div className="App">
        <Navbar playerID={playerID} setsound={setsound} sound={sound}opponent={opponent}/>
        <div className="content">
          <Switch>
            <Route exact path="/battleships-game">
              <Home setopponent={setopponent}setRedirected={setRedirected} setGameoption={setGameoption} 
              setPlayername={setPlayername} gameoption={gameoption} playername={playername}
              playerID={playerID} setPlayerID={setPlayerID}
              />
            </Route>
            <Route path="/battleships-game/game">
              {isRedirected &&
              <Game sound={sound} setPlayerID={setPlayerID} setGameoption={setGameoption}setopponent={setopponent}opponent={opponent}gameoption={gameoption} playername={playername} playerID={playerID}/>
              }
            </Route>
            <Route path="/battleships-game"/>
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
