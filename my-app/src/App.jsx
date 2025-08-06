import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Invite from "./components/Create";
import GoalPage from "./components/GoalPage";
import "./App.css";
import Join from "./components/Join";
import Instructions from "./components/Instructions";
import Ai from "./components/Ai";
import Error401 from "./components/ErrorPages/Error401";
import Error403 from "./components/ErrorPages/Error403";
import Error404 from "./components/ErrorPages/Error404";
import Error500 from "./components/ErrorPages/Error500";
import PrivateRoute from "./routes/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        toastStyle={{
          margin:"0 auto",
          marginTop: "40px",
          width:"300px",
          background: "linear-gradient(135deg, #159538, #1db954)",
          color: "#ffffff",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2)",
          borderRadius: "20px",
          fontSize: "17px",
          fontWeight: "600",
          letterSpacing: "0.3px",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          lineHeight: "1.4",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
        }}
        progressStyle={{
          background: "#ffffff",
          height: "4px",
          borderRadius: "2px",
        }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/InviteToGoal"
          element={
            <>
              <PrivateRoute>
                <Header />
                <Invite />
                <Footer />
              </PrivateRoute>
            </>
          }
        />
        <Route path="/invite/:token" element={<Join />} />
        <Route
          path="goal/:id"
          element={
            <>
              <PrivateRoute>
                <Header />
                <GoalPage />
                <Footer />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/instructions"
          element={
            <>
              <Header />
              <Instructions />
              <Footer />
            </>
          }
        />
        <Route
          path="/ai"
          element={
            <>
              <Header />
              <Ai />
              <Footer />
            </>
          }
        />
        <Route path="/unauthorized" element={<Error401 />} />
        <Route path="/forbidden" element={<Error403 />} />
        <Route path="/not-found" element={<Error404 />} />
        <Route path="/server-error" element={<Error500 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
