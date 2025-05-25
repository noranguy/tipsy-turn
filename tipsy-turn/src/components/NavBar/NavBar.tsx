
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./NavBar.css";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
        <ul>
          <li><Link to="/">Tipsy Turn</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/dashboard">My Profile</Link></li>
            <li> <Link to="/" onClick={handleLogout} className="logout-link">Logout</Link></li>
          </>
        ) : (
          <li><Link to="/login">Login/Sign Up</Link></li>
        )}
        </ul>
      </nav>
  )
}

export default NavBar;
