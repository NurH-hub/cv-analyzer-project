import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/analyze", async (req, res) => {
  try {
    const { cvText, jobText } = req.body;

    const prompt = `
You are a professional CV analyzer.

Compare the CV with the job description.

Return ONLY valid JSON in this exact format:
{
  "score": 0,
  "matched": ["matched area 1", "matched area 2"],
  "missing": ["missing area 1", "missing area 2"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Rules:
- Score must be a realistic percentage from 0 to 100.
- Do not give 100 unless the CV is truly excellent for the job.
- Matched areas should be real strengths from the CV.
- Missing areas should be real weaknesses compared with the job.
- Suggestions should be short and practical.
- Do not include markdown.
- Do not include explanation outside JSON.

CV:
${cvText}

Job Description:
${jobText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.candidates[0].content.parts[0].text;

    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const aiResult = JSON.parse(cleanText);

    res.json(aiResult);
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      error: "AI analysis is temporarily unavailable. Please try again later.",
    });
  }
});

app.listen(5001, () => {
  console.log("Backend running on http://localhost:5001");
});