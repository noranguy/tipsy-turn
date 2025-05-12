// Dashboard.tsx
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/dashboard',{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        })
            .then(req => {
                setUsername(req.data.username);
            })
            .catch(error => {
                console.error("Error fetching username:", error);
            });
    }, []);

    return (
        <div>
            <NavBar />
            <div className="dashboard-container">
                <h2>Welcome to the Dashboard, {username}!</h2>
            </div>
        </div>
    );
}

export default Dashboard;
