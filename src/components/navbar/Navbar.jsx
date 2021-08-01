import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Navbar(props) {
  const [showNavOptions, setshowNavOptions] = useState(false);

  const handleNavbar = (value) => {
    setshowNavOptions(!value);
    return !value;
  };

  return (
    <nav>
      <i
        className="fas fa-align-left bars"
        onClick={() => handleNavbar(showNavOptions)}
      ></i>
      <h1 className="logo">
        <Link to="/">FlashNotes</Link>
      </h1>
      <div className="links" style={{ display: showNavOptions && 'block' }}>
        <Link
          to="/notes"
          onClick={() => handleNavbar(showNavOptions)}
          className="link"
        >
          Notes
        </Link>
        <Link
          to="/me"
          onClick={() => handleNavbar(showNavOptions)}
          className="link"
        >
          Account
        </Link>
        <a
          href="https://github.com/arsen1c/React-Todo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github github "></i>
        </a>
      </div>
    </nav>
  );
}
