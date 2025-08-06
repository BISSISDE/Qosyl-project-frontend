import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";
import logo from "../images/logo.png";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userToken = localStorage.getItem("userToken"); 
      if (userToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <>
      <header
        className={`qosyl-header ${
          isSticky && window.innerWidth > 768 ? "sticky" : ""
        }`}
      >
        <div className="logo">
          <img src={logo} alt="Qosyl Logo" />
          <span>Qosyl</span>
        </div>

        <div
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <Link to="/">Басты бет</Link>
          <Link to="/about">Біз жайлы</Link>

          <div
            className="dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>Беттер ▾</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/InviteToGoal">Мақсат құру</Link>
                <Link to="/instructions">Инструкция</Link>
                <Link to="/ai">AI чат</Link>
                <Link to="/profile">Профиль</Link>
              </div>
            )}
          </div>

          <Link to="/login" className="login-button mobile-only">
            Кіру
          </Link>
        </nav>

        <Link to="/login" className="login-button desktop-only">
          Кіру
        </Link>
      </header>

      <div className="center-text">
        <h1>AI arqyly jumys isteydi</h1>
      </div>
    </>
  );
}
