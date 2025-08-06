"use client";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import "../style/GoalPage.css";
import trashIcon from "../images/trashIcon.png";
import editIcon from "../images/editIcon.png";
import motivation1 from "../images/motivation1.png";
import motivation2 from "../images/motivation2.png";
import motivation3 from "../images/motivation3.png";
import { toast } from "react-toastify"; 
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};

export default function GoalPage() {
  const { id } = useParams(); 
  const [goal, setGoal] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.id) {
        setCurrentUserId(decodedToken.id);
      } else {
        fetchCurrentUser();
      }
    }
    fetchGoalData();
  }, [id, token]);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("https://qosyl-project-backend.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUserId(res.data.id);
    } catch (err) {
      console.error("Current user алу қатесі:", err);
    }
  };

  const fetchGoalData = async () => {
    try {
      const res = await axios.get(`https://qosyl-project-backend.onrender.com/api/goal/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoal(res.data.goal);
      setTasks(res.data.tasks);
      setStatuses(res.data.statuses);
      setParticipants(res.data.participants);
      setLoading(false);
    } catch (err) {
      console.error("Мәлімет жүктеу қатесі:", err);
      if (err.response && err.response.status === 403) {
        navigate("/forbidden");
      }
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post(
        `https://qosyl-project-backend.onrender.com/api/tasks/${id}`,
        {
          title: newTask,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewTask("");
      fetchGoalData();
      toast.success("Тапсырма қосылды!");
    } catch (err) {
      console.error("Тапсырма қосу қатесі:", err);
      toast.error("Тапсырма қосу мүмкін болмады!");
    }
  };

  const handleUpdateTask = async (taskId, newTitle) => {
    if (!newTitle.trim()) return;
    try {
      await axios.put(
        `https://qosyl-project-backend.onrender.com/api/tasks/${taskId}`,
        {
          title: newTitle,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingTask(null);
      setEditTitle("");
      fetchGoalData();
      toast.success("Тапсырма жаңартылды!");
    } catch (err) {
      console.error("Тапсырма өзгерту қатесі:", err);
      toast.error("Тапсырма жаңарту мүмкін болмады!");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Тапсырманы өшіруге сенімдісіз бе?")) return;
    try {
      await axios.delete(
        `https://qosyl-project-backend.onrender.com/api/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchGoalData();
      toast.success("Тапсырма өшірілді!");
    } catch (err) {
      console.error("Тапсырма өшіру қатесі:", err);
      toast.error("Тапсырма өшіру мүмкін болмады!");
    }
  };

  const handleToggleStatus = async (taskId, day) => {
    if (!currentUserId) return;
    const currentStatus = statuses.find(
      (s) => s.task_id == taskId && s.user_id == currentUserId && s.day === day
    );
    const newStatus = currentStatus?.status ? false : true;
    const taskTitle = tasks.find((t) => t.id === taskId)?.title || "Тапсырма";
    try {
      const formattedDay = new Date(day).toISOString().split("T")[0];
      await axios.put(
        `https://qosyl-project-backend.onrender.com/api/tasks/status/${taskId}`,
        {
          day: formattedDay,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (newStatus) {
        toast.success(`"${taskTitle}" орындалды!`);
      } else {
        toast.error(`"${taskTitle}" орындалмады деп белгіленді`);
      }
      fetchGoalData();
    } catch (err) {
      console.error("Статус жаңарту қатесі:", err);
      toast.error("Статус жаңарту мүмкін болмады");
    }
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTitle("");
  };

  const getDaysArray = () => {
    if (!goal) return [];
    const startDate = new Date(goal.start_date || goal.created_at);
    const days = [];
    for (let i = 0; i < goal.duration_days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const getStatusForUser = (taskId, userId, day) => {
    const status = statuses.find(
      (s) => s.task_id == taskId && s.user_id == userId && s.day === day
    );
    return status?.status === true;
  };

  const getCompletedTasksCount = (userId) => {
    return statuses.filter((s) => s.user_id == userId && s.status === true)
      .length;
  };

  const getTotalTasksCount = () => {
    return tasks.length * getDaysArray().length;
  };

  if (loading || !currentUserId) {
    return (
      <div className="loadingContainer">
        <div className="loadingText">Жүктелуде...</div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="loadingContainer">
        <div className="loadingText">Мақсат табылмады</div>
      </div>
    );
  }

  const days = getDaysArray();
  const participantNames = participants.map((p) => p.username).join(", ");
  const startDate = new Date(goal.start_date || goal.created_at);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0); 

  const diffTime = todayDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 

  const currentWeekIndex = Math.floor(diffDays / 7);
  const currentWeekNumber = currentWeekIndex + 1;

  const remainingDays = Math.max(0, goal.duration_days - diffDays - 1); 
  const startDayIndexForWeek = currentWeekIndex * 7;
  const endDayIndexForWeek = Math.min(startDayIndexForWeek + 7, days.length); 
  const daysForCurrentWeek = days.slice(
    startDayIndexForWeek,
    endDayIndexForWeek
  );

  const today = new Date().toISOString().split("T")[0];
  const currentDay = days.find((day) => day === today) || days[0];

  return (
    <div className="goalPage">
      <section className="welcomeSection">
        <h1 className="welcomeTitle">
          Қош келдің, <span className="userNames">{participantNames}</span>!
        </h1>
        <p className="welcomeSubtitle">
          Біз достармен бірге мақсатқа жетеміз және бір-бірімізді
          мотивациялаймыз
        </p>
        <div className="goalInfo">
          <div className="goalName">
            Мақсат: <span>{goal.goal_name}</span>
          </div>
          <div className="goalDuration">
            Ұзақтығы: <span>{goal.duration_days} күн</span>
          </div>
        </div>
      </section>
      <section className="todoSection">
        <div className="sectionHeader">
          <h2 className="sectionTitle">To Do List</h2>
          <div className="editIcon">
            <img src={editIcon || "/placeholder.svg"} alt="" />
          </div>
        </div>
        <div className="todoContent">
          <div className="todoListCard">
            <ul className="todoList">
              {tasks.map((task) => (
                <li key={task.id} className="todoItem">
                  {editingTask === task.id ? (
                    <div className="editTaskContainer">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="editTaskInput"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleUpdateTask(task.id, editTitle);
                          }
                        }}
                      />
                      <div className="editTaskButtons">
                        <button
                          onClick={() => handleUpdateTask(task.id, editTitle)}
                          className="saveBtn"
                        >
                          ✓
                        </button>
                        <button onClick={cancelEdit} className="cancelBtn">
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="taskItemContainer">
                      <span
                        onClick={() => startEdit(task)}
                        className="taskText"
                        title="Өзгерту үшін басыңыз"
                      >
                        {task.title}
                      </span>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="deleteBtnSmall"
                        title="Өшіру"
                      >
                        <img src={trashIcon || "/placeholder.svg"} alt="" />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="addTaskCard">
            <input
              type="text"
              placeholder="Жаңа тапсырма қосу..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
              className="addTaskInput"
            />
            <button onClick={handleAddTask} className="addTaskBtn">
              Қосу
            </button>
          </div>
        </div>
      </section>
      <section className="weekSection">
        <h2 className="weekTitle">Week {currentWeekNumber}</h2>
        <p className="weekSubtitle">
          Мақсаттың ақталуына {remainingDays} күн қалды
        </p>
        <div className="daysGrid">
          {daysForCurrentWeek.map((day, index) => {
            const dayNumberInGoal = startDayIndexForWeek + index + 1;
            const isToday =
              new Date(day).toDateString() === new Date().toDateString();
            return (
              <div
                key={day}
                className={`dayCard ${isToday ? "dayActive" : ""}`}
              >
                {dayNumberInGoal} күн
              </div>
            );
          })}
        </div>
      </section>
      <section className="usersStatusSection">
        <div className="usersContainer">
          {participants.map((participant) => {
            const completedTasks = getCompletedTasksCount(participant.id);
            const totalTasks = getTotalTasksCount();
            const isCurrentUser = participant.id === currentUserId;
            const progressPercentage =
              totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            return (
              <div key={participant.id} className="userSection">
                <h3 className="userTitle">
                  {participant.username}{" "}
                  <span className="You">{isCurrentUser && "(Сіз)"}</span>
                </h3>
                <div className="tasksList">
                  {tasks.map((task) => {
                    const isCompletedForCurrentDay = getStatusForUser(
                      task.id,
                      participant.id,
                      currentDay
                    );
                    return (
                      <div key={task.id} className="taskCard">
                        {editingTask === task.id && isCurrentUser ? (
                          <div className="taskEditMode">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="taskEditInput"
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleUpdateTask(task.id, editTitle);
                                }
                              }}
                            />
                            <div className="taskEditActions">
                              <button
                                onClick={() =>
                                  handleUpdateTask(task.id, editTitle)
                                }
                                className="saveIcon"
                              >
                                ✓
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="cancelIcon"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span
                              className={`taskTitle ${
                                isCompletedForCurrentDay ? "taskCompleted" : ""
                              }`}
                              onClick={() => {
                                if (isCurrentUser) {
                                  startEdit(task); 
                                }
                              }}
                              style={{
                                cursor: isCurrentUser ? "pointer" : "default",
                              }}
                              title={
                                isCurrentUser ? "Өзгерту үшін басыңыз" : ""
                              }
                            >
                              {task.title}
                            </span>
                            <div
                              onClick={() => {
                                if (isCurrentUser) {
                                  handleToggleStatus(task.id, currentDay); 
                                }
                              }}
                              className={`statusIcon ${
                                isCompletedForCurrentDay ? "completed" : ""
                              } ${isCurrentUser ? "clickable" : ""}`}
                              title={
                                isCompletedForCurrentDay
                                  ? "Орындалды"
                                  : "Орындалмады"
                              }
                            >
                              {isCompletedForCurrentDay ? "✓" : "○"}
                            </div>
                            {isCurrentUser && (
                              <div
                                onClick={() => handleDeleteTask(task.id)}
                                className="deleteIcon"
                              >
                                ✕
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="progressContainer">
                  <div className="progressCircle">
                    <svg width="120" height="120" className="progressSvg">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#E0E0E0"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth="10"
                        strokeDasharray={`${progressPercentage * 3.14} 314`}
                        strokeDashoffset="0"
                        transform="rotate(-90 60 60)"
                      />
                    </svg>
                    <div className="progressText">
                      <span className="progressNumber">{completedTasks}</span>
                      <span className="progressDivider">/</span>
                      <span className="progressTotal">{totalTasks}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="motivationSection">
        <div className="motivationContainer">
          <div className="motivationHeader">
            <h2 className="motivationTitle">Мотивация</h2>
          </div>
          <div className="motivationCards">
            <img
              className="motivationCard"
              src={motivation1 || "/placeholder.svg"}
              alt=""
            />
            <img
              className="motivationCard"
              src={motivation2 || "/placeholder.svg"}
              alt=""
            />
            <img
              className="motivationCard"
              src={motivation3 || "/placeholder.svg"}
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}
