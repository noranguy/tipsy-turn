import './LandingPage.css';
import NavBar from '../NavBar/NavBar';

function LandingPage() {
    return (
        <div>
            <NavBar />
            <div className="landing-page-content">
                <div className="landing-page">
                <h1 className="title">Tipsy Turn</h1>
            </div>
            </div>
        </div>
    );
};

export default LandingPage;