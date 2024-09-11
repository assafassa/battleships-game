import React from 'react';

const News = React.memo(({news,sound}) => {
    let newss
    let isbeforeGame
    let ischoosespot
    let isdifferent
    let randomnumber
    let isgif
    if (news){
        newss = news.replace(/\s/g, '')
        isbeforeGame=(newss=='beforeGame')
        ischoosespot=(newss=='chooseSpot')
        isdifferent=(!isbeforeGame&&!ischoosespot)
        randomnumber=''
        isgif=true

        if ((newss[0]=='y' || newss[0]=='o' )&& newss!='yousunk'&&newss!='opponentsunk'){
            isgif=false
            let gifrandomnumber=Math.floor(Math.random()*2)+1
            if (gifrandomnumber==2){
                randomnumber=Math.floor(Math.random()*4)+1
                isgif=true
            }
        }
        if (news[0]=='w'){
            randomnumber=Math.floor(Math.random()*2)+1
        }
    }
    return ( <div>
        {news&&isbeforeGame&& (
        <div
        style={{ 
            width:'270px',
            height: '220px',
            
            
            }}
        >
            <div className="gap"></div>
            <div className="Headerpar">
                To araange your boats:
            </div>
            <p className="par">
                <span style={{color: 'rgba(246, 145, 255, 0.8)'}}>Drag and drop  </span>boats to reposition.<br></br> 
                <span style={{color: 'rgb(174, 34, 34)'}}>Double-press  </span>to rotate.<br></br>
                <span style={{color: 'rgb(0, 125, 226)'}}>Note:you have 20 seconds!!</span>
            </p>
            <div className="Headerpar">
                Once you ready to start game:
            </div>
            <div className="par">
                press the READY button
            </div>
        </div>
        )}
        {news&&ischoosespot&&(
        <div
        style={{ 
            width:'270px',
            height: '220px',
            }}
            >
            <div className="deepgap"></div>
            <div className="Headerpar">
                To Select a spot
            </div>
            <p className="par">
                
                <span style={{color: 'rgba(246, 145, 255, 0.8)'}}>Tap  </span>on it,<br></br>
                <span style={{color: 'rgb(174, 34, 34)'}}>Press  </span>the READY button.<br></br>
                <br></br>
                <span style={{color: 'rgb(0, 125, 226)'}}>Note:you have 10 seconds!!</span>
            </p>
            
        </div>
        )}
        {news&&isdifferent&&isgif&&(
        <div>
            <div className="deepgap"></div>
            <img src={`${process.env.PUBLIC_URL}/images/newsgifs/${newss}${randomnumber}.gif`} 
            style={{ 
            width: '270px',
            height: '176px',
            
            }}></img>
            {sound&&(
                <audio autoPlay src={`${process.env.PUBLIC_URL}/images/newssounds/${newss}${randomnumber}.mp3`}></audio>
            )}
        </div>
        )}
        {news&&isdifferent&&(!isgif)&&(
        <div>
            <div className="deepgap"></div>
            <div className="newresult">
                {news}
            </div>
        </div>
        )}
    </div> );
})
 
export default News;