import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const cors = require("cors");
const corsOptions = {
  origin: ["https://dustweb-78ea0.web.app/", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}
root.render(
  <React.StrictMode>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
App.use(cors(corsOptions));
reportWebVitals();
