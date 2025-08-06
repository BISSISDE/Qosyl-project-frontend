import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Profile.css";
import { toast } from "react-toastify";
export default function ProfilePage() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    registered: "",
    avatar: "",
  });
  const [myGoals, setMyGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);

        const res = await fetch("https://qosyl-project-backend.onrender.com/api/invite/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Мақсаттарды жүктеу қатесі");

        const data = await res.json();
        console.log(data);
        console.log(token);

        setMyGoals(data);
      } catch (err) {
        console.error("GOAL FETCH ERROR:", err);
      }
    };

    fetchGoals();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser({
          username: parsed.username || "",
          email: parsed.email || "",
          registered: parsed.registered || "",
          avatar: parsed.avatar || "",
        });
      } catch {
        setUser({ username: "", email: "", registered: "", avatar: "" });
      }
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("avatar-upload");
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Сессия аяқталды. Қайта кіріңіз.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://qosyl-project-backend.onrender.com/api/profile/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "Серверде /api/profile/avatar маршруты табылмады (404). Сервер кодын тексеріңіз."
          );
        }
        if (response.status === 403) {
          toast.error("Рұқсат жоқ немесе токен жарамсыз. Қайта кіріңіз.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        throw new Error(`Сервер қатесі: ${response.status}`);
      }
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Серверден дұрыс JSON келмеді. Маршрут бар ма?");
      }

      const result = await response.json();
      if (result.message === "Avatar added successfully") {
        const updatedUser = { ...user, avatar: result.avatar };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Аватар қосылды!");
      } else {
        alert(result.message || "Белгісіз жауап");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Қате кетті, қайталап көріңіз");
    }
  };

  const [firstName, lastName] = user.username.split(" ");

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="avatar-section">
          <label htmlFor="avatar-upload" className="avatar-label">
            <img
              src={preview || user.avatar || "/default-avatar.png"}
              alt="avatar"
              className="avatar-preview"
            />
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <button onClick={handleAvatarUpload} className="avatar-upload-button">
            Аватарды сақтау
          </button>
          <h2 className="user-name">{user.username || "Аты жоқ қолданушы"}</h2>
          <p className="user-email">{user.email || "email жоқ"}</p>
        </div>

        <div className="info-section">
          <div>
            <h3 className="section-title">👤 Профиль</h3>
            <div className="info-text">
              <p>
                <strong>Аты:</strong> {firstName || ""}
              </p>
              <p>
                <strong>Электрон пошта:</strong> {user.email || ""}
              </p>
              <p>
                <strong>Аватар:</strong>{" "}
                {user.avatar ? "Қосылған" : "Қосылмаған"}
              </p>
              <p>
                <strong>Тіркелген:</strong> {user.registered || "-"}
              </p>
            </div>
            {myGoals.length > 0 && (
              <div className="my-goals-section">
                <h3 className="section-title">🎯 Менің мақсаттарым</h3>
                <ul className="goal-list">
                  {myGoals.map((goal) => (
                    <li key={goal.id} className="goal-item">
                      <strong>{goal.goal_name}</strong> ({goal.duration_days}{" "}
                      күн)
                      <button
                        className="goal-access-button"
                        onClick={() => navigate(`/goal/${goal.id}`)}
                      >
                        Кіру
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="button-group">
            <button
              className="button logout-button"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              🔓 Шығу
            </button>
            <button className="button" onClick={() => navigate("/home")}>
              ➤ Жалғастыру
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
