// Ship.js
import React from 'react';
import { useDrag, DragPreviewImage} from 'react-dnd';

const Ship = ({beforeGame, player,board,placeShip, x, y, ships}) => {
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
    let darkmode
    let cursoricon
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
    if(!(ships[Number(shipnum)-1].sunk)){
      darkmode='brightness(1.0)'
    }else{
      darkmode='brightness(0.3)'
    }
    if(beforeGame){
      cursoricon='grab'
    }else if (!beforeGame){
      cursoricon='auto'
    }

  return (
    <div>
          
        <DragPreviewImage connect={preview} src={`${process.env.PUBLIC_URL}/images/ships/ship${shipnum}/full${verimage}.png`} />   
        <img src={`${process.env.PUBLIC_URL}/images/ships/ship${shipnum}/${photonum}.png`} 
        alt="Ship" 
        style={{ width: '40px',
        height: '40px',
        transform: imageStyle,
        cursor: cursoricon,
        filter:darkmode,
        }}
        onDoubleClick={() => {
          if (beforeGame==true){
            placeShip(shipnum,photonum,x,y,'turn')
          }
        }}
        ref={drag} 
        />
        
    </div>
  );
};

export default Ship;