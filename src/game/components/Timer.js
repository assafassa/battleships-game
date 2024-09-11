import React from 'react';

const Timer = React.memo(({timer}) => {
    let istimer
    if(timer.value=='00') {
        istimer='off'
      } else {
        istimer='on'
      }
    
    return ( <div>
        {(istimer=='off')&&(<div className='timer'
        style={{
            height:'33px',
            width:'80px',
            border: '1px solid rgb(190, 183, 252)',
            font: 'inherit',
            fontSize: '23px',
            backgroundColor:'rgba(21, 21, 35, 0.8)',
            color:'rgb(105, 105, 105)',
            textAlign:'center',
            paddingTop:'5px',
            marginRight:'20px',
            
        }}
        >
        00:00
        </div>)}
        {(istimer=='on')&&(<div className='timer'
        style={{
            height:'37px',
            width:'80px',
            border: '1px solid rgb(190, 183, 252)',
            font: 'inherit',
            fontSize: '23px',
            backgroundColor:'rgba(21, 21, 35, 0.8)',
            color:'rgb(224, 224, 224)',
            textAlign:'center',
            paddingTop:'3px',
            textAlign:'center',
            paddingTop:'5px',
            marginRight:'20px',
        }}
        >
        00:{timer.value}
        </div>)}
        
    </div> );
})
 
export default Timer;