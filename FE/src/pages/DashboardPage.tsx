import { useState } from 'react';
import { Code2, Image, MessageSquare, Music, Video, History, Settings } from 'lucide-react';
import TextModel from '../components/TextModel';
import CodeModel from '../components/CodeModel';
import AudioModel from '../components/AudioModel';
import VideoModel from '../components/VideoModel';
import ImageModel from '../components/ImageModel';
import {
  textModelApi,
  codeModelApi,
  audioModelApi,
  videoModelApi,
  imageModelApi,
} from '../api/modelApi';

type GenerationType = 'text' | 'image' | 'audio' | 'video' | 'code';

interface GenerationResult {
  id: string;
  type: GenerationType;
  prompt: string;
  result: string;
  timestamp: Date;
}

const generationTypes = [
  { 
    type: 'text', 
    icon: MessageSquare, 
    label: 'Text Generation',
    description: 'Generate human-like text for articles, stories, or marketing copy',
    examples: ['Write a blog post about AI trends', 'Create a product description', 'Generate a creative story'],
    color: 'blue'
  },
  { 
    type: 'image', 
    icon: Image, 
    label: 'Image Creation',
    description: 'Create stunning images from textual descriptions',
    examples: ['A sunset over a cyberpunk city', 'A realistic portrait of a fantasy character', 'Abstract digital art'],
    color: 'orange'
  },
  { 
    type: 'audio', 
    icon: Music, 
    label: 'Audio Synthesis',
    description: 'Generate music, sound effects, and voice content',
    examples: ['Create a lofi background track', 'Generate nature ambience', 'Synthesize voice narration'],
    color: 'purple'
  },
  { 
    type: 'video', 
    icon: Video, 
    label: 'Video Generation',
    description: 'Create video content from text descriptions',
    examples: ['Animated logo reveal', 'Product demonstration', 'Short animated scene'],
    color: 'red'
  },
  { 
    type: 'code', 
    icon: Code2, 
    label: 'Code Generation',
    description: 'Generate code snippets and complete functions',
    examples: ['React component for a modal', 'Python data processing script', 'API endpoint in Node.js'],
    color: 'green'
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<GenerationType>('text');
  const [showHistory, setShowHistory] = useState(false);
  const [generationHistory, setGenerationHistory] = useState<GenerationResult[]>([]);
  const [results, setResults] = useState({
    text: { result: '', loading: false, error: '' },
    code: { result: '', loading: false, error: '' },
    audio: { result: '', loading: false, error: '' },
    video: { result: '', loading: false, error: '' },
    image: { result: '', loading: false, error: '' },
  });

  const handleTextSubmit = async (input: string) => {
    try {
      setResults(prev => ({ ...prev, text: { ...prev.text, loading: true, error: '' } }));
      const result = await textModelApi(input);
      setResults(prev => ({ ...prev, text: { result, loading: false, error: '' } }));
      addToHistory('text', input, result);
    } catch (error) {
      setResults(prev => ({
        ...prev,
        text: { ...prev.text, loading: false, error: 'Failed to process text' },
      }));
    }
  };

  const handleCodeSubmit = async (input: string) => {
    try {
      setResults(prev => ({ ...prev, code: { ...prev.code, loading: true, error: '' } }));
      const result = await codeModelApi(input);
      setResults(prev => ({ ...prev, code: { result, loading: false, error: '' } }));
      addToHistory('code', input, result);
    } catch (error) {
      setResults(prev => ({
        ...prev,
        code: { ...prev.code, loading: false, error: 'Failed to generate code' },
      }));
    }
  };

  const handleAudioSubmit = async (input: string) => {
    try {
      setResults(prev => ({ ...prev, audio: { ...prev.audio, loading: true, error: '' } }));
      const result = await audioModelApi(input);
      setResults(prev => ({ ...prev, audio: { result, loading: false, error: '' } }));
      addToHistory('audio', input, result);
    } catch (error) {
      setResults(prev => ({
        ...prev,
        audio: { ...prev.audio, loading: false, error: 'Failed to process audio' },
      }));
    }
  };

  const handleVideoSubmit = async (input: string) => {
    try {
      setResults(prev => ({ ...prev, video: { ...prev.video, loading: true, error: '' } }));
      const result = await videoModelApi(input);
      setResults(prev => ({ ...prev, video: { result, loading: false, error: '' } }));
      addToHistory('video', input, result);
    } catch (error) {
      setResults(prev => ({
        ...prev,
        video: { ...prev.video, loading: false, error: 'Failed to analyze video' },
      }));
    }
  };

  const handleImageSubmit = async (input: string) => {
    try {
      setResults(prev => ({ ...prev, image: { ...prev.image, loading: true, error: '' } }));
      const result = await imageModelApi(input);
      setResults(prev => ({ ...prev, image: { result, loading: false, error: '' } }));
      addToHistory('image', input, result);
    } catch (error) {
      setResults(prev => ({
        ...prev,
        image: { ...prev.image, loading: false, error: 'Failed to generate image' },
      }));
    }
  };

  const addToHistory = (type: GenerationType, prompt: string, result: string) => {
    const newResult: GenerationResult = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      prompt,
      result,
      timestamp: new Date()
    };
    setGenerationHistory(prev => [newResult, ...prev]);
  };

  const selectedTypeInfo = generationTypes.find(t => t.type === activeTab)!;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              
              
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <History className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {generationTypes.map(({ type, icon: Icon, label, color }) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type as GenerationType)}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
                    activeTab === type
                      ? `bg-${color}-100 text-${color}-600 ring-2 ring-${color}-500`
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedTypeInfo.label}
                </h2>
                <p className="text-gray-600 mb-4">
                  {selectedTypeInfo.description}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Example prompts:</p>
                  <ul className="space-y-1">
                    {selectedTypeInfo.examples.map((example, index) => (
                      <li 
                        key={index}
                        className="text-sm text-gray-600 cursor-pointer hover:text-indigo-600 flex items-center"
                      >
                        <span className="mr-2">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {activeTab === 'text' && (
                <TextModel
                  onSubmit={handleTextSubmit}
                  result={results.text.result}
                  loading={results.text.loading}
                  error={results.text.error}
                />
              )}
              {activeTab === 'code' && (
                <CodeModel
                  onSubmit={handleCodeSubmit}
                  result={results.code.result}
                  loading={results.code.loading}
                  error={results.code.error}
                />
              )}
              {activeTab === 'audio' && (
                <AudioModel
                  onSubmit={handleAudioSubmit}
                  result={results.audio.result}
                  loading={results.audio.loading}
                  error={results.audio.error}
                />
              )}
              {activeTab === 'video' && (
                <VideoModel
                  onSubmit={handleVideoSubmit}
                  result={results.video.result}
                  loading={results.video.loading}
                  error={results.video.error}
                />
              )}
              {activeTab === 'image' && (
                <ImageModel
                  onSubmit={handleImageSubmit}
                  result={results.image.result}
                  loading={results.image.loading}
                  error={results.image.error}
                />
              )}
            </div>
          </div>

          {showHistory && (
            <div className="w-96 bg-white rounded-xl shadow-sm p-6 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Generation History</h2>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              <div className="space-y-4">
                {generationHistory.map(item => (
                  <div key={item.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                      <button className="text-xs text-indigo-600 hover:text-indigo-700">
                        View Result
                      </button>
                    </div>
                  </div>
                ))}
                {generationHistory.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No generation history yet
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}