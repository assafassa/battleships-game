// Ship.js
import React from 'react';
import { useDrag, DragPreviewImage} from 'react-dnd';

const Ship = ({board,placeShip, x, y, ships}) => {
    const [{ isDragging }, drag, preview] = useDrag({
        type: 'SHIP',
        item: () => ({
          type: 'SHIP',
          id: board[x][y],
        }),
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
    });

    let isHorizontal
    let imageStyle
    let shipnum
    let photonum
    let verimage
    shipnum=Number(board[x][y][0])
    photonum=Number(board[x][y][1])
    isHorizontal=ships[Number(shipnum)-1].isHorizontal
    if (isHorizontal){
        imageStyle='rotate(0deg)'
        verimage=''

    }else{
        imageStyle='rotate(90deg)'
        verimage='ver'
    }
    
    

  return (
    <div>
          
        <DragPreviewImage connect={preview} src={`${process.env.PUBLIC_URL}/images/ships/ship${shipnum}/full${verimage}.png`} />   
        <img src={`${process.env.PUBLIC_URL}/images/ships/ship${shipnum}/${photonum}.png`} 
        alt="Ship" 
        style={{ width: '40px',
        height: '40px',
        position: 'absolute' ,
        transform: imageStyle,
        cursor: 'grab',
        }}
        onDoubleClick={() => placeShip(shipnum,photonum,x,y,'turn')}
        ref={drag} 
        />
        
    </div>
  );
};

export default Ship;