import {useState, FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.tsx';
import './Login.css';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/', {
                username,
                password,
            });
            alert(res.data.message);
            navigate('/dashboard');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type ="submit" className ="button">Login</button>
                <button className="toggle-button" onClick={() => navigate('/signup')}>
                Don't have an account? Sign Up!
                </button>
            </form>
        </div>
    );
}
export default Login;