import React, { useState } from "react";
import "./Modal.css";



const Modal = ({gameoption,opponent,beforeGame}) =>{
  console.log(beforeGame)
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
    isgameoption='computer'
    isopponent='natasha'
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
              <button className="modal-button gameover"> to play again with {isopponent}</button>
              <button className="modal-button gameover"> to play again with another player</button>
              <button className="modal-button gameover"> to go back home</button>
            </div>
            {(isoppon=='playagain')&&(<div className="messagebox">{isopponent} pressed they want to play again!</div>)}
          </div>
        </div>
      )}
      {/*online game opponent left*/}

        {(stategame=='gameover') && (isoppon=='left')&& (isgameoption=='online')&&(
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="modalheader"> {wholeft} left the game</div>
            <p className="modal-text"> You can wait for a new game with another online player <bd></bd>or press the button to return to the home page.</p>
            <button className="modal-button">Go to Home</button>
            
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
              <button className="modal-button gameover"> to play again with tour computer</button>
              <button className="modal-button gameover"> to play with another player</button>
              <button className="modal-button gameover"> to go back home</button>
            </div>
            <div className="messagebox"></div>
          </div>
        </div>
      )}
    </>
  );
}
 
export default Modal;