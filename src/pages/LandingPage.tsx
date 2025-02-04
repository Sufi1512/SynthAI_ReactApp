import React, { useEffect, useState } from 'react';
import { MessageSquare, Image, Music, Video, Code, ArrowRight, CheckCircle2, Sparkles, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



// Sparkle component for decorative effect
const SparkleEffect = () => {
  return (
    <motion.div
      className="absolute -inset-2"
      animate={{
        rotate: [0, 360],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <Sparkles className="w-6 h-6 text-yellow-400" />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <Sparkles className="w-6 h-6 text-yellow-400" />
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <Sparkles className="w-6 h-6 text-yellow-400" />
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <Sparkles className="w-6 h-6 text-yellow-400" />
      </div>
    </motion.div>
  );
};

// Animated text component with character animation
interface AnimatedCharactersProps {
  text: string;
  className?: string;
}

const AnimatedCharacters = ({ text, className }: AnimatedCharactersProps) => {
  return (
    <motion.span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.2, 0.65, 0.3, 0.9]
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Gradient Text component
import { ReactNode } from 'react';

const GradientText = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 ${className}`}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
};

// Floating 3D cube animation component
// Floating 3D cube animation component
const FloatingCube = () => {
  const cubes = [
    { size: 40, top: '20%', right: '10%', delay: 0 },
    { size: 30, top: '40%', right: '20%', delay: 1 },
    { size: 25, top: '60%', right: '15%', delay: 2 },
    { size: 35, top: '10%', left: '5%', delay: 3 }, // New cube
    { size: 45, bottom: '30%', right: '30%', delay: 4 }, // New cube
    { size: 50, top: '50%', left: '40%', delay: 5 }, // New cube
    { size: 20, top: '70%', left: '60%', delay: 6 }, // New cube
    { size: 60, bottom: '10%', left: '30%', delay: 7 }, // New cube
  ];

  return (
    <>
      {cubes.map((cube, index) => (
        <motion.div
          key={index}
          className="absolute opacity-30"
          style={{
            width: cube.size,
            height: cube.size,
            top: cube.top,
            right: cube.right,
            left: cube.left,
            bottom: cube.bottom,
          }}
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 360],
            rotateX: [0, 360],
          }}
          transition={{
            duration: 8,
            delay: cube.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg transform rotate-45" />
        </motion.div>
      ))}
    </>
  );
};


function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [  
    {
      icon: MessageSquare,
      title: 'Text Generation',
      description: 'Create compelling content using advanced NLP models with support for multiple languages and styles.'
    },
    {
      icon: Image,
      title: 'Image Creation',
      description: 'Generate photorealistic images and artwork using state-of-the-art diffusion models with precise control.'
    },
    {
      icon: Music,
      title: 'Audio Synthesis',
      description: 'Create high-fidelity music and sound using neural audio synthesis with customizable parameters.'
    },
    {
      icon: Video,
      title: 'Video Generation',
      description: 'Generate smooth, high-quality videos with temporal consistency and motion control.'
    },
    {
      icon: Code,
      title: 'Code Generation',
      description: 'Generate optimized code across multiple languages with type safety and best practices.'
    },
    {
      icon: FileText,
      title: 'Resume Analysis',
      description: 'Optimize your resume for ATS by evaluating keyword matches, format, and overall compatibility with job descriptions.'
    }
    
  ];

  const benefits = [
    'Access to all AI models including GPT-4 and DALL-E 3',
    'Unlimited generations with priority queue access',
    'Priority processing with dedicated GPU resources',
    'Advanced customization of model parameters',
    'Full REST API access with comprehensive documentation',
    'Dedicated technical support with 24/7 availability'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const navigate = useNavigate();

const handleGetStarted = () => {
  navigate('/dashboard');
};


  const handleUpgrade = () => {
    console.log('Upgrade clicked');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative Elements */}
      <FloatingCube />
      <div className="absolute left-0 top-40 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute right-20 bottom-40 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-30" />

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <AnimatedCharacters text="Create Anything with" className="" />
              <span className="relative inline-block ml-2">
                <SparkleEffect />
                <GradientText className="relative">
                  <AnimatedCharacters text="AI" className="" />
                </GradientText>
              </span>
            </h1>
          </motion.div>
          
          {/* Animated Subtitle */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Transform your ideas into reality using our 
              <GradientText className="mx-2">advanced AI models</GradientText>
              Experience state-of-the-art generation across multiple modalities.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center transform hover:scale-105 transition-transform"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <a
              href="#features"
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-transform"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Advanced AI Capabilities
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Icon className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Creating Today
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that best fits your needs
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Free Plan */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">$0</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  Limited generations per day
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  Basic models access
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  Community support
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="block w-full py-3 text-center bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transform hover:scale-105 transition-transform"
              >
                Get Started
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              className="bg-indigo-600 p-8 rounded-xl shadow-lg text-white hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-6">$29</p>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-white mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleUpgrade}
                className="block w-full py-3 text-center bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-transform"
              >
                Upgrade to Pro
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;