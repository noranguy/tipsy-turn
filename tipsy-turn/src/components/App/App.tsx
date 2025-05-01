import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Login/Login.tsx';
import SignUp from '../Login/SignUp.tsx';
import Dashboard from '../Dashboard/Dashboard.tsx';
import LandingPage from '../LandingPage/LandingPage.tsx';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
  );
}

export default App;


