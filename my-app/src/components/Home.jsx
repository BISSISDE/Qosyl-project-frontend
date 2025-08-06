import React, { useState } from "react";
import "../style/Home.css";
import bots from "../images/bots.png";
import phones from "../images/phones.png";
import kiru from "../images/kiru.png";
import kuru from "../images/kuru.png";
import justdoit from "../images/just do it.png";
import all from "../images/all.png";
import divTime1 from "../images/divTime1.png";
import divTime2 from "../images/divTime2.png";
export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState([false, false, false]);

  const toggleFAQ = (index) => {
    setFaqOpen((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };
  const faqData = [
    {
      q: "Мақсатты қалай құраймын?",
      a: "Сіз мақсат бетіне өтіп, сілтеме жасайсыз.",
    },
    {
      q: "Сілтеме неге жарамсыз болып тұр?",
      a: "Сілтеменің уақыты өтіп кеткен немесе қате болуы мүмкін.",
    },
    {
      q: "Бір мақсатқа көп адам қосыла ала ма?",
      a: "Иә, шектеу жоқ. Қанша адам болсын қосыла алады.",
    },
  ];

  return (
    <div className="homePage">
      <section className="section">
        <div className="textBlock">
          <h1>
            <div className="text1">
              <span className="black">Qosyl </span> –{" "}
              <span className="blue"> мен бірге</span>{" "}
              <div>
                <img className="botIcons" src={bots} alt="bots" />
              </div>
              <span className="black"> дамы.</span>
            </div>
          </h1>
          <h1 className="text2">
            <span className="blue">Мақсатқа</span>{" "}
            <span className="black">бірге жет.</span>
          </h1>

          <p className="desc1">
            Қолдайтын серігің болсын. Бәрі оңай және қызықты. Қолдайтын
            адамыммен тезірек.
            <br />
            Егер толығырақ сайт жайлы білгің келсе Qosyl боттан сұра.
          </p>
        </div>

        <div className="phones">
          <img src={phones} alt="phones" className="phone" />
        </div>
      </section>

      <div className="justdoit">
        <img src={justdoit} alt="" />
      </div>

      <section className="features">
        <h2>
          Мүмкіндіктерді ашу <br />
          үшін мына бетке өте аласыз.
        </h2>
        <div className="cards">
          <div className="card">
            <img src={kiru} alt="Card 1" />
            <div className="texts">
              <p className="title">
                Maqsat betine <span>kiru</span>
              </p>
              <p className="desc">
                Бұл бетте қолданушыны серіктесінің шақыру сілтемесі арқылы ортақ
                мақсатқа қосуға арналған бет. Бұл бетте қолданушы аккаунт
                жасайды.
              </p>
              <button>Жалғастыру →</button>
            </div>
          </div>
          <div className="card">
            <img src={kuru} alt="Card 2" />
            <div className="texts">
              <p className="title">
                Maqsat betin <span>kuru</span>
              </p>
              <p className="desc">
                Бұл бет қолданушыға мақсат қоюға және серіктесін шақыруға
                мүмкіндік береді. Сілтеме арқылы екінші адам қосылып, бірге
                жұмыс істей бастайды.
              </p>
              <button>Жалғастыру →</button>
            </div>
          </div>
        </div>
      </section>
      <div className="justdoit">
        <img src={justdoit} alt="" />
      </div>
      <section className="about">
        <h1>
          Бұл сайтта <br /> не бар <br />
          және неліктен <br /> сіздерге <br /> пайдалы ?
        </h1>
        <img src={all} alt="" />
      </section>
      <div className="justdoit">
        <img src={justdoit} alt="" />
      </div>
      <section className="faq-wrapper">
        <h2>
          Жиі қойылатын сұрақтар <br /> (FAQ)
        </h2>
        {faqData.map((item, index) => (
          <div
            className={`faq-item ${faqOpen[index] ? "open" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{item.q}</span>
              <span className="faq-icon">{faqOpen[index] ? "−" : "+"}</span>
            </div>
            <div
              className="faq-answer"
              style={{ maxHeight: faqOpen[index] ? "500px" : "0px" }}
            >
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="divTimeContainer">
        <img className="divTime one" src={divTime1} alt="" />
        <h2>
          ⏳ Уақыт — ең құнды ресурс. Біздің платформа екі адамға бір-біріне
          мотивация бола отырып, уақытын тиімді жоспарлап, мақсаттарға бірге
          жетуге көмектеседі.
        </h2>
        <img className="divTime two" src={divTime2} alt="" />
      </section>
    </div>
  );
}
