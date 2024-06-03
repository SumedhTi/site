import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className="nav">
            <Link to="/site/admin" className="site-title">शुभ्रा की सरल बातें</Link>
            <ul>
                {location.pathname != "/site/"? <li><Link to="/site/">Home</Link></li>: <></>}              
            </ul>
        </nav>
    );
}

export default Navbar;