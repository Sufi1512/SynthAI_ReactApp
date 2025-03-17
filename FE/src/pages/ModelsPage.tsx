import React from 'react';
import { MessageSquare, Image, Music, Video, Code, Zap, Cpu, Star, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Model {
  id: string;
  name: string;
  type: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  performance: {
    speed: number;
    quality: number;
    efficiency: number;
  };
  isPro: boolean;
}

function ModelsPage() {
  const navigate = useNavigate();

  const models: Model[] = [
    {
      id: 'text-standard',
      name: 'TextGenius Pro',
      type: 'text',
      icon: MessageSquare,
      description: 'Advanced language model for high-quality text generation',
      features: [
        'Article writing',
        'Story generation',
        'Marketing copy',
        'Technical documentation'
      ],
      performance: {
        speed: 90,
        quality: 95,
        efficiency: 85
      },
      isPro: true
    },
    {
      id: 'image-pro',
      name: 'ImageCraft Elite',
      type: 'image',
      icon: Image,
      description: 'State-of-the-art image generation and manipulation',
      features: [
        'Photorealistic images',
        'Artistic styles',
        'Image variations',
        'Style transfer'
      ],
      performance: {
        speed: 85,
        quality: 90,
        efficiency: 80
      },
      isPro: true
    },
    {
      id: 'audio-synth',
      name: 'AudioForge',
      type: 'audio',
      icon: Music,
      description: 'Comprehensive audio generation and processing',
      features: [
        'Music composition',
        'Sound effects',
        'Voice synthesis',
        'Audio enhancement'
      ],
      performance: {
        speed: 95,
        quality: 85,
        efficiency: 90
      },
      isPro: false
    },
    {
      id: 'video-master',
      name: 'VideoVision Pro',
      type: 'video',
      icon: Video,
      description: 'Advanced video generation and editing capabilities',
      features: [
        'Animation creation',
        'Video synthesis',
        'Scene generation',
        'Style transfer'
      ],
      performance: {
        speed: 80,
        quality: 90,
        efficiency: 85
      },
      isPro: true
    },
    {
      id: 'code-genius',
      name: 'CodeCraft',
      type: 'code',
      icon: Code,
      description: 'Intelligent code generation and optimization',
      features: [
        'Multiple languages',
        'Code completion',
        'Refactoring',
        'Documentation'
      ],
      performance: {
        speed: 95,
        quality: 90,
        efficiency: 95
      },
      isPro: false
    },
    {
      id: 'resume-analyzer',
      name: 'ATS Resume Analyzer',
      type: 'text',
      icon: FileText,
      description: 'Optimizes your resume for Applicant Tracking Systems (ATS) with detailed analysis and suggestions.',
      features: [
        'Keyword match analysis',
        'Format score evaluation',
        'Missing keyword suggestions',
        'Strengths and weaknesses identification',
        'Actionable improvement suggestions'
      ],
      performance: {
        speed: 85,
        quality: 90,
        efficiency: 80
      },
      isPro: true
    }
  ];

  const handleUpgradeClick = () => {
    navigate('/payment');
  };

  const handleTryNowClick = () => {
    navigate('/dashboard'); // Redirect to dashboard for free models
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Synth AI Models
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our cutting-edge AI models designed to empower your creative and professional projects. From text to video, discover tools that deliver exceptional speed, quality, and efficiency.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          initial="hidden"
          animate="visible"
        >
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <motion.div
                key={model.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Icon className="h-10 w-10 text-indigo-600" />
                      <h2 className="text-2xl font-semibold text-gray-900 ml-4">{model.name}</h2>
                    </div>
                    {model.isPro && (
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold">
                        Pro
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{model.description}</p>

                  <div className="space-y-6 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Speed</span>
                        <span className="text-gray-900 font-semibold">{model.performance.speed}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <motion.div
                          className="h-full bg-indigo-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${model.performance.speed}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Quality</span>
                        <span className="text-gray-900 font-semibold">{model.performance.quality}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <motion.div
                          className="h-full bg-indigo-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${model.performance.quality}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Efficiency</span>
                        <span className="text-gray-900 font-semibold">{model.performance.efficiency}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <motion.div
                          className="h-full bg-indigo-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${model.performance.efficiency}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900">Features:</h3>
                    <ul className="space-y-2">
                      {model.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600 text-sm">
                          <Star className="h-4 w-4 text-indigo-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 border-t">
                  <motion.button
                    onClick={model.isPro ? handleUpgradeClick : handleTryNowClick}
                    className={`w-full py-3 rounded-full flex items-center justify-center shadow-lg ${
                      model.isPro
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:bg-gradient-to-l'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {model.isPro ? (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Upgrade to Access
                      </>
                    ) : (
                      <>
                        <Cpu className="h-5 w-5 mr-2" />
                        Try Now
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}

export default ModelsPage;