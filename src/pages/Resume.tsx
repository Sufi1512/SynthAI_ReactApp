import React, { useState } from 'react'; 
import { motion } from 'framer-motion'; 
import { FileText, CheckCircle2, XCircle, AlertCircle, Sparkles, ArrowRight, Upload } from 'lucide-react'; 
import axios from 'axios'; // Make sure axios is installed

interface Analysis {
  score: number;
  keywordMatch: number;
  formatScore: number;
  missingKeywords: string[];
  strengths: string[];
  suggestions: string[];
}

const ATSAnalyzer = () => { 
  const [jobDescription, setJobDescription] = useState(''); 
  const [resume, setResume] = useState(''); 
  const [analysis, setAnalysis] = useState<Analysis | null>(null); 
  const [loading, setLoading] = useState(false); 

  const analyzeResume = async () => { 
    setLoading(true); 
    try {
      // Send data to the backend API for analysis
      const response = await axios.post('/api/analyze', { jobDescription, resume });

      // Assuming the API returns the analysis result
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
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
          <motion.span className="text-4xl font-bold text-indigo-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}> 
            {score}% 
          </motion.span> 
          <span className="text-sm text-gray-600">ATS Score</span> 
        </div> 
      </div> 
    ); 
  }; 

  return ( 
    <div className="min-h-screen bg-gray-100"> 
      {/* Header Section */}
      <div className="bg-white py-8 border-b shadow-lg"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="flex items-center justify-between"> 
            <div> 
              <h1 className="text-3xl font-semibold text-gray-900 flex items-center">
                ATS Resume Analyzer 
                <motion.span 
                  className="inline-block ml-2" 
                  animate={{ rotate: [0, 15, -15, 0] }} 
                  transition={{ duration: 2, repeat: Infinity }} 
                > 
                  <Sparkles className="h-6 w-6 text-yellow-400" /> 
                </motion.span> 
              </h1> 
              <p className="mt-2 text-gray-600 text-sm">Optimize your resume for Applicant Tracking Systems (ATS) with personalized feedback and suggestions.</p> 
            </div> 
          </div> 
        </div> 
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> 
        <div className="grid md:grid-cols-2 gap-8"> 
          {/* Input Section */}
          <div className="space-y-6"> 
            <div> 
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label> 
              <textarea 
                className="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent" 
                placeholder="Paste the job description here..." 
                value={jobDescription} 
                onChange={(e) => setJobDescription(e.target.value)} 
              /> 
            </div> 
            <div> 
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Resume</label> 
              <textarea 
                className="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent" 
                placeholder="Paste your resume content here..." 
                value={resume} 
                onChange={(e) => setResume(e.target.value)} 
              /> 
            </div> 
            <button 
              onClick={analyzeResume} 
              disabled={!jobDescription || !resume || loading} 
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? ( 
                <> 
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
                  > 
                    <Upload className="h-5 w-5" /> 
                  </motion.div> 
                  Analyzing... 
                </> 
              ) : ( 
                <> 
                  Analyze Resume <ArrowRight className="h-5 w-5" /> 
                </> 
              )} 
            </button> 
          </div> 

          {/* Results Section */}
          {analysis && ( 
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="bg-white rounded-xl shadow-lg p-6 mt-8"
            > 
              <div className="flex flex-col items-center mb-8"> 
                <ScoreRing score={analysis.score} /> 
                <div className="grid grid-cols-2 gap-4 mt-6 w-full"> 
                  <div className="text-center p-4 bg-gray-50 rounded-lg"> 
                    <div className="text-2xl font-bold text-indigo-600">{analysis.keywordMatch}%</div> 
                    <div className="text-sm text-gray-600">Keyword Match</div> 
                  </div> 
                  <div className="text-center p-4 bg-gray-50 rounded-lg"> 
                    <div className="text-2xl font-bold text-indigo-600">{analysis.formatScore}%</div> 
                    <div className="text-sm text-gray-600">Format Score</div> 
                  </div> 
                </div> 
              </div> 

              <div className="space-y-6"> 
                <div> 
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2"> 
                    <AlertCircle className="h-5 w-5 text-yellow-500" /> Missing Keywords 
                  </h3> 
                  <div className="flex flex-wrap gap-2"> 
                    {analysis.missingKeywords.map((keyword) => ( 
                      <span key={keyword} className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm"> 
                        {keyword} 
                      </span> 
                    ))} 
                  </div> 
                </div> 

                <div> 
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2"> 
                    <CheckCircle2 className="h-5 w-5 text-green-500" /> Strengths 
                  </h3> 
                  <ul className="space-y-2"> 
                    {analysis.strengths.map((strength) => ( 
                      <li key={strength} className="flex items-center gap-2 text-green-600"> 
                        <CheckCircle2 className="h-4 w-4" /> 
                        {strength} 
                      </li> 
                    ))} 
                  </ul> 
                </div> 

                <div> 
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2"> 
                    <XCircle className="h-5 w-5 text-red-500" /> Suggestions for Improvement 
                  </h3> 
                  <ul className="space-y-2"> 
                    {analysis.suggestions.map((suggestion) => ( 
                      <li key={suggestion} className="flex items-center gap-2 text-red-600"> 
                        <XCircle className="h-4 w-4" /> 
                        {suggestion} 
                      </li> 
                    ))} 
                  </ul> 
                </div> 
              </div> 
            </motion.div> 
          )}
        </div>
      </div> 
    </div> 
  );
}; 

export default ATSAnalyzer;
