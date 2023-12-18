
import {React ,useState,useEffect} from 'react';
import { useDrop } from 'react-dnd';
import Ship from './Ship'

const Square = ({beforeGame, player,board,placeShip, x, y, ships}) => {
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
        backgroundColor: 'rgba(1, 1, 1, 0.4)',
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
            player={player}
            beforeGame={beforeGame}
        />}
        {isship&&isexplotion&&<div>
            <img src={`${process.env.PUBLIC_URL}/images/expolotions/4.gif` }
            style={{
                height:'40px',
                width:'40px',
                transform: 'translate(0%, -100%)',
            }}
            ></img>
        </div>
        }
        {(!isship)&&isexplotion&&<div
            style={{
                height:'35px',
                width:'35px',
                backgroundColor:'rgba(94, 76, 252, 0.4)'
            }}
            >
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
