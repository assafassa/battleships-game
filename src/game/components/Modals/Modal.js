import React, { useState } from "react";
import "./Modal.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { closeWebSocket,sendWebSocketMessage,initializeWebSocket,socket } from "../../gamefiles/backend/websocket";


const Modal = ({gameoption,opponent,beforeGame,playerID,setrestartgame,setBeforeGame,}) =>{
  const history=useHistory()
  let isbeforeGamelist
  let stategame
  let isoppon
  let isgameoption
  let isopponent
  let wholeft
  if (beforeGame[0]){
    
    isbeforeGamelist=beforeGame.split(' ');
    stategame=isbeforeGamelist[0]
    isoppon=isbeforeGamelist[1]
    isgameoption=gameoption
    isopponent=opponent
    wholeft=isopponent
    
  }
  
  
  if(stategame=='gameover') {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  

  return (
    <>
      
      {/*gameover online player didnot leave*/}
      {(stategame=='gameover') && (isoppon!='left')&&(isgameoption=='online')&& (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="modalheader"> Gameover</div>
            <div className="buttonlayout">
              <button className="modal-button gameover"
              onClick={()=>{
                if(isoppon=='playagain'){
                  sendWebSocketMessage('restartgame', false,playerID,{})
                  setrestartgame(true)
                }else if (isoppon!='watingforpalyagain'&&isoppon!='watingfornewplayer'){
                  sendWebSocketMessage('playagain', false,playerID,{})
                  setBeforeGame('gameover watingforpalyagain')
                }
              }}
              > to play again with {isopponent}</button>
              <button className="modal-button gameover"
              onClick={()=>{
                if (isoppon!='watingfornewplayer'){
                  sendWebSocketMessage('exit', false,playerID,{})
                  setBeforeGame('gameover watingfornewplayer')
                }
              }
              }
              > to play again with another player</button>
              <button className="modal-button gameover"
              onClick={
                ()=>{
                  if (isoppon!='watingfornewplayer'){
                    sendWebSocketMessage('exit', false,playerID,{})
                  }
                  closeWebSocket(playerID)
                  history.push('/battleships-game')
                }
              }> to go back home</button>
            </div>
            {(isoppon=='playagain')&&(<div className="messageboxgreen">{isopponent} pressed they want to play again!</div>)}
            {(isoppon=='watingforpalyagain')&&(<div className="messagebox">waiting for {isopponent} response </div>)}
            {(isoppon=='watingfornewplayer')&&(<div className="messagebox">waiting for a new player</div>)}
          </div>
        </div>
      )}
      {/*online game opponent left*/}

        {(stategame=='gameover') && (isoppon=='left')&& (isgameoption=='online')&&(
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="modalheader"> {wholeft} left the game</div>
            <p className="modal-text"> You can wait for a new game with another online player <br></br>or press the button to return to the home page.</p>
            <button className="modal-button"onClick={
              ()=>{
                closeWebSocket(playerID)
                history.push('/battleships-game')
              }
            }>Go to Home</button>
            
          </div>
        </div>
      )}

      {/*gameover with computer */}
      {(stategame=='gameover') && (isgameoption=='computer')&&(
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="modalheader"> Gameover</div>
            <div className="buttonlayout">
              <button className="modal-button gameover"
              onClick={()=>{
                setrestartgame(true)
              }}
              > to play again with tour computer</button>
              
              <button className="modal-button gameover"
              onClick={()=>{
                closeWebSocket(playerID)
                history.push('/battleships-game')
              }
            }
              > to go back home</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
 
export default Modal;
