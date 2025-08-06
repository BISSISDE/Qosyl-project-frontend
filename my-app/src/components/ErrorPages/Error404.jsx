import React from "react";
import { Link } from "react-router-dom";
import "../../style/ErrorPages.css"
import errorImg from "../../images/ErrorBot.png";
const Error404 = () => {
  return (
    <div className="error-page">
      <img src={errorImg} alt="404 Error" />
      <h1 className="error-code">404</h1>
      <p className="error-message">Бет табылмады.</p>
      <Link to="/" className="error-button">
              Басты бетке
            </Link>
    </div>
  );
};

export default Error404;
