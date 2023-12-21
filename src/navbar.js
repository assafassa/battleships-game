import{socket,sendWebSocketMessage,closeWebSocket}from './game/gamefiles/backend/websocket'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = ({playerID,setsound,opponent,sound}) => {
    const history=useHistory()
    return ( 
        <nav className="navbar">
            <div></div>
            
            <div className="Header">Battle Ships</div> 
            <div className="controls">
                <div className="sound" 
                onClick={()=>{
                    if (sound){
                        setsound(false)
                    }else{
                        setsound(true)
                    }
                }}
                >
                    {sound&&(
                        <img className='soundimg' src={`${process.env.PUBLIC_URL}/images/board/soundon.png`}></img>
                    )}
                    {(!sound)&&(
                        <img className='soundimg' src={`${process.env.PUBLIC_URL}/images/board/soundoff.png`}></img>
                    )}
                </div>
                <div className='exit'
                onClick={()=>{
                    history.push('/battleships-game')
                    if (socket){
                        if(opponent){
                            sendWebSocketMessage('exit', false,playerID,{})
                        }
                        closeWebSocket(playerID)
                    }
                }}
                style={{
                    cursor:'pointer',
                }}
                >Exit</div>
                
                
            </div> 
        </nav>
    );
}
 
export default Navbar;
