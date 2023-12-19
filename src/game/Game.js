import React, { useState ,useEffect,useRef} from 'react';
import Board from './components/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './gamefiles/game.css'
import Headboard from './components/Headboard';
import News from './components/News'
import Livechat from './components/Livechat';
import { aopopnentBoard, aopponentShips,aboard,aships} from './gamefiles/frontend/gameState';
import{useReactiveGame} from './gamefiles/frontend/reactiveGame'
import{readytoplay,takechosenspot,getoponchosenspot,comgetoponchosenspot,comtakechosenspot} from './gamefiles/backend/controler'
import _, { set } from 'lodash';
import {sendWebSocketMessage,socket} from './gamefiles/backend/websocket'

const Game = ({playerID, opponent, gameoption,playername}) => {
  ////use states
  const [opopnentBoard, setOpopnentBoard] = useState(aopopnentBoard)
  const [opponentShips, setOpponentShips] = useState(aopponentShips)
  const [board, setBoard] = useState(aboard)
  const [ships, setShips] = useState(aships)
  const [beforeGame, setBeforeGame] = useState(true);
  const [chosenSpot, setChosenSpot] = useState('999');
  const [ooponchosenSpot, setOpponChosenSpot] = useState(null);
  const [ooponresult, setOpponResult] = useState(null);
  const [newsboard, setnewsboard] = useState('beforeGame');
  const [chatmessages,setChatmessage]=useState([])
  const[onemessage,setOneMessage]=useState(null)
  const [isgameoption,setIsGameOption]=useState(null)
  const [isopponready,setIsOpponReady]=useState(false)
  const chatContainerRef = useRef(null);


  ///use effect
  useEffect(() => {
    if (socket&&isgameoption){
        const sockethandle= (e) => {
            let receivedData = JSON.parse(e.data)
            if (receivedData.subject=='livechat'){
              if (receivedData.ready){
                setIsOpponReady(true)
              }
              setOneMessage(receivedData.body)
            }
            else if(receivedData.subject=='chosenspot'){
              setOpponChosenSpot(receivedData.body.chosenSpot)
            }else if(receivedData.subject=='result'){
              setOpponResult(receivedData.body)
            }
        }
        socket.removeEventListener('message',sockethandle)
        socket.addEventListener('message',sockethandle)
    }
  }, [isgameoption]);
  useEffect(() => {
    if (socket&&isgameoption&&onemessage){
        setChatmessage([...chatmessages,onemessage])
        setOneMessage(null)
    }
  }, [onemessage]);
  useEffect(() => {
    if (isgameoption&&chatmessages){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatmessages]);

  useEffect(() => {
    if (beforeGame=='wait'){
                  
      setBeforeGame(false)
      readytoplay()
      setnewsboard('chooseSpot')
      opopnentBoard[0][0]='008'
      setOpopnentBoard([...opopnentBoard])
      setChosenSpot('00')
    }
  }, [isopponready]);

  useEffect(() => {
    if (ooponchosenSpot){
      setTimeout(() => {
        let result =getoponchosenspot(ooponchosenSpot,board,ships,opopnentBoard)    
        opponentmove(result)
        sendWebSocketMessage('result', false,playerID,{result:result.result,news:result.news,chosenSpot:ooponchosenSpot})
        setOpponChosenSpot(null)
      }, 3000);
    }
  }, [ooponchosenSpot]);
  useEffect(() => {
    if (ooponresult){
      let result =takechosenspot(ooponresult.result,ooponresult.news,ooponresult.chosenSpot,opopnentBoard,opponentShips)
      mymove(result)
      setOpponResult(null)
    }
  }, [ooponresult]);
  useEffect(() => {
  }, [newsboard]);
  if (!isgameoption){
    if (opponent){
      setIsGameOption(opponent)
    }else{
      setIsGameOption(gameoption)
    }
  }
  const{
    aplaceShip,
    achoosequare,
  } = useReactiveGame();
  





  ///client functions
  const placeShip=(shipnum,photonum,row, col,action)=>{
    let result=aplaceShip(beforeGame,board,ships,shipnum,photonum,row, col,action)
    if (result==false){
      return(false)
    }else{
      let {newBoard,newShips}=result
      setBoard(newBoard)
      setShips(newShips)
    }
    
  }
  const choosequare=(row,col)=>{
    let result=achoosequare(chosenSpot,opopnentBoard,row,col)
    if (result==false){ 
    }else{
      let {newoponBoard,newChosenspot}=result
      setOpopnentBoard([...newoponBoard])
      setChosenSpot(newChosenspot)

    }
  }

 ///comunictation functions
 

  const comreadybuttonhandler =async()=>{
    if (beforeGame==true){
      setBeforeGame(false)
      readytoplay()
      setnewsboard('chooseSpot')
    }else if (chosenSpot!='998'){
      let thechosenSpot=_.cloneDeep(chosenSpot)
      setChosenSpot('998')
      setnewsboard('shager')
      let result=await comtakechosenspot(thechosenSpot,opopnentBoard,opponentShips)
      let{newboard,newships,isgameover,news}=result
      let isstop=mymove(result)
      if (!isstop){
        let newresult=await comgetoponchosenspot(board,ships,newboard)
        opponentmove(newresult)
      }
      

    }
  }
  const onlinereadybuttonhandler =async()=>{
    if (beforeGame==true){
      setBeforeGame('wait')
      sendchathandle(`${playername} ready`,'rgba(102, 155, 101, 0.619)','rgba(22, 64, 21, 0.619)',true)
    }else if (beforeGame==false &&chosenSpot!='998'){
      let thechosenSpot=_.cloneDeep(chosenSpot)
      setChosenSpot('998')
      setnewsboard('shager')
      sendWebSocketMessage('chosenspot', false,playerID,{chosenSpot:thechosenSpot})

    }
  }
  
  const mymove=(result)=>{
    let{newboard,newships,isgameover,news}=result
      setOpopnentBoard([...newboard])
      setOpponentShips([...newships])
      //add value to see what happend
      if (isgameover=='gameover'){
        setnewsboard('won')
        return(true)
      }else{
        setnewsboard('you '+news)
        setTimeout(() => {
          setnewsboard(null)
        }, 3000);
        return(false)
      }
  }
  const opponentmove=(newresult)=>{
    setBoard([...newresult.newboard])
    setShips([...newresult.newships])
    //add value to see what happend
    if (newresult.isgameover=='gameover'){
      setnewsboard('lost')
      return('')
    }else{
      setnewsboard('opponent '+newresult.news)
      setTimeout(() => {
        if (beforeGame=='wait'){
          setBeforeGame(false)
        }
        setChosenSpot(newresult.newspot)
        setnewsboard('chooseSpot')
        setOpopnentBoard([...newresult.randomspotboard])
      }, 5000);
    }
  }
  const readybuttonhandler =async()=>{
    if (gameoption=='computer'){
      comreadybuttonhandler()
    }
    else{
      onlinereadybuttonhandler()
    }
   }



  ///chat functions
  function sendchathandle(messegebody,color1,color2,readystate){
    let newmessage={
        color:color1,
        side:'left',
        messagebody:messegebody,
    }
    setChatmessage([...chatmessages,newmessage])
    if (gameoption='online'){
    let body={
      color:color2,
      side:'right',
      messagebody:messegebody,
    }
      sendWebSocketMessage('livechat', readystate,playerID,body)
    }
  }














  return (
    <DndProvider backend={HTML5Backend}>
      <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >
        <div className="me"
        style={{
          display: 'block',
        }}
        >
          <div className='name'>{playername}</div>
          <div className="littleboard">
            <Headboard ships={ships}/>
          </div>
          <div className="boarddisplay">
            <Board player={'me'} board={board} actfunction={placeShip} ships={ships} beforeGame={beforeGame} />
          </div>
        </div>
        <div className='middle'>
          <button className='js-button readybutton' onClick={readybuttonhandler}>Ready</button>
          <div className='newsbord'>
            <News news={newsboard}/>

          </div>
          <div className='messegebord'>
            <Livechat playerID={playerID} gameoption={gameoption}
            playername={playername} opponent={opponent} 
            chatmessages={chatmessages} sendchathandle={sendchathandle}
            chatContainerRef={chatContainerRef}/>

          </div>
          
        </div>
        <div className="opponent"
        style={{
          display: 'block',
        }}
        >
        
          <div className='name'>{isgameoption}</div>
          <div className="littleboard">
            <Headboard ships={opponentShips}/>
          </div>
          <div className="boarddisplay">
            <Board player={'opopnent'} board={opopnentBoard} actfunction={choosequare} ships={opponentShips}beforeGame={beforeGame} />
          </div>
          
          
        </div>
        
    </div>
  </DndProvider>
  )
  
};

export default  Game;
