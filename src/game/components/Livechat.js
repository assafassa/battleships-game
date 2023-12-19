import { useState } from "react";
const Livechat = ({playerID,playername,opopnent,gameoption,chatmessages,sendchathandle,chatContainerRef}) => {
    


    const[trackinput,settruckinput]=useState('')

    function sendbuttonhandle(){
        if(trackinput!=''){
            sendchathandle(trackinput,'rgba(0, 21, 98, 0.648)','rgba(0, 0, 0, 0.648)',false);   
        }
        settruckinput('');
    }
    const handleSpaceKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendbuttonhandle()
        }
      };    
    
    return (  
        <div 
        style={{
            width:'264px',
            height: '180px',
        }}>
           <div 
           style={{
            width:'244px',
            height: '24px',
            fontSize: '18px',
            fontWeight:'normal',
            textAlign: 'left',
            paddingLeft:'20px',
            paddingTop: '4px',
            color:'rgba(135, 233, 133, 0.867)',
            backgroundColor:'rgba(0, 0, 0, 0.358)'
           }}
           >Online Chat</div>
           <div 
           className="scrollable-div"
           style={{
            height:'120px',
            width:'264px',
            overflowY:'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'thin',
            scrollbarColor: 'darkgray lightgray',
           }}
           ref={chatContainerRef}
           >
            {chatmessages.map((message,index) => (
                    <div 
                    key={index}
                    style={{
                        height: '18px',
                        width: '224px',
                        paddingRight: '20px',
                        paddingLeft: '20px',
                        backgroundColor: message.color,
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.648)',
                        paddingTop: '2px',
                        textAlign: message.side,
                    }}
                    >
                    {message.messagebody} 
                    </div>
                ))}
            </div>
           <div 
           style={{
            display:'flex',
            height: '32px',
            width:'264px',
           }}>
                <input className='inputchat' type="text" required placeholder="write a message" 
                     value={trackinput} onChange={(e)=>settruckinput(e.target.value)}
                     style={{
                        backgroundColor:'rgba(189, 183, 255, 0.31)',
                        border:'none',
                        color:'black',
                        fontSize:'16px',
                        width:'224px',
                        fontFamily:'inherit'
                        
                        
                     }}
                     onKeyDown={handleSpaceKeyPress}
                     />
                <button className='sendbutton' onClick={() => sendbuttonhandle()}
                >Send</button>
           </div>
           

        </div>
    );
}
 
export default Livechat;