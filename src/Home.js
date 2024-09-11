
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { initializeWebSocket ,closeWebSocket,buttonpressed} from "./game/gamefiles/backend/websocket";
import { useState ,useEffect } from "react";


const Home = ({playerID, setPlayerID, setopponent,setRedirected, setGameoption, setPlayername,gameoption,playername}) => {
    const [socket,setSocket]=useState(null)
    const [result,setResult]=useState('')
    const history=useHistory()
    useEffect(() => {
        if (socket){
            const handefunction=(e) => {
                
                let receivedData = JSON.parse(e.data)
                
                if (receivedData.message=='noavailableplayes'){
                    setResult('noavailableplayes')
                }else{
                    setGameoption('online')
                    setopponent(receivedData.message)
                    setRedirected(true)
                    history.push('/battleships-game/game')
                    socket.removeEventListener('message' ,handefunction)
                }
            }
            socket.addEventListener('message' ,handefunction)
        }
    }, [socket]);
    

    const handleSubmit =(e)=>{
        e.preventDefault()
        if (gameoption==='online'&&(!buttonpressed)){
            if (socket==null){
                let randomId=Math.floor(Math.random()*(10**9))
                setPlayerID(randomId)
                setSocket(initializeWebSocket(randomId,playername))
            }
            
        }else if (gameoption==='computer'){
            setRedirected(true)
            history.push('/battleships-game/game')
            
            if (socket){
                closeWebSocket(playerID)
            }
            
        }
    }
    return ( 
        <div className="containorhome">
            <div>
            </div>
            <div className="homepage">
                    <div className="resultmessege">
                        {(result=='noavailableplayes')&&
                        (<div
                        style={{
                            textAlign: 'center',
                            height: '40px',
                            width:'350px',
                            backgroundColor: 'rgba(203, 203, 255, 0.575)'
                        }}
                        >
                            Currently, there are no available. Please wait for others to join or enjoy a game against computer!
                         </div>)
                        }
                    </div>
                <form className="homepageform" onSubmit={handleSubmit}>
                    <div className="row"><input className='js-input' type="text" required placeholder="choose player name" 
                     value={playername} onChange={(e)=>setPlayername(e.target.value)}/></div>
                    <div className="row labeloption"><label>
                        <input className="radiooption" type="radio" name="gameoption" value="computer" 
                        onChange={(e)=>setGameoption(e.target.value)}
                        required />
                        Play with your computer
                    </label></div>
                    <div className="row labeloption"><label>
                        <input className="radiooption" type="radio" name="gameoption" value="online" required
                        onChange={(e)=>setGameoption(e.target.value)}/>
                        Play with online player
                    </label></div>
                
                    <div className="row"><button className="playgamebutton">Start Play</button></div>
                </form>
                
            </div>
            <div></div>
        </div>
    );
}
 
export default Home;
