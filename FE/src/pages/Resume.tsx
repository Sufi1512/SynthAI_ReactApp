import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Upload } from "lucide-react";
import axios from "axios"; // Ensure axios is installed

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
  
      // Parse the response data as it's a JSON string
      const parsedData = JSON.parse(response.data);
  
      console.log("Parsed API Data:", parsedData);
  
      // Validate the parsed data structure
      if (!parsedData || typeof parsedData !== "object") {
        throw new Error("Invalid response format");
      }
  
      if (!parsedData["ATS score"]) {
        throw new Error("Missing 'ATS score' field in response");
      }
  
      // Process the parsed response
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
      console.error("API Error:", err.response?.status, err.response?.data);
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
            stroke="gray"
            fill="transparent"
            r={size / 2 - 4}
            cx={size / 2}
            cy={size / 2}
          />
          <motion.circle
            className="text-indigo-600"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="indigo"
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <textarea
              className="w-full h-40 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 transition-all"
              placeholder="Paste Job Description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <textarea
              className="w-full h-40 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 transition-all"
              placeholder="Paste Resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
            <button
              onClick={analyzeResume}
              disabled={!jobDescription || !resume || loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:bg-gradient-to-l disabled:bg-gray-400 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Upload className="h-5 w-5 text-white animate-spin" />
                  </motion.div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <ArrowRight className="h-5 w-5" />
                  <span>Analyze Resume</span>
                </>
              )}
            </button>
            {error && <p className="text-red-600">{error}</p>}
          </div>
  
          {/* Conditional rendering for Header or Results */}
          <div className="space-y-6">
            {!analysis ? (
              // If no analysis result, show header section
              <div className="flex flex-col items-center justify-center py-12 text-gray-600">
                <div className="bg-white py-4 border-b shadow-lg w-full">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
                          ATS Resume Analyzer
                          <motion.span
                            className="inline-block ml-2"
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Sparkles className="h-5 w-5 text-yellow-400" />
                          </motion.span>
                        </h1>
                        <p className="mt-1 text-gray-600 text-sm">Optimize your resume for ATS with personalized feedback.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // If analysis result exists, show results
              <>
  <div className="flex flex-col items-center p-8 bg-white shadow-xl rounded-lg space-y-6 max-w-2xl mx-auto">
    {/* Score Ring */}
    <div className="flex justify-center w-full">
      <ScoreRing score={analysis.score} />
    </div>
    
    {/* Keyword Match */}
    <div className="w-full space-y-4">
      <p className="text-xl font-semibold text-gray-800">Keyword Match</p>
      <div className="text-3xl font-bold text-indigo-600">{analysis.keywordMatch}%</div>
    </div>

    {/* Format Score */}
    <div className="w-full space-y-4">
      <p className="text-xl font-semibold text-gray-800">Format Score</p>
      <div className="text-3xl font-bold text-indigo-600">{analysis.formatScore}%</div>
    </div>

    {/* Strengths */}
    <div className="w-full space-y-4">
      <p className="text-xl font-semibold text-gray-800">Strengths</p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        {analysis.strengths.map((s, i) => (
          <li key={i} className="text-lg">{s}</li>
        ))}
      </ul>
    </div>

    {/* Suggestions */}
    <div className="w-full space-y-4">
      <p className="text-xl font-semibold text-gray-800">Suggestions</p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        {analysis.suggestions.map((s, i) => (
          <li key={i} className="text-lg">{s}</li>
        ))}
      </ul>
    </div>
  </div>
</>

            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default ATSAnalyzer;
