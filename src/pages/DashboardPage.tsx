import React, { useState } from 'react';
import { Code, Image, MessageSquare, Music, Video, History, Settings } from 'lucide-react';

type GenerationType = 'text' | 'image' | 'audio' | 'video' | 'code';

interface GenerationResult {
  id: string;
  type: GenerationType;
  prompt: string;
  result: string;
  timestamp: Date;
}

function DashboardPage() {
  const [inputText, setInputText] = useState('');
  const [selectedType, setSelectedType] = useState<GenerationType>('text');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [generationHistory, setGenerationHistory] = useState<GenerationResult[]>([]);

  const generationTypes = [
    { 
      type: 'text', 
      icon: MessageSquare, 
      label: 'Text Generation',
      description: 'Generate human-like text for articles, stories, or marketing copy',
      examples: ['Write a blog post about AI trends', 'Create a product description', 'Generate a creative story']
    },
    { 
      type: 'image', 
      icon: Image, 
      label: 'Image Creation',
      description: 'Create stunning images from textual descriptions',
      examples: ['A sunset over a cyberpunk city', 'A realistic portrait of a fantasy character', 'Abstract digital art']
    },
    { 
      type: 'audio', 
      icon: Music, 
      label: 'Audio Synthesis',
      description: 'Generate music, sound effects, and voice content',
      examples: ['Create a lofi background track', 'Generate nature ambience', 'Synthesize voice narration']
    },
    { 
      type: 'video', 
      icon: Video, 
      label: 'Video Generation',
      description: 'Create video content from text descriptions',
      examples: ['Animated logo reveal', 'Product demonstration', 'Short animated scene']
    },
    { 
      type: 'code', 
      icon: Code, 
      label: 'Code Generation',
      description: 'Generate code snippets and complete functions',
      examples: ['React component for a modal', 'Python data processing script', 'API endpoint in Node.js']
    },
    
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulated API call
    setTimeout(() => {
      const newResult: GenerationResult = {
        id: Math.random().toString(36).substr(2, 9),
        type: selectedType,
        prompt: inputText,
        result: `Generated ${selectedType} content will appear here...`,
        timestamp: new Date()
      };
      setGenerationHistory(prev => [newResult, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const selectedTypeInfo = generationTypes.find(t => t.type === selectedType)!;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 rounded-lg hover:bg-white"
          >
            <History className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white">
            <Settings className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 bg-white rounded-xl shadow-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {generationTypes.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setSelectedType(type as GenerationType)}
                className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                  selectedType === type
                    ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-500'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedTypeInfo.label}
            </h2>
            <p className="text-gray-600 mb-4">
              {selectedTypeInfo.description}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Example prompts:</p>
              <ul className="list-disc list-inside space-y-1">
                {selectedTypeInfo.examples.map((example, index) => (
                  <li 
                    key={index}
                    className="text-sm text-gray-600 cursor-pointer hover:text-indigo-600"
                    onClick={() => setInputText(example)}
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Describe what you want to generate...\nBe as detailed as possible for better results`}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {inputText.length} / 1000 characters
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !inputText.trim()}
                className={`px-8 py-3 rounded-lg text-white font-medium transition-all flex items-center ${
                  isGenerating || !inputText.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Generating...
                  </>
                ) : 'Generate'}
              </button>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Content</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              {generationHistory.length > 0 ? (
                <div className="w-full">
                  <p className="font-medium mb-2">Latest Generation:</p>
                  <div className="bg-white p-4 rounded-lg">
                    {generationHistory[0].result}
                  </div>
                </div>
              ) : (
                'Your generated content will appear here'
              )}
            </div>
          </div>
        </div>

        {showHistory && (
          <div className="w-80 bg-white rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Generation History</h2>
              <button 
                onClick={() => setShowHistory(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {generationHistory.map(item => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    {(() => {
                      const TypeIcon = generationTypes.find(t => t.type === item.type)?.icon;
                      return TypeIcon && <TypeIcon className="h-4 w-4 text-gray-600 mr-2" />;
                    })()}
                    <span className="text-sm font-medium text-gray-700">
                      {generationTypes.find(t => t.type === item.type)?.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.prompt}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default DashboardPage