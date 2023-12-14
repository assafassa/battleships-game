import {Link} from 'react-router-dom';
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <div></div>
            
            <div className="Header">Battle Ships</div> 
            <div className="controls">
                <div className="sound">Sound</div>
                <Link to='/' className="exit">Exit</Link>
            </div> 
        </nav>
    );
}
 
export default Navbar;