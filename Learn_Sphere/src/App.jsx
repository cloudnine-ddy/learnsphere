//TO-DO: Make Node Server and Link to Database
// src/App.jsx
import React from "react";
import RegisterPage from "./pages/RegisterPage";
import Lessons from "./pages/Lessons"
import LessonCreatePage from "./pages/AddLesson";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

function App() {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#f0f0f0" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/reg" element={<RegisterPage />} />
          <Route path="/lessons" element={<Lessons />}/>
          <Route path="/newlesson" element={<LessonCreatePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
