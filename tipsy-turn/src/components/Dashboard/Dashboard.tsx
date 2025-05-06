// Dashboard.tsx
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Simulate fetching the username (replace with actual API call if needed)
        axios.get("/dashboard") // Replace with your actual API endpoint
            .then(response => {
                setUsername(response.data.username); // Assuming the API returns { username: "JohnDoe" }
            })
            .catch(error => {
                console.error("Error fetching username:", error);
            });
    }, []);

    return (
        <div>
            <NavBar />
            <h2>Welcome to the Dashboard {username ? `'${username}'` : ""}</h2>
            {/* You can add more content or components here */}
        </div>
    );
}

export default Dashboard;
