
import React from 'react';
import Ship from './Ship';

const Opponentsquare = ({beforeGame,player,choosequare,board, x, y, ships}) => {
    let isship
    let isexplotion
    let isshipsunk
    let explotionlocation
    let cursoricon='auto'
    let ischosensquare='rgba(1, 1, 1, 0.4)'
    if(beforeGame!=true){
        if (board[x][y][0]!=0){
            isship=true
            if(board[x][y][2]==7){
                isexplotion=true
                try {
                    if(ships[board[x][y][0]-1].sunk==true){
                        explotionlocation='translate(0%, -100%)'
                        isshipsunk=true
                    }
                }catch(error){
                    isshipsunk=false
                    explotionlocation='translate(0%, 0%)'
                }
            }else{
                isexplotion=false

            }
        }else if (board[x][y][0]==0){
            isship=false
            if(board[x][y][2]==7){
                isexplotion=true
            }else if (board[x][y][2]==8){
                isexplotion=false
                ischosensquare='rgba(246, 145, 255, 0.8)'

            }else{
                cursoricon='pointer'
                isexplotion=false
                ischosensquare='rgba(1, 1, 1, 0.4)'
            }
        }
    }
    return (
    <div
    style={{
        width: '38px',
        height: '38px',
        border: '1px solid rgba(1, 1, 1, 0.2)',
        backgroundColor: ischosensquare,
        boxSizing: 'border-box',
        zIndex:'0',
        cursor:cursoricon,
    }}
    onClick={()=>{
        if (!beforeGame&&cursoricon=='pointer'){
            choosequare(x,y)
        }
    }}
    >

        {isshipsunk &&<Ship
            key= {`${x}:${y}`} 
            x={x} 
            y={y} 
            board={board} 
            placeShip={choosequare}
            ships={ships}
            player={player}
        />}
        {isship&&isexplotion&&<div>
            <img src={`${process.env.PUBLIC_URL}/images/expolotions/4.gif` }
            style={{
                height:'40px',
                width:'40px',
                transform: explotionlocation,
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
 
export default Opponentsquare;
