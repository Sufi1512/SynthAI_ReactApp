import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Upload } from "lucide-react";
import axios from "axios";

interface Analysis {
  score: number;
  keywordMatch: number;
  formatScore: number;
  missingKeywords: string[];
  strengths: string[];
  suggestions: string[];
}

const ATSAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/analyze", {
        jobDescription,
        resume,
      });
      const parsedData = JSON.parse(response.data);
  
      if (!parsedData["ATS score"]) {
        throw new Error("Missing 'ATS score' field in response");
      }
  
      const formattedData: Analysis = {
        score: parseInt(parsedData["ATS score"].replace("%", ""), 10) || 0,
        keywordMatch: parseInt(parsedData["Keyword match percentage"].replace("%", ""), 10) || 0,
        formatScore: parseInt(parsedData["Format score"].replace("%", ""), 10) || 0,
        missingKeywords: parsedData["Missing keywords"] ?? [],
        strengths: parsedData["Strengths"] ?? [],
        suggestions: parsedData["Suggestions for improvement"] ?? [],
      };
  
      setAnalysis(formattedData);
    } catch (err: any) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ScoreRing = ({ score, size = 160 }: { score: number; size?: number }) => {
    const circumference = size * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;
  
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={size / 2 - 4}
            cx={size / 2}
            cy={size / 2}
          />
          <motion.circle
            className="text-indigo-600"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={size / 2 - 4}
            cx={size / 2}
            cy={size / 2}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            style={{ strokeDasharray: circumference }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold text-indigo-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}%
          </motion.span>
          <span className="text-sm text-gray-600">ATS Score</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center">
            ATS Resume Analyzer
            <motion.span
              className="inline-block ml-3"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Optimize your resume for Applicant Tracking Systems (ATS) with personalized feedback. Paste your job description and resume below to get detailed insights on how to improve your chances of getting noticed by recruiters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <textarea
              className="w-full h-40 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 bg-white shadow-sm transition-all"
              placeholder="Paste Job Description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <textarea
              className="w-full h-40 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600 bg-white shadow-sm transition-all"
              placeholder="Paste Resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
            <motion.button
              onClick={analyzeResume}
              disabled={!jobDescription || !resume || loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:bg-gradient-to-l disabled:bg-gray-400 flex items-center justify-center gap-3 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Upload className="h-5 w-5" />
                  </motion.div>
                  Analyzing...
                </>
              ) : (
                <>
                  <ArrowRight className="h-5 w-5" />
                  Analyze Resume
                </>
              )}
            </motion.button>
            {error && <p className="text-red-600 text-center">{error}</p>}
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {!analysis ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-600 bg-white rounded-2xl shadow-xl p-8">
                <p className="text-lg leading-relaxed text-center">
                  Enter your job description and resume to receive a comprehensive analysis, including ATS compatibility scores, keyword matches, and tailored suggestions for improvement.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <div className="flex justify-center">
                  <ScoreRing score={analysis.score} />
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Keyword Match</p>
                    <p className="text-3xl font-bold text-indigo-600">{analysis.keywordMatch}%</p>
                    <p className="text-gray-600 text-sm mt-2">Percentage of keywords from the job description found in your resume.</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Format Score</p>
                    <p className="text-3xl font-bold text-indigo-600">{analysis.formatScore}%</p>
                    <p className="text-gray-600 text-sm mt-2">Evaluation of your resume’s readability and ATS-friendly formatting.</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Strengths</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Suggestions</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      {analysis.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ATSAnalyzer;