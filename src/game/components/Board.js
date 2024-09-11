import React from 'react';
import Square from './Square';
import Opponentsquare from './Opponentquare';

const Board = ({beforeGame, player,board,actfunction,ships}) => {

  function chooseplayer(player,rowIndex,colIndex){
    if (player=='me'){
      return(
        <Square
              player={player}  
              key= {`${rowIndex}:${colIndex}`} 
              x={rowIndex} 
              y={colIndex} 
              board={board} 
              placeShip={actfunction}
              ships={ships}
              beforeGame={beforeGame}
            />
      )
    }else if(player=='opopnent'){
      return(
        <Opponentsquare
              player={player}  
              key= {`${rowIndex}:${colIndex}`} 
              x={rowIndex} 
              y={colIndex} 
              board={board} 
              choosequare={actfunction}
              ships={ships}
              beforeGame={beforeGame}
            />
      )
    }
  }
  // Create an array representing rows and columns
  const rows = Array.from({ length: 10 });

  return (
    <div className="board"
    style={{
      display: 'grid',
      gridTemplateRows: 'repeat(10, 40px)',
      border: '2px solid rgba(1, 1, 1, 0.2)',
      width: '400px',
      height: '400px',
      marginLeft: '30px',
      backgroundColor: 'transparent',
      position: 'relative',
    }}
    >
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="board-row"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 40px)',
        }}
        >
          {Array.from({ length: 10 }).map((_, colIndex) => (
            chooseplayer(player,rowIndex,colIndex)
          ))}
        </div>
      ))}
    </div>
  );
};


 
export default Board;

