import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/MClogo.jpeg';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Check auth state on location change (navigation)
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);

      if (token) {
        try {
          const res = await fetch('/api/auth/user', {
            headers: { 'x-auth-token': token }
          });
          const data = await res.json();
          if (data.email === 'kishorjj05@gmail.com') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.error(err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkUser();
    setClick(false); // Close mobile menu on navigation
  }, [location]);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={logo} alt='logo' className='navbar-logo-img' />
          Middle Class Developers
        </Link>

        <div className="mobile-icons-container">
          {/* Profile Icon for Mobile/Tablet (Visible next to Hamburger if logged in) */}
          {isLoggedIn && (
            <Link to="/profile" className="nav-profile-mobile" onClick={closeMobileMenu}>
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" className="profile-icon-nav" />
            </Link>
          )}
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gallery" className="nav-links" onClick={closeMobileMenu}>
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-links" onClick={closeMobileMenu}>
              Our Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <Link to="/admin" className="nav-links" onClick={closeMobileMenu} style={{ color: '#D4AF37' }}>
                Admin
              </Link>
            </li>
          )}
          <li className="nav-item-mobile">
            {isLoggedIn ? (
              <span className="nav-links-mobile" onClick={handleLogout}>
                Logout
              </span>
            ) : (
              <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}>
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* Desktop Profile or Login Button */}
        {button && (
          isLoggedIn ? (
            <Link to="/profile" className="nav-profile-desktop">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" className="profile-icon-nav" />
            </Link>
          ) : (
            <Link to="/login">
              <button className='btn'>Login</button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
