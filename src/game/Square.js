
import React from 'react';
import { useDrop } from 'react-dnd';
import Ship from './Ship'

const Square = ({board,placeShip, x, y, ships}) => {
    const [,drop]=useDrop({
        accept:'SHIP',
        drop:(item)=>{
            let shipnum=Number(item.id[0])
            let photonum=Number(item.id[1])
            placeShip(shipnum,photonum,x,y,'move')}
    })
    let isship
    let isexplotion
    if (board[x][y][0]!=0){
        isship=true
        if(board[x][y][2]==7){
            isexplotion=true
            console.log('expload')
        }else{
            isexplotion=false
        }
    }else if (board[x][y][0]==0){
        isship=false
        if(board[x][y][2]==7){
            isexplotion=true
        }else{
            isexplotion=false
        }
    }
    
    return (
    <div
    style={{
        width: '38px',
        height: '38px',
        border: '1px solid rgba(1, 1, 1, 0.2)',
        backgroundColor: 'rgba(1, 1, 1, 0.2)',
        boxSizing: 'border-box',
        zIndex:'0'
    }}
    ref={drop}
    >

        {isship &&<Ship
            key= {`${x}:${y}`} 
            x={x} 
            y={y} 
            board={board} 
            placeShip={placeShip}
            ships={ships}
        />}
        {isship&&isexplotion&&<div>
            <img src={`${process.env.PUBLIC_URL}/images/expolotions/4.gif` }
            style={{
                height:'40px',
                width:'40px',
                transform: 'translate(0%, -0%)',
            }}
            ></img>
        </div>
        }
        {(!isship)&&isexplotion&&<div>
            <img src={`${process.env.PUBLIC_URL}/images/expolotions/x.png` }
            style={{
                height:'40px',
                width:'40px',
            }}
            ></img>
        </div>
        }
    
    </div>
    )
};
 
export default Square;
