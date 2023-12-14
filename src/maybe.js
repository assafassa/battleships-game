/*
If a boat can spread to two cells, you can modify the Boat and Board components accordingly. Here's an updated example where a boat occupies multiple cells:

Modify the Boat component to specify the size of the boat:
jsx
Copy code
// Boat.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Boat = ({ id, size, position }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BOAT',
    item: { id, size, position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const boatStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue', // Customize boat styling
    opacity: isDragging ? 0.5 : 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div ref={drag} style={boatStyle}>
      Boat
    </div>
  );
};

export default Boat;
Modify the Board component to handle boats with sizes:
jsx
Copy code
// Board.js
import React from 'react';
import { useDrop } from 'react-dnd';

const Board = ({ size, boats, onDrop }) => {
  const [, drop] = useDrop({
    accept: 'BOAT',
    drop: (item, monitor) => onDrop(item, monitor.getClientOffset()),
  });

  const cellSize = 40; // Adjust the cell size as needed

  const renderCell = (row, col) => {
    const position = { row, col };
    const boat = boats.find((b) => b.position.row === row && b.position.col === col);

    return (
      <div
        key={`${row}-${col}`}
        style={{
          width: cellSize * (boat?.size || 1),
          height: cellSize,
          border: '1px solid #ddd',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {boat && <Boat {...boat} />}
      </div>
    );
  };

  const renderRow = (row) => {
    return (
      <div key={row} style={{ display: 'flex' }}>
        {Array.from({ length: size }).map((_, col) => renderCell(row, col))}
      </div>
    );
  };

  return (
    <div ref={drop} style={{ display: 'flex', flexDirection: 'column', border: '2px solid #000', width: size * cellSize, margin: '20px' }}>
      {Array.from({ length: size }).map((_, row) => renderRow(row))}
    </div>
  );
};

export default Board;
Update the main App component to use boats with sizes:
jsx
Copy code
// App.js
import React, { useState } from 'react';
import Board from './Board';
import Boat from './Boat';

const App = () => {
  const boardSize = 8;
  const [boats, setBoats] = useState([]);

  const handleDrop = (item, clientOffset) => {
    // Calculate the cell position based on the client offset
    const row = Math.floor(clientOffset.y / 40);
    const col = Math.floor(clientOffset.x / 40);

    const updatedBoats = [...boats, { id: item.id, size: item.size, position: { row, col } }];
    setBoats(updatedBoats);
  };

  return (
    <div>
      <h1>Draggable Board</h1>
      <Board size={boardSize} boats={boats} onDrop={handleDrop} />
      <Boat id="boat1" size={2} position={{ row: 0, col: 0 }} />
      <Boat id="boat2" size={3} position={{ row: 1, col: 2 }} />
    </div>
  );
};

export default App;
In this example, the Boat component now receives a size prop, and the Board component adjusts the cell width based on the boat's size. The main App component demonstrates how to use boats with different sizes on the board.
*/