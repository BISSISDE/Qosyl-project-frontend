import React from "react";
import { Link } from "react-router-dom";
import "../../style/ErrorPages.css";
import errorImg from "../../images/ErrorBot.png";
const Error401 = () => {
  return (
    <div className="error-page">
        <img src={errorImg} alt="401 Error" />
        <h1 className="error-code">401</h1>
        <p className="error-message">Рұқсат жоқ. Кіру қажет.</p>
        <Link to="/" className="error-button">
                Басты бетке
              </Link>
    </div>
  );
};

export default Error401;
