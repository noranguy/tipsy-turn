// Dashboard.tsx
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
    const [username, setUsername] = useState("");
    const [selectedBox, setSelectedBox] = useState<[number, number]|null>(null);
    const [prevBox, setPrevBox] = useState<[number, number]|null>(null);

      const navigate = useNavigate();

    //change to be able to add more rows & columns with more techs
    const rows = 10;
    const cols = 15;
    const [grid, setGrid] = useState<string[][]>(
        Array.from({length:rows }, () =>
             Array.from({length:cols }, () => "")
    )
    );
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token){
            navigate('/login');
            return;
        }
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
    const handleBoxClick = (status: string) =>{
        if(selectedBox){
            const [row, col] = selectedBox;
            const prevCol = col - 1; 
            if(prevCol >= 0){
                const prevStatus = grid[row][prevCol];
                 if(prevStatus === ""){
                    return
                }
            }
            const newStatus = grid.map((r, i) =>
                r.map((s,j) => (i === row && j === col ? status : s)));            

            setGrid(newStatus);
        }
    }
    return (
        <div>
            <NavBar />
            <div className="dashboard-container">
                <h2>Welcome to the Dashboard, {username}!</h2>
                <div className="grid-container">
                    {Array.from({ length: rows }, (_, rowIndex) => (
                        <div key={rowIndex} className="grid-row">
                            {Array.from({ length: cols }, (_, colIndex) => {
                                const status = grid[rowIndex][colIndex];
                                const color =
                                    status === "W" || status === "W/A" || status === "Skip" || status === "white" ? "white" :
                                    status === "black" ? "black" : "#A4C3B2";
                             return(
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`grid-box ${selectedBox && selectedBox[0] === rowIndex && selectedBox[1] === colIndex ? 'selected' : ''}`}
                                    style={{backgroundColor: color}}
                                    onClick={() => setSelectedBox([rowIndex, colIndex])}
                                >{status === "W" || status === "W/A" || status === "Skip" ? status : ""} </div>
                                );
                            })} 
                        </div>
                    ))}
            </div>
        </div>
        <div className= "sidebar">
            <h2>Turn Settings</h2>
            <div className ="sidebar-button-grid">
                <div className ="sidebar-button-row">
                    <button onClick={()=>handleBoxClick("W")}>W</button>
                    <button onClick={() => handleBoxClick("black")}>black</button>
                    <button onClick={()=> handleBoxClick("Skip")}>Skip</button>
                </div>
                <div className ="sidebar-button-row">
                    <button onClick ={()=>handleBoxClick("W/A")}>W/A</button> 
                    <button onClick={() => handleBoxClick("white")}>white</button>
                </div>
            </div>
            {/*debugging*/}
            <h3>Selected Box: {selectedBox ? `Row ${selectedBox[0]}, Col ${selectedBox[1]}` : "None"}</h3> 
            <h2>Login Techs</h2>
            <button>Add New Tech</button>
        </div>
     </div>
    );
}

export default Dashboard;
