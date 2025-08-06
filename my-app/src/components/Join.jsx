import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import "../style/Join.css"; // CSS файлды қосуды ұмытпа

export default function Join() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [invite, setInvite] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/invite/${token}`)
      .then((res) => {
        setInvite(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Сілтеме дұрыс емес немесе мерзімі өтіп кеткен.");
        setLoading(false);
      });
  }, [token]);

  const handleJoin = async () => {
    try {
      const userToken = localStorage.getItem("token");

      if (!userToken) {
        toast.error("Қосылу сәтсіз. Алдымен тіркелу керек.");
        return;
      }

      const res = await axios.post(
        "https://qosyl-project-backend.onrender.com/api/invite/join",
        { token },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const { goalId } = res.data;
      navigate(`/goal/${goalId}`);
    } catch (err) {
      toast.error("Қосылу сәтсіз. Алдымен тіркелу керек.");
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="dot-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <p className="loader-text">Жүктелуде...</p>
      </div>
    );
  }

  if (error) {
    return <div className="invite-error">{error}</div>;
  }

  return (
    <div className="invite-container">
      <h1 className="invite-title">🚀 Бірлескен мақсатқа қосылу</h1>
      <p className="invite-info">
        <strong>Мақсат:</strong> {invite.goal_name}
      </p>
      <p className="invite-info">
        <strong>Ұзақтығы:</strong> {invite.duration_days} күн
      </p>
      <button className="invite-button" onClick={handleJoin}>
        Қосылу
      </button>
    </div>
  );
}
