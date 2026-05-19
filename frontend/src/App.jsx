import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Analysis from "./Analysis";
import Result from "./Result";
import "./App.css";
import logo from "./assets/logo.png";
import aiBadge from "./assets/public:ai-badge.png";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="CV Checker Logo"
        className="logo-image"
        onClick={() => navigate("/")}
      />

      <div className="nav-links">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/analysis")}>Analysis</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
    
          <h1>Analyze Your CV Against Job Requirements</h1>

          <p>
  Get an instant match score, identify skills gaps, and receive actionable
  improvements to strengthen your job application.
</p>

<div className="ai-badge">
  <img src={aiBadge} alt="AI" />
</div>
          <button onClick={() => navigate("/analysis")}>Start Analysis</button>
        </div>
      </section>

      <section className="why">
        <h2>Why Choose CV Checker?</h2>
        <p className="section-subtitle">
          Everything you need to optimize your job application
        </p>

        <div className="cards">
          <div className="card">
            <div className="icon">◎</div>
            <h3>Instant Match Score</h3>
            <p>See how well your CV aligns with the job description in seconds.</p>
          </div>

          <div className="card">
            <div className="icon">↗</div>
            <h3>Find Missing Skills</h3>
            <p>Identify key skills and qualifications that are missing from your CV.</p>
          </div>

          <div className="card">
            <div className="icon">💡</div>
            <h3>Improve Your Application</h3>
            <p>Get specific recommendations to enhance your CV and stand out.</p>
          </div>
        </div>
      </section>

      <section className="how">
        <h2>How It Works</h2>
        <p className="section-subtitle">
          Three simple steps to optimize your CV
        </p>

        <div className="steps">
          <div className="step">
            <div className="icon">📄</div>
            <h4>STEP 1</h4>
            <h3>Paste Your CV</h3>
            <p>Copy and paste your CV content into the text area.</p>
          </div>

          <div className="step">
            <div className="icon">💼</div>
            <h4>STEP 2</h4>
            <h3>Add Job Description</h3>
            <p>Paste the job posting you are applying for.</p>
          </div>

          <div className="step">
            <div className="icon">✔</div>
            <h4>STEP 3</h4>
            <h3>Get Analysis</h3>
            <p>Receive a match score and improvement recommendations.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to improve your CV?</h2>
        <p>
          Use CV Checker to improve your application before submitting it.
        </p>

        <button onClick={() => navigate("/analysis")}>
          Start Free Analysis
        </button>
      </section>
    </main>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;