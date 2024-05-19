import { Link, NavLink, useLocation } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
    const location = useLocation();
    console.log(location.pathname);

    return (
        <nav className="nav">
            <Link to="/" className="site-title">शुभ्रा की सरल बातें</Link>
            <ul>
                {location.pathname == "/poem"? <li><NavLink to="/">Back</NavLink></li>: <></>}                 
            </ul>
        </nav>
    );
}

export default Navbar;