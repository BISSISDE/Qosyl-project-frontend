import React from "react";
import "../style/Instructions.css";
import { Link } from "react-router-dom";

const Instructions = () => {
  return (
    <div className="instructions-page">
      <h1 className="instructions-title">Мақсат бетіне қалай кіруге болады?</h1>
      <p className="instructions-subtitle">
        Сіз мақсат бетіне кіру үшін төмендегі екі тәсілдің бірін қолдануыңыз
        керек:
      </p>

      <div className="instruction-steps">
        <div className="step-card">
          <h2>1. Сілтеме жасау арқылы мақсат құру</h2>
          <p>
            Егер сілтеме арқылы өз мақсатыңызды құрсаңыз. Сізге арнайы Мақсат
            бетіне профильдан кіре аласыз.
          </p>
          <Link to="/profile" className="step-link">
            Профильге өту
          </Link>
        </div>

        <div className="step-card">
          <h2>2. Досыңыздан шақыру сілтемесін қабылдау</h2>
          <p>
            Егер досыңыз сізге шақыру сілтемесін жіберсе, оны ашып, тіркелген
            соң автоматты түрде мақсат бетіне өтесіз.
          </p>
        </div>
      </div>

      <div className="goal-info">
        <p>
          <strong>Мақсат бетінде</strong> сіз тапсырмаларды қосып, күн сайын ✅
          / ❌ белгілеу арқылы досыңызбен бірге прогресс бақылай аласыз.
        </p>
      </div>

      <div className="warning-section">
        <h3>⚠ Маңызды ескертулер:</h3>
        <ul>
          <li>
            🟠 <strong>Тіркелмеген қолданушылар</strong> мақсат бетіне өте
            алмайды.
          </li>
          <li>
            🛑 Егер шақыру сілтемесіне кірмей тұрып тіркелмесеңіз – сіз мақсатқа
            қосыла алмайсыз.
          </li>
          <li>
            🧩 Мақсат құрылғанға дейін "Мақсат беті" сілтемесі жұмыс істемейді.
          </li>
          <li>
            🔒 Тек сіздің логиніңізге байланған мақсаттар ғана көрсетіледі.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;
