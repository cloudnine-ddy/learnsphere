// src/main.jsx
import './style.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'   // 引入 App

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
