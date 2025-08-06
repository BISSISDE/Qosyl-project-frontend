import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Register.css";
import apple from "../images/Apple black logo.png";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    if (username === "") {
      setStatusMessage("Атыңыз бос болмауы керек");
      setStatusType("error");
      toast.warn("Толық толтырмадыңыз");
      return;
    }

    if (password.length < 6) {
      setStatusMessage("Құпия сөз кемінде 6 таңбадан тұруы керек");
      toast.warn("Толық толтырмадыңыз");
      setStatusType("error");
      return;
    }

    if (!email.includes("@")) {
      setStatusMessage("Электронды пошта дұрыс емес");
      toast.warn("Толық толтырмадыңыз");
      setStatusType("error");
      return;
    }

    try {
      const res = await axios.post(
        "https://qosyl-project-backend.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      const user = res.data.user;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Сәтті түрде сақталды!");
      navigate("/profile");
    } catch (err) {
      toast.error("Қате кетті, қайталап көріңіз");
    }
  };

  return (
    <div className="register-container">
      {statusMessage && (
        <div className={`statusMessage ${statusType}`}>{statusMessage}</div>
      )}

      <div className="register-left">
        <img
          src="https://4kwallpapers.com/images/wallpapers/green-abstract-1920x1080-21853.png"
          alt="Background"
          className="background-image"
        />
      </div>

      <div className="register-right">
        <div className="register-form">
          <h2 className="form-title">Аккаунт құру</h2>

          <form className="form-fields" onSubmit={handleRegister}>
            <div>
              <label className="input-label">Аты жөні:</label>
              <input
                type="text"
                placeholder="Noname Nounameov"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="input-label">Емейл адресі:</label>
              <input
                type="email"
                placeholder="noname@gmail.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="input-label">Пароль:</label>
              <input
                type="password"
                className="input-field"
                value={password}
                placeholder="123456"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="divider">– Немесе –</div>

            <div className="auth-buttons">
              <button type="button" className="auth-button">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="auth-icon"
                />
                <span>Google арқылы</span>
              </button>

              <button type="button" className="auth-button">
                <img src={apple} alt="Apple" className="auth-icon" />
                <span>Apple ID арқылы</span>
              </button>
            </div>

            <button type="submit" className="submit-button">
              Тіркелу
            </button>

            <p className="form-footer">
              Аккаунтыңыз бар ма?{" "}
              <span
                className="register-link"
                onClick={() => navigate("/login")}
              >
                Кіру
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
