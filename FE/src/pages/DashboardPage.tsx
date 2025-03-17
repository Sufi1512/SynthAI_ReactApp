import { useState } from 'react';
import { Code2, Image, MessageSquare, Music, Video, History, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
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
    color: 'indigo'
  },
  { 
    type: 'image', 
    icon: Image, 
    label: 'Image Creation',
    description: 'Create stunning images from textual descriptions',
    examples: ['A sunset over a cyberpunk city', 'A realistic portrait of a fantasy character', 'Abstract digital art'],
    color: 'purple'
  },
  { 
    type: 'audio', 
    icon: Music, 
    label: 'Audio Synthesis',
    description: 'Generate music, sound effects, and voice content',
    examples: ['Create a lofi background track', 'Generate nature ambience', 'Synthesize voice narration'],
    color: 'pink'
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Synth AI Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <History className="h-6 w-6 text-indigo-600" />
              </motion.button>
              <motion.button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="h-6 w-6 text-indigo-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="flex gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              {generationTypes.map(({ type, icon: Icon, label, color }) => (
                <motion.button
                  key={type}
                  onClick={() => setActiveTab(type as GenerationType)}
                  className={`p-6 rounded-2xl flex flex-col items-center justify-center transition-all shadow-lg border border-gray-100 ${
                    activeTab === type
                      ? `bg-${color}-100 text-${color}-600 ring-2 ring-${color}-500`
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-8 w-8 mb-3" />
                  <span className="text-sm font-semibold">{label}</span>
                </motion.button>
              ))}
            </div>

            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedTypeInfo.label}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{selectedTypeInfo.description}</p>
                <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Example Prompts:</p>
                  <ul className="space-y-2">
                    {selectedTypeInfo.examples.map((example, index) => (
                      <li 
                        key={index}
                        className="text-sm text-gray-600 cursor-pointer hover:text-indigo-600 flex items-center transition-colors"
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
            </motion.div>
          </div>

          {showHistory && (
            <motion.div 
              className="w-96 bg-white rounded-2xl shadow-xl p-8 h-fit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Generation History</h2>
                <motion.button 
                  onClick={() => setShowHistory(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-3xl">×</span>
                </motion.button>
              </div>
              <div className="space-y-6">
                {generationHistory.map(item => (
                  <motion.div 
                    key={item.id}
                    className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center mb-3">
                      {(() => {
                        const TypeIcon = generationTypes.find(t => t.type === item.type)?.icon;
                        return TypeIcon && <TypeIcon className="h-5 w-5 text-indigo-600 mr-3" />;
                      })()}
                      <span className="text-sm font-semibold text-gray-700">
                        {generationTypes.find(t => t.type === item.type)?.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.prompt}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                      <button className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold">
                        View Result
                      </button>
                    </div>
                  </motion.div>
                ))}
                {generationHistory.length === 0 && (
                  <div className="text-center text-gray-500 py-12">
                    No generation history yet
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}