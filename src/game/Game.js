import React, { useState ,useEffect} from 'react';
import Board from './components/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './gamefiles/game.css'
import Headboard from './components/Headboard';
import { aopopnentBoard, aopponentShips,aboard,aships} from './gamefiles/frontend/gameState';
import{useReactiveGame} from './gamefiles/frontend/reactiveGame'
import{readytoplay,takechosenspot,getoponchosenspot} from './gamefiles/backend/controler'
import _ from 'lodash';
const Game = ({gameoption,playername}) => {
  const [opopnentBoard, setOpopnentBoard] = useState(aopopnentBoard)
  const [opponentShips, setOpponentShips] = useState(aopponentShips)
  const [board, setBoard] = useState(aboard)
  const [ships, setShips] = useState(aships)
  const [beforeGame, setBeforeGame] = useState(true);
  const [chosenSpot, setChosenSpot] = useState('999');
  const [newsboard, setnewsboard] = useState('beforeGame');
  const{
    aplaceShip,
    achoosequare,
  } = useReactiveGame();
  
  useEffect(() => {
    // This code runs whenever the 'newsboard' state changes
    console.log('newsboard has changed:', newsboard);
  }, [newsboard]);

  const placeShip=(shipnum,photonum,row, col,action)=>{
    let result=aplaceShip(beforeGame,board,ships,shipnum,photonum,row, col,action)
    if (result==false){
      return(false)
    }else{
      let {newBoard,newShips}=result
      setBoard(newBoard)
      setShips(newShips)
    }
    
  }
  const choosequare=(row,col)=>{
    let result=achoosequare(chosenSpot,opopnentBoard,row,col)
    if (result==false){ 
    }else{
      let {newoponBoard,newChosenspot}=result
      setOpopnentBoard([...newoponBoard])
      setChosenSpot(newChosenspot)

    }
  }
  const readybuttonhandler =async()=>{
    if (beforeGame==true){
      setBeforeGame(false)
      readytoplay()
      setnewsboard('chooseSpot')
    }else if (chosenSpot!='998'){
      let thechosenSpot=_.cloneDeep(chosenSpot)
      setChosenSpot('998')
      setnewsboard('shager')
      let result=await takechosenspot(thechosenSpot,opopnentBoard,opponentShips)
      let{newboard,newships,isgameover,news}=result
      setOpopnentBoard([...newboard])
      setOpponentShips([...newships])
      //add value to see what happend
      if (isgameover=='gameover'){
        setnewsboard('you won')
        console.log('you won')
        return('')
      }else{
        setnewsboard('you '+news)
      }
      let newresult=await getoponchosenspot(board,ships,newboard)
      setBoard([...newresult.newboard])
      setShips([...newresult.newships])
      //add value to see what happend
      if (newresult.isgameover=='gameover'){
        setnewsboard('you lost')
        return('')
      }else{
        setnewsboard('you got '+newresult.news)
      }
      setTimeout(() => {
        setOpopnentBoard([...newresult.randomspotboard])
        setChosenSpot(newresult.newspot)
        setnewsboard('chooseSpot')
      }, 5000);

    }
  }


  return (
    <DndProvider backend={HTML5Backend}>
      <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >
        <div className="me"
        style={{
          display: 'block',
        }}
        >
          <div className='name'>{playername}</div>
          <div className="littleboard">
            <Headboard ships={ships}/>
          </div>
          <div className="boarddisplay">
            <Board player={'me'} board={board} actfunction={placeShip} ships={ships} beforeGame={beforeGame} />
          </div>
        </div>
        <div className='middle'>
          <button className='js-button readybutton' onClick={readybuttonhandler}>Ready</button>
          <div className='messegebord'>
            messeage 

          </div>
        </div>
        <div className="opponent"
        style={{
          display: 'block',
        }}
        >
        
          <div className='name'>{gameoption}</div>
          <div className="littleboard">
            <Headboard ships={opponentShips}/>
          </div>
          <div className="boarddisplay">
            <Board player={'opopnent'} board={opopnentBoard} actfunction={choosequare} ships={opponentShips}beforeGame={beforeGame} />
          </div>
          
          
        </div>
        
    </div>
  </DndProvider>
  )
  
};

export default  Game;
