import React from "react";
import { Link } from "react-router-dom";
import "../../style/ErrorPages.css";
import errorImg from "../../images/ErrorBot.png";
const Error500 = () => {
  return (
    <div className="error-page">
      <img src={errorImg} alt="500 Error" />
      <h1 className="error-code">500</h1>
      <p className="error-message">Серверде қате пайда болды.</p>
      <Link to="/" className="error-button">
        Басты бетке
      </Link>
    </div>
  );
};

export default Error500;
