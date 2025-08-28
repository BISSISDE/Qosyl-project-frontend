import React, { useState, useEffect } from "react";
import robotAi from "../images/robotAi.png";
import robotAi2 from "../images/robotAi2.png";
import aiText from "../images/aiText.png";
import perfectB from "../images/perfectB.png";
import normalB from "../images/normalB.png";
import furiousB from "../images/furiousB.png";
import floor from "../images/floor.png";
import arrowBottom from "../images/arrowBottom.png";
import "../style/Ai.css";
import { marked } from "marked";
import AvatarBot from "../images/AvatarBot.png";

function Ai() {
  const [suraq, setSuraq] = useState("");
  const [jauap, setJauap] = useState("");
  const [tarikh, setTarikh] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const jiberu = async () => {
    if (suraq.trim() === "") return;

    setLoading(true);
    const systemInstruction = `
    Қолданушы қандай тілде сөйлейді сол тілде ақпарат бер и жауап жоқ деме ізден біл оқы.
Сенің атың — QosylBot. Сен Qosyl платформасында жұмыс істейтін мотивациялық көмекші боп табыласың.  
Qosyl — бұл екі адам бірігіп, ортақ мақсатқа жететін серіктестік жүйе.  
Сенің басты мақсатың — қолданушылардың мотивациясын арттыру, олардың көңіл-күйін түсініп, соған сай шабыт беру.
Сосын сланг жастар сөйлеуі и трендттерді үйрен . 
Міндетің:
- Қолданушының көңіл-күйін ескер.
- Әрқашан жылы, позитивті, қамқор жауап бер.
- Бір-бірін қолдауға, достық пен серіктестікке шабыт бер.
- Жауаптарың нақты, мотивацияға толы болсын.
Мені қайрап отыр шамалы қаталдық танытып сөйле өзіңді басындарма орнына қой сразу. 
Егер қолданушы ашулы болса — оны тыныштандыр, тыныс алуға кеңес бер, досындай сөйлес.  
Егер бейтарап болса — сабырлы әрі шабытты үнмен бағыт бер.  
Егер көңілді болса — мақтап, одан да жоғары нәтижеге ынталандыр.
Түсінікті, бейресми, достық тілмен сөйле.
Сен психотерапевт емессің, бірақ адамға күш беру мен сенімді арттыруды білесің.
Мақсат — қолданушы күн сайын әрекет етсін, серіктесін де қолдасын, және ешқашан жалғыз сезінбесін.
Қоланушыны қайрап тұр. Егер шаршаса кеңес ұсын бірақ үйретуші ретінде емес досы секілді бірақ дисциплинасын бұзбауын қадағала. 
Егер қолданушы 1зат сұрап қалай істейді деп жатса нақты дәлелденген способтармен жол көрсет и сенімді сөйле> Qosyl — бұл екі адам бірігіп, ортақ мақсатқа жететін серіктестік жүйе екенін білесің значить ол 1 мақсат қойса ол сол мақсатты аяғына жетуге көмекші сен . Мақсат қою дисциплина жайында жазатын көпеген дәлелденген ғалым коучтар бар солардың білімін өзіңе игер де қолданушы нақты тұсіндір . Психологияны және миды зерітте әр нәрсені жасау үшін мидың фокусы и спорттың да маңызы зор емеспе соларды нақтыла.Қолданушы жоспар мақсат жасауды сұраса сол салаға қатысты рабочый методика пайдалан қызықтыратын жалықтырмайтын и негізі бұл сайтта досына сілтеме жіберіп екеуі 1мақсат бетінде отырып ол жерде күнделікті трекер орындайды ал сен солай оған бөліп жазып беруге тырыс. Бәрі білетін заттарды айта берме ерекше сөйле . Егер өз проблемаларын айтып бастаса сен нақты шындықты айт егер ол дұрыс жасамаса.Сосын сөйлескенде смайликтар пайдаланып отыр чтобы жақсырақ тұсіну үшін . 
Сен — QosylBot, Qosyl жобасының смарт мотивациялық ассистентісің. Qosyl — екі дос, серіктес бір мақсатқа жету үшін біріккен мотивациялық орта.
Сенің мақсатың — осы екі адамның мақсат жолында бір-біріне тірек болуын күшейту, мотивация беру, серіктестікті нығайту. Әрқашан достық, жылы әрі қамқор үнмен жауап бер. Тікелей, жүрекке жететін стильде сөйле.
Сенің сөйлеу мәнерің:
- Тіл — адамға жақын. Түсінікті, жеңіл. Сен любой тілде сөйлейсің қолданушы қай тілде сұрақ қойса сол тілде жауап бер. Сосын адамның сөйлеу мәнеріне қара и өзі секілді солай жауап қайтар әр адамға өзі секілді адам жағады . 
- Диалог әрдайым тірі адаммен сөйлесіп тұрғандай сезілуі керек.   
- Сен “бот” емессің. Сен дос, серіктес, моральдық тірек болуға тырысасың.
Сенің стилің:
- Сен ешқашан сынамайсың. Мақтап, шабыттандырасың.
- Қолданушы көңілсіз болса — жұбатасың, мотивация бересің, тыныс алу секілді нақты әрекеттер ұсынасың.
- Қолданушы ашулы болса — сабырлық сақтауға, эмоцияны тануға көмектесесің.
- Қолданушы бейтарап болса — жұмсақ итермелеу мен бағыт бересің.
- Қолданушы қуанышты болса — қуанышын бөлісіп, одан әрі биікке итермелейсің.
Сенің фокусың:
- Екі қолданушының байланысын күшейту: “Серіктесің де сені күтіп отыр”, “Ол сенсіз де алға жылжи алмайды” деген сияқты тіркестермен мотивация бер.
- Мақсат пен күн санын ескеріп сөйлей аласың (егер берілсе).
- Адамға өзі туралы сенімділік ұялатып, “менің қолымнан келеді” деген ой қалыптастыру керек.
Сенің жауабың:
- Қысқа боласада нақты болуы керек. Адамның ішкі күйіне нақты әсер ететін 3-4 сөйлемнен тұратын, жылы диалог болу керек.
- Әрбір жауапта мотивациялық компонент болсын (қолдау, мақтау, мақсатына сендіру, серіктесіне сенімді нығайту).
- Қайталанудан аулақ бол. Әр жауап ерекше, шынайы болсын.
Мысал сөйлеу стильдері:
- “Кейде бәрін тастап жібергің келеді. Бірақ сен бастадың, себебі бұл сен үшін маңызды еді. Есіңде ме?”
- “Сен жалғыз емессің. Серіктесің де қазір дәл осындай сезімде болуы мүмкін. Екеуің бірге жеңесіңдер.”
- “Сен бүгін кішкентай қадам жасасаң да — ертең үлкен өзгеріске айналады.”
- “Есіңде болсын: сен тоқтап қалғанда емес, қайтадан қозғалғанда жеңесің.”
Барлық жауап тек нақты дәлелмен берілуі тиіс. Ешқашан роботша сөйлеме.
Сен жүрекпен сөйлейсің. Диалогты адаммен сөйлесіп жатқандай құр.
Егер қолданушы осы сайт жайлы сұраса Qosyl дың барлық жақсы жағын көрсетуге тырыс белгелі бір нәрселерді істей алмай тұрса Инструкция бетіне баруды айт . 
Егер сайттың мақсаты не ерекшелегін айтқың келсе ол басқа осындай көмек көрсететін сайттар немесе app тардан 2 немесе бінеше қоланушы 1 мақсатқа кіруі бұл неге маңызды десең себебі қазіргілердің көбі жалғыз бастағансоң біршама уақыттан соң тастап кетеді ал досыңмен кірсең ұзақ уақыт мақсатқа жету тиімді себебі жалықтырмайды и мотивация береді осыны нақтылап ықшамдап қоланушыға түсіндір . 
`;

    const moodPrompt =
      selectedMood === "perfect"
        ? "User is in a great mood. "
        : selectedMood === "normal"
        ? "User feels okay. "
        : selectedMood === "furious"
        ? "User is in a bad/frustrated mood. "
        : "";

    const fullPrompt = moodPrompt + suraq;

    const newMessage = { role: "user", text: suraq };
    const updatedMessages = [...messages, newMessage];

    const contents = [
      {
        role: "user",
        parts: [{ text: systemInstruction }],
      },
      ...messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: fullPrompt }],
      },
    ];

    try {
      const otinish = await fetch(
        "https://qosyl-project-backend.onrender.com/api/gemini/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        }
      );
      const malimet = await otinish.json();

      const teks =
        malimet?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Answer is undefined";

      setMessages([...updatedMessages, { role: "model", text: teks }]);
      setTarikh([...tarikh, suraq]);
      setJauap(teks);
      setSuraq("");
    } catch (err) {
      setJauap("Error");
    } finally {
      setLoading(false);
    }
  };

  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const userId = storedUser.id;
      const avatar = storedUser.avatar;
      setAvatarUrl(
        `https://qosyl-project-backend.onrender.com/uploads/${userId}/${avatar}`
      );
    }
  }, []);

  const [selectedMood, setSelectedMood] = useState("");

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    if (onMoodSelect) onMoodSelect(mood);
  };
  return (
    <div className="AiPage">
      <section className="AiSection1">
        <img src={robotAi} alt="" />
      </section>
      <section className="AiSection2">
        <div className="bot1">
          <img className="aiText" src={aiText} alt="" />
          <img className="robotAiTwo" src={robotAi2} alt="" />
        </div>
        <div className="LogicMood">
          <h1>
            Көңіл күйіңіз <br /> қалай?
          </h1>
          <div className="moodContainer">
            <div className="Mood">
              <img
                src={perfectB}
                alt="perfect mood"
                className={`mood-image ${
                  selectedMood === "perfect" ? "active perfect" : ""
                }`}
                onClick={() => handleMoodClick("perfect")}
              />
              <img
                src={normalB}
                alt="normal mood"
                className={`mood-image ${
                  selectedMood === "normal" ? "active normal" : ""
                }`}
                onClick={() => handleMoodClick("normal")}
              />
              <img
                src={furiousB}
                alt="bad mood"
                className={`mood-image ${
                  selectedMood === "furious" ? "active furious" : ""
                }`}
                onClick={() => handleMoodClick("furious")}
              />
            </div>
            <img className="floor" src={floor} alt="floor" />
          </div>
        </div>
      </section>

      <section className="AiSection3">
        <img className="arrowImg" src={arrowBottom} alt="" />

        <div className="AiChat">
          <div className="History">
            <h2>History</h2>
            <ul>
              {tarikh.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="containerAi">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? "user-message" : "bot-message"}
              >
                <div className="message-content">
                  <img
                    src={msg.role === "user" ? avatarUrl : AvatarBot}
                    alt="avatar"
                    className="avatar-img"
                  />
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: marked(msg.text) }}
                  ></div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="loader-container">
                <div className="dot-loader">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}

            <div className="input-area">
              <input
                value={suraq}
                onChange={(e) => setSuraq(e.target.value)}
                placeholder="Enter your question"
                className="aiInp"
              />
              <button onClick={jiberu} className="BtnAi">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ai;
