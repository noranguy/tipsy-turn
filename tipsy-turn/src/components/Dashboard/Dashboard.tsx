// Dashboard.tsx
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

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
            <h2>Welcome to the Dashboard, {username}!</h2>
            {/* You can add more content or components here */}
        </div>
    );
}

export default Dashboard;
