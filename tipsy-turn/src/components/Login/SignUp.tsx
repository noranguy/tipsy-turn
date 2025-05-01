import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.tsx';
import './Login.css'; 
import axios from 'axios';


function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/signup', {
        email,
        username,
        password,
        });
        alert(response.data.message);
        navigate('/');
    } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed. Please try again.');
    }
    };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type = "submit" className="button">Sign Up</button>
        <button className="toggle-button" onClick={() => navigate('/')}>
             Have an account? Login!
         </button>      
        </form>
    </div>
  );
}

export default SignUp;
