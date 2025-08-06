import React from "react";
import { Link } from "react-router-dom";
import "../../style/ErrorPages.css";
import errorImg from "../../images/ErrorBot.png";
const Error403 = () => {
  return (
    <div className="error-page">
      <img src={errorImg} alt="403 Error" />
      <h1 className="error-code">403</h1>
      <p className="error-message">Бұл бетке кіруге рұқсатыңыз жоқ.</p>
      <Link to="/" className="error-button">
              Басты бетке
            </Link>
    </div>
  );
};

export default Error403;
