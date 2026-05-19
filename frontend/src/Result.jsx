import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const savedResult = localStorage.getItem("cvResult");

  const result =
    location.state?.result ||
    (savedResult ? JSON.parse(savedResult) : null);

  if (!result) {
    return (
      <section className="result-page">
        <div className="result-main-card">
          <h2>No result yet</h2>
          <p>Please analyze your CV first.</p>

          <button onClick={() => navigate("/analysis")}>
            Go to Analysis
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="result-page">
      <div className="score-card">
        <h1>{result.score}%</h1>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${result.score}%` }}
          ></div>
        </div>

        <p>
          {result.score >= 70
            ? "Great match! Your CV fits this job well."
            : "Your CV could be improved to better match this position."}
        </p>
      </div>

      <div className="skills-grid">
        <div className="skill-card">
          <div className="skill-title">
            <span className="green-icon">✓</span>
            <h2>Matched Areas</h2>
          </div>

          {(result.matched?.length > 0
            ? result.matched
            : ["None identified"]
          ).map((item, index) => (
            <div className="skill-item" key={index}>
              <span className="green-text">✓</span>
              {item}
            </div>
          ))}
        </div>

        <div className="skill-card">
          <div className="skill-title">
            <span className="red-icon">×</span>
            <h2>Missing Areas</h2>
          </div>

          {(result.missing?.length > 0
            ? result.missing
            : ["None identified"]
          ).map((item, index) => (
            <div className="skill-item" key={index}>
              <span className="red-text">×</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="ai-result-box">
        <div className="skill-title">
          <span className="blue-icon">💡</span>
          <h2>AI Suggestions</h2>
        </div>

        <p>
          {result.aiText ||
            "AI suggestions are currently unavailable. Please try again."}
        </p>
      </div>

      <div className="result-buttons">
        <button onClick={() => navigate("/analysis")}>
          New Analysis
        </button>

        <button
          className="outline-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </section>
  );
}

export default Result;