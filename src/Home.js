
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const Home = ({ setRedirected, setGameoption, setPlayername,gameoption,playername}) => {
    const history=useHistory()
    const handleSubmit =(e)=>{
        e.preventDefault()
        if (gameoption==='online'){

        }else if (gameoption==='computer'){
            setRedirected(true)
            history.push('/game')
        }
    }
    return ( 
        <div className="containorhome">
            <div></div>
            <div className="homepage">
                <form className="homepageform" onSubmit={handleSubmit}>
                    <div className="row transparentfill">player name:</div>
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