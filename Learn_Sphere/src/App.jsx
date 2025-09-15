//TO-DO: Make Node Server and Link to Database
// src/App.jsx
import React from "react";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ByeBye from "./pages/byebye";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";



function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/reg" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home/*" element={<DashboardPage />} />
          <Route path="/byebye" element={<ByeBye />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;
