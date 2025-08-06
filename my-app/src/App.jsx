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

function App() {
  return (
    <BrowserRouter>
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
