import React, { useState } from "react";
import "../style/Create.css";
import invite from "../images/invite.png";
import invite2 from "../images/invite2.png";
export default function InvitePage() {
  const [goalName, setGoalName] = useState("");
  const [durationDays, setDuration] = useState("");
  const [inviteLink, setInviteLink] = useState("");

  const handleGenerateLink = async () => {
    if (!goalName || !durationDays) {
      alert("Барлық жолдарды толтырыңыз");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/invite/friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          goalName,
          durationDays,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Сілтеме жасау қатесі");
      }

      setInviteLink(data.inviteLink);
    } catch (err) {
      alert("Қате: " + err.message);
    }
  };

  return (
    <div className="inviteContainer">
      <section className="inviteSection">
        <div className="inviteText">
          <div className="oneSideinvite">
            <h1>Жақыныңды шақыр да мақсатқа бірге жетіңдер!</h1>
            <button type="submit">Шақыру</button>
          </div>
          <div className="twoSideinvite">
            <img src={invite} alt="" />
          </div>
        </div>
      </section>
      <img src={invite2} alt="" />

      <section className="inviteSection2">
        <h1>
          Сілтеме жасау үшін <br /> келесі қадамдарды орындаңыз
        </h1>

        <div className="inputContainer">
          <label className="input-label2">Мақсат аты:</label>
          <input
            type="text"
            placeholder="90 күндік челендж"
            className="input-field2"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label className="input-label2">Ұзақтығы (күн):</label>
          <input
            type="number"
            placeholder="90"
            className="input-field2"
            value={durationDays}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <button className="generate-button" onClick={handleGenerateLink}>
          Сілтеме жасау
        </button>

        {inviteLink && (
          <div className="link-container">
            <label className="input-label2">Сіздің сілтемеңіз:</label>
            <input
              type="text"
              readOnly
              className="input-field2"
              value={inviteLink}
            />
          </div>
        )}
      </section>
    </div>
  );
}
