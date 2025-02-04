import React from 'react';
import { MessageSquare, Image, Music, Video, Code, Zap, Cpu, Star, FileText } from 'lucide-react';

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

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Models</h1>
        <p className="text-xl text-gray-600">
          Explore our cutting-edge AI models for various content generation needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model) => {
          const Icon = model.icon;
          return (
            <div
              key={model.id}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Icon className="h-8 w-8 text-indigo-600" />
                    <h2 className="text-xl font-semibold text-gray-900 ml-3">
                      {model.name}
                    </h2>
                  </div>
                  {model.isPro && (
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                      Pro
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4">{model.description}</p>

                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Speed</span>
                      <span className="text-gray-900 font-medium">
                        {model.performance.speed}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${model.performance.speed}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Quality</span>
                      <span className="text-gray-900 font-medium">
                        {model.performance.quality}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${model.performance.quality}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Efficiency</span>
                      <span className="text-gray-900 font-medium">
                        {model.performance.efficiency}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${model.performance.efficiency}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900">Features:</h3>
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
                <button
                  className={`w-full py-2 rounded-lg flex items-center justify-center ${
                    model.isPro
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {model.isPro ? (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Upgrade to Access
                    </>
                  ) : (
                    <>
                      <Cpu className="h-4 w-4 mr-2" />
                      Try Now
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default ModelsPage