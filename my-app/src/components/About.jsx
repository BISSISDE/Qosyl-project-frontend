import robot from "../images/robots.png";
import img1 from "../images/Rectangle 56.png";
import img2 from "../images/Rectangle 53.png";
import img3 from "../images/Rectangle 54.png";
import img4 from "../images/Rectangle 55.png";
import imgAbout1 from "../images/imgAbout1.png";
import nom1 from "../images/01.png";
import nom2 from "../images/02.png";
import nom3 from "../images/03.png";
import "../style/About.css";
import comments from "../images/coments.png";

export default function About() {
  return (
    <>
      <section className="section1">
        <div className="container">
          <h2 className="section1_title">
            <span>Бiз жайлы </span>
            <span className="highlight">барлық ақпарат осында )</span>
          </h2>
          <p className="section1_desc">
            Бiзге смело сенсенiздер болады.
            <br />
            Бәрi сіздердің қажеттіліктеріңіз үшін.
          </p>
          <div className="section1_bot">
            <img src={robot} alt="bot" className="section1_robot" />
          </div>
          <div className="section1_cards">
            <img src={img1} alt="img1" className="card_img" />
            <img src={img2} alt="img2" className="card_img" />
            <img src={img3} alt="img3" className="card_img" />
            <img src={img4} alt="img4" className="card_img" />
          </div>
        </div>
      </section>

      <section className="section2">
        <div className="container">
          <h2 className="section2_title">Біз кімбіз?</h2>
          <p className="section2_desc">
            Qosyl – адамдар мен командаларға жақсы әдеттер қалыптастыруға
            көмектесуді мақсат еткен жоба. <br /> Біз күнделікті әрекеттерді
            бақылауға, қадағалауға және жетілдіруге арналған қарапайым әрі{" "}
            <br /> тиімді құралдар ұсынамыз.
          </p>
          <img className="section2_img" src={imgAbout1} alt="" />
        </div>
      </section>

      <section className="section3">
        <div className="container">
          <h2 className="section3_title">
            Миссиямыз – Сізді жетістікке <br /> жеткізу.
          </h2>
          <p className="section3_desc">
            Qosyl – бар болғаны екі адамнан тұратын шағын жоба. Бірақ біз
            сенеміз: нағыз нәтижеге жету үшін үлкен команда емес, бір-біріне
            ықпал етіп, тұрақты жұмыс істей алатын сенімді серіктестік
            жеткілікті. Біздің мақсатымыз – сіздің жеке және кәсіби
            мақсаттарыңызға жету жолында құрылымды, тиімді және шынайы қолдау
            көрсету.
          </p>
        </div>

        <div className="section3Cards">
          <div className="card1Section3">
            <div className="ellipse">
              <img src={nom1} alt="Коучинг" className="nom1" />
            </div>
            <h1>Жекелендірілген коучинг</h1>
            <p>
              AI сіздің әдеттеріңіз бен мақсаттарыңызға бейімделіп,
              мотивацияңызды жоғалтпай алға жылжуға көмектеседі.
            </p>
          </div>

          <div className="card1Section3">
            <div className="ellipse">
              <img src={nom2} alt="Қадағалау" className="nom1" />
            </div>
            <h1>Прогресті оңай бақылау</h1>
            <p>
              Qosyl прогресті анық көрсетіп, күнделікті әдеттерді дерекке сүйене
              отырып реттеуге мүмкіндік береді.
            </p>
          </div>

          <div className="card1Section3">
            <div className="ellipse">
              <img src={nom3} alt="Қолдау" className="nom1" />
            </div>
            <h1>Жұптық дисциплина</h1>
            <p>
              Неге тек жұптық? Себебі, біздің қолданушыларда нәтежие болуы керек
              ал реалды серігің болса оңай қол сілту мүмкіндігі аз.
            </p>
          </div>
        </div>
      </section>

      <section className="section4">
        <h1>Qosyl-ды сынап көргендердің пікірлері</h1>
        <img src={comments} alt="" />
      </section>
    </>
  );
}
