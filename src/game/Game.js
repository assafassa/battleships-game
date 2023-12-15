import React, { useState } from 'react';
import _ from 'lodash';
import Board from './Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './gamefiles/game.css'
import {opopnentboard,opponentships} from './gamefiles/control'
import Headboard from './Headboard';

const Game = ({gameoption,playername}) => {
  const [opopnentBoard,setopopnentBoard]=useState(opopnentboard)
  const [opponentShips,setopponentShips]=useState(opponentships)
  
  const [board, setBoard] = useState([
    ['00', '31', '32', '33', '00', '00', '00', '41', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '42', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '43', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '44', '00', '00'],
    ['11', '12', '13', '14', '15', '16','00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00','00', '00', '00'],
    ['00', '00', '00', '00', '00', '21', '00','00', '00', '00'],
    ['00', '00', '00', '00', '00', '22', '00','00', '00', '00'],
    ['00', '00', '00', '00', '00', '23', '00','00', '00', '00'],
    ['00', '00', '00', '00', '00', '24', '00','00', '00', '00']
  ]);
  const [ships, setShips] = useState([
    {
      id: 1,
      type: 'ship1',
      length:6,
      isHorizontal: true,
      images: ['ship1/1.png', 'ship1/2.png', 'ship1/3.png', 'ship1/4.png', 'ship1/5.png', 'ship1/6.png'],
      position: ['40', '41', '42', '43', '44', '45'], 
      sunk:true
    },
    {
      id: 2,
      type: 'ship2',
      length:4,
      isHorizontal: false,
      images: ['ship2/1.png', 'ship2/2.png', 'ship2/3.png', 'ship2/4.png'],
      position: ['65', '75', '85', '95'], 
      sunk:false
    },
    {
      id: 3,
      type: 'ship3',
      length:3,
      isHorizontal: true,
      images: ['ship3/1.png', 'ship3/2.png', 'ship3/3.png'],
      position: ['01', '02', '03'],
      sunk:false 
    },
    {
      id: 4,
      type: 'ship4',
      length:4,
      isHorizontal: false,
      images: ['ship4/1.png', 'ship4/2.png', 'ship4/3.png', 'ship4/4.png'],
      position: ['07', '17', '27','37'], 
      sunk:false
    },
    // ... add more ships
  ]);
  
  const [beforeGame, setbeforeGame]=useState(false)
  const placeShip = (shipnum,photonum,row, col,action) => {
    if (!beforeGame){
      return(false)
    }
    let check=0
    let newShips=_.cloneDeep(ships);
    let newBoard=_.cloneDeep(board);
    let ship=ships[shipnum-1]
    let shiplength=ship.length
    let switchaction
    if (action=='turn')
      if(ship.isHorizontal){
        newShips[shipnum-1].isHorizontal=false
        switchaction=true
      }else {
        newShips[shipnum-1].isHorizontal=true
      }
    else if (action=='move'){
      if(!ship.isHorizontal){
        switchaction=true
      }
    }
    
    if (row>=(photonum-1) && row<=(9-shiplength+photonum) && switchaction){
      
      ship.position.map((spot, index) => {
        
        newBoard[spot[0]][spot[1]]='00'
        
      });
      for (let i = 0; i < photonum; i++) {
        if (board[(row-i)][col][0]==0||board[(row-i)][col][0]==`${shipnum}` ){
          newBoard[(row-i)][col]=`${shipnum}${(photonum-i)}`
          newShips[shipnum-1].position[photonum-i-1]=`${row-i}${col}`
        }else{
          check=2

        }
        ;
      }
      for(let i = 1; i < (shiplength-photonum+1); i++) {
        if (board[(row+i)][col][0]==0||board[(row+i)][col][0]==`${shipnum}`){
          newBoard[(row+i)][col]=`${shipnum}${(photonum+i)}`
          newShips[shipnum-1].position[photonum+i-1]=`${row+i}${col}`
        }else{
          check=1
        }
        ;
      }
      if (check==0){
        setBoard(newBoard)
        setShips(newShips)
      }else if (check!=0){
        return(false)
      }
    }else if (col>=(photonum-1) && col<=(9-shiplength+photonum) &&(!switchaction)){
      
      ship.position.map((spot, index) => {
        
        newBoard[spot[0]][spot[1]]='00'
    
      });
      for (let i = 0; i < photonum; i++) {
        if (board[(row)][col-i][0]==0 ||board[(row)][col-i][0]==`${shipnum}`){
          newBoard[(row)][col-i]=`${shipnum}${(photonum-i)}`
          newShips[shipnum-1].position[photonum-i-1]=`${row}${col-i}`
        }else{
          check=2

        }
        ;
      }
      for(let i = 1; i < (shiplength-photonum+1); i++) {
        if (board[(row)][col+i][0]==0||board[(row)][col+i][0]==`${shipnum}`){
          newBoard[(row)][col+i]=`${shipnum}${(photonum+i)}`
          newShips[shipnum-1].position[photonum+i-1]=`${row}${col+i}`
        }else{
          check=1
        }
        ;
      }
      if (check==0){
        setBoard(newBoard)
        setShips(newShips)
      }else if (check!=0){
        return(false)
      }
    }
    

  };
  const [chosenspot,setchosenspot]=useState('999')
  const choosequare=(row,col)=>{
    let newoponBoard=_.cloneDeep(opopnentBoard)
    if (opopnentBoard[(chosenspot[0])][(chosenspot[1])]=='008'||chosenspot=='999'){
        newoponBoard[(chosenspot[0])][(chosenspot[1])]='00'
        newoponBoard[row][col]='008'
        setopopnentBoard(newoponBoard)
        setchosenspot(`${row}${col}`)

    }
  }
  const updatemyboard=()=>{

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
          <button className='js-button readybutton' onClick={()=>setbeforeGame(false)}>Ready</button>
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
