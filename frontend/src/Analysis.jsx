import { useState } from "react";
import pdfToText from "react-pdftotext";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Analysis() {
  const [cvText, setCvText] = useState("");
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handlePdfUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    pdfToText(file)
      .then((text) => setCvText(text))
      .catch(() => {
        alert("Could not read this PDF. Please try another file.");
      });
  }

  async function analyzeCV() {
    if (cvText.trim() === "" || jobText.trim() === "") {
      alert("Please add both your CV and the job description first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvText,
          jobText,
        }),
      });

      const data = await response.json();

      if (data.error) {
        const finalResult = {
          score: 0,
          matched: [],
          missing: [],
          suggestions: [
            "AI analysis is temporarily unavailable.",
            "Please try again later when the AI service is available.",
            "The application is working, but the external AI service did not respond.",
          ],
        };

        localStorage.setItem("cvResult", JSON.stringify(finalResult));
        setLoading(false);

        navigate("/result", {
          state: {
            result: finalResult,
          },
        });

        return;
      }

      const finalResult = {
        score: data.score,
        matched: data.matched || [],
        missing: data.missing || [],
        suggestions: data.suggestions || [],
      };

      localStorage.setItem("cvResult", JSON.stringify(finalResult));

      setLoading(false);

      navigate("/result", {
        state: {
          result: finalResult,
        },
      });
    } catch (error) {
      const finalResult = {
        score: 0,
        matched: [],
        missing: [],
        suggestions: [
          "AI analysis is temporarily unavailable.",
          "Please try again later when the AI service is available.",
          "The application is working, but the external AI service did not respond.",
        ],
      };

      localStorage.setItem("cvResult", JSON.stringify(finalResult));
      setLoading(false);

      navigate("/result", {
        state: {
          result: finalResult,
        },
      });
    }
  }

  return (
    <section className="analysis-page">
      <div className="analysis-header">
        <h1>CV Analysis</h1>
        <p>
          Paste your CV and the job description below to receive your match score
          and recommendations.
        </p>
      </div>

      <div className="analysis-grid">
        <div className="input-card">
          <div className="input-title">
            <span className="small-icon">📄</span>
            <h3>Your CV</h3>
          </div>

          <textarea
            placeholder="Paste your CV content here..."
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
          />

          <div className="pdf-upload">
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
            />
          </div>

          <p className="counter">{cvText.length} characters</p>
        </div>

        <div className="input-card">
          <div className="input-title">
            <span className="small-icon">💼</span>
            <h3>Job Description</h3>
          </div>

          <textarea
            placeholder="Paste the job description here..."
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
          />

          <p className="counter">{jobText.length} characters</p>
        </div>
      </div>

      <div className="button-card">
        <button onClick={analyzeCV} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze CV"}
        </button>

        <p>Upload or paste your CV, then paste the job description.</p>
      </div>
    </section>
  );
}

export default Analysis;