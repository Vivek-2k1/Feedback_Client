import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route}  from "react-router-dom"
import Feedback from "./Feedback"
import AdminLogin from "./AdminLogin"
import AdminPanel from "./AdminPanel"
import NavBar from "./NavBar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={ <Feedback/> } />
          <Route path="/adminlogin" element={ <AdminLogin/> } />
          <Route path="/adminpanel" element={ <AdminPanel/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
