import React from 'react';
import Square from './Square';

const Board = ({board,placeShip,ships}) => {


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
            <Square  
              key= {`${rowIndex}:${colIndex}`} 
              x={rowIndex} 
              y={colIndex} 
              board={board} 
              placeShip={placeShip}
              ships={ships}
            />
          ))}
        </div>
      ))}
    </div>
  );
};


 
export default Board;

