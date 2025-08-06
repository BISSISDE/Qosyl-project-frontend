import React from "react";
import "../style/Footer.css";
import links from "../images/links.png";
import okbot from "../images/okbot.png";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="footer_logo_social">
          <h1 className="footer_logo">
            <span>Q</span>osyl
          </h1>
          <p className="footer_stay">Хабарда болыңыз</p>
          <div className="footer_icons">
            <a href="#">
              <img src={links} alt="links" />
            </a>
          </div>
        </div>

        <div className="footer_links">
          <h3>🔗 Сілтемелер</h3>
          <ul>
            <li>Басты бет</li>
            <li>Тіркелу / Кіру</li>
            <li>Мақсат құру</li>
            <li>Жиі қойылатын сұрақтар (FAQ)</li>
            <li>Қолдау / Байланыс</li>
          </ul>
        </div>

        <div className="footer_contact">
          <h3>📬 Байланыс:</h3>
          <p>Qosyl.ai@gmail.com</p>
          <h3>📍 Штаб:</h3>
          <p>Алматы, Қазақстан</p>
          <img src={okbot} alt="Bot" className="footer_bot" />
        </div>
      </div>
      <p className="footer_bottom">© 2025 Qosyl. Барлық құқықтар қорғалған.</p>
    </footer>
  );
}

export default Footer;
