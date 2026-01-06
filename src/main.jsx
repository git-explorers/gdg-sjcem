import AOS from "aos";
import "aos/dist/aos.css";
import './App.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

AOS.init({
  duration: 800,
  once: true,
  easing: "ease-out-cubic",
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
