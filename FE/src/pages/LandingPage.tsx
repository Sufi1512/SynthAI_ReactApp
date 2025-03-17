import React, { useEffect, useState } from 'react';
import { MessageSquare, Image, Music, Video, Code, ArrowRight, CheckCircle2, Sparkles, FileText, Quote, ChevronDown, Rocket, Users, Zap } from 'lucide-react';
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
const FloatingCube = () => {
  const cubes = [
    { size: 40, top: '20%', right: '10%', delay: 0 },
    { size: 30, top: '40%', right: '20%', delay: 1 },
    { size: 25, top: '60%', right: '15%', delay: 2 },
    { size: 35, top: '10%', left: '5%', delay: 3 },
    { size: 45, bottom: '30%', right: '30%', delay: 4 },
    { size: 50, top: '50%', left: '40%', delay: 5 },
    { size: 20, top: '70%', left: '60%', delay: 6 },
    { size: 60, bottom: '10%', left: '30%', delay: 7 },
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
      description: 'Create compelling content using advanced NLP models with support for multiple languages and styles.',
      details: 'Whether you need engaging blog posts, marketing copy, or creative stories, our text generation feature uses state-of-the-art natural language processing models to produce high-quality, human-like text. Customize tone, style, and language to suit your needs, and generate content in seconds.'
    },
    {
      icon: Image,
      title: 'Image Creation',
      description: 'Generate photorealistic images and artwork using state-of-the-art diffusion models with precise control.',
      details: 'Transform your ideas into stunning visuals with our image creation tool. Powered by advanced diffusion models, you can generate photorealistic images, abstract art, or custom designs. Fine-tune details like color, composition, and style to create exactly what you envision.'
    },
    {
      icon: Music,
      title: 'Audio Synthesis',
      description: 'Create high-fidelity music and sound using neural audio synthesis with customizable parameters.',
      details: 'Compose original music tracks, sound effects, or ambient audio with our audio synthesis feature. Using neural networks, you can customize genres, instruments, tempo, and mood to create professional-grade audio. Perfect for musicians, podcasters, and video creators.'
    },
    {
      icon: Video,
      title: 'Video Generation',
      description: 'Generate smooth, high-quality videos with temporal consistency and motion control.',
      details: 'Bring your stories to life with our video generation tool. Create smooth, high-quality videos with consistent motion and detailed control over elements like camera angles, transitions, and effects. Ideal for animations, promotional videos, and creative projects.'
    },
    {
      icon: Code,
      title: 'Code Generation',
      description: 'Generate optimized code across multiple languages with type safety and best practices.',
      details: 'Accelerate your development process with our code generation feature. Generate clean, optimized code in languages like Python, JavaScript, Java, and more. Our AI ensures type safety, follows best practices, and can even help with debugging and refactoring.'
    },
    {
      icon: FileText,
      title: 'Resume Analysis',
      description: 'Optimize your resume for ATS by evaluating keyword matches, format, and overall compatibility with job descriptions.',
      details: 'Land your dream job with our resume analysis tool. Our AI evaluates your resume against job descriptions, optimizing for Applicant Tracking Systems (ATS) by ensuring keyword matches, proper formatting, and readability. Get actionable insights to improve your chances of getting noticed.'
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

  const stats = [
    { icon: Rocket, value: '10,000+', label: 'Generations Daily', description: 'Our platform handles thousands of creative generations every day, ensuring fast and reliable performance for all users.' },
    { icon: Users, value: '5,000+', label: 'Active Users', description: 'Join a thriving community of creators, developers, and professionals who trust Synth AI Suite for their creative needs.' },
    { icon: Zap, value: '99.9%', label: 'Uptime', description: 'Experience uninterrupted access to our platform with industry-leading reliability and uptime guarantees.' },
  ];

  const testimonials = [
    {
      quote: 'Synth AI Suite transformed the way I create content. The text generation is unparalleled!',
      author: 'Jane Doe, Content Creator',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      quote: 'The image creation feature is a game-changer for my design projects. Highly recommend!',
      author: 'John Smith, Graphic Designer',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      quote: 'I was able to generate professional-grade music tracks in minutes. Incredible tool!',
      author: 'Emily Johnson, Musician',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    }
  ];

  const faqs = [
    {
      question: 'What is Synth AI Suite?',
      answer: 'Synth AI Suite is a multimodal AI SaaS platform that offers tools for text generation, image creation, audio synthesis, video generation, code generation, and resume analysis. It is designed to help creators, developers, and professionals bring their ideas to life using advanced AI technology.'
    },
    {
      question: 'What is the difference between Free and Pro plans?',
      answer: 'The Free plan offers limited generations per day and access to basic AI models, making it ideal for exploring the platform. The Pro plan, on the other hand, provides unlimited generations, access to advanced models like GPT-4 and DALL-E 3, priority processing with dedicated GPU resources, advanced customization, full REST API access, and 24/7 dedicated support. The Pro plan is perfect for professionals and businesses needing high-volume, high-quality outputs.'
    },
    {
      question: 'Can I cancel my Pro subscription?',
      answer: 'Yes, you can cancel your Pro subscription at any time from your account settings. There are no long-term commitments, and you can downgrade to the Free plan or upgrade again whenever you need.'
    },
    {
      question: 'Is my data secure with Synth AI Suite?',
      answer: 'Absolutely. We use industry-standard encryption and security practices to ensure your data is safe and secure. Your inputs, outputs, and personal information are protected, and we adhere to strict privacy policies to maintain your trust.'
    },
    {
      question: 'How can I integrate Synth AI Suite into my workflow?',
      answer: 'Synth AI Suite offers a full REST API with comprehensive documentation, allowing you to seamlessly integrate our AI capabilities into your existing applications, websites, or workflows. Whether you’re automating content creation, enhancing design processes, or building AI-powered features, our API makes it easy to get started.'
    }
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
    navigate('/payment'); // Navigate to payment page
  };

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Elements */}
      <FloatingCube />
      <div className="absolute left-0 top-40 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute right-20 bottom-40 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-30" />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              <AnimatedCharacters text="Create Anything with" className="" />
              <span className="relative inline-block ml-3">
                <SparkleEffect />
                <GradientText className="relative">
                  <AnimatedCharacters text="AI" className="text-6xl md:text-8xl" />
                </GradientText>
              </span>
            </h1>
            <motion.div
              className="absolute inset-0 -z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            >
              <div className="w-full h-full bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full filter blur-3xl opacity-20" />
            </motion.div>
          </motion.div>
          
          {/* Animated Subtitle */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Transform your ideas into reality with 
              <GradientText className="mx-2 font-semibold">cutting-edge AI technology</GradientText>
              Experience the future of creativity across text, images, audio, video, and more.
            </motion.p>
          </motion.div>

          {/* Hero Description */}
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <p className="text-lg text-gray-500 leading-relaxed">
              Synth AI Suite is your all-in-one platform for AI-powered creativity. Whether you're a content creator, designer, musician, developer, or job seeker, our suite of tools empowers you to generate high-quality outputs with ease. From writing compelling articles to designing stunning visuals, composing music, creating videos, coding efficiently, and optimizing your resume, Synth AI Suite has you covered. Start with our Free plan to explore the possibilities, or upgrade to Pro for unlimited access to advanced models and priority processing.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={handleGetStarted}
              className="px-10 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 flex items-center transform hover:scale-105 transition-transform shadow-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <a
              href="#features"
              className="px-10 py-4 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transform hover:scale-105 transition-transform shadow-lg"
            >
              Learn More
            </a>
          </motion.div>
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <ChevronDown className="w-12 h-12 text-indigo-600 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <GradientText>Why Choose Synth AI Suite?</GradientText>
          </motion.h2>
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-gray-500 text-center leading-relaxed">
              Synth AI Suite is trusted by thousands of creators and professionals worldwide for its reliability, performance, and ease of use. Our platform is designed to handle high volumes of creative tasks while maintaining top-tier quality and speed. Here’s a glimpse of what makes us stand out.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map(({ icon: Icon, value, label, description }, index) => (
              <motion.div
                key={index}
                className="p-6"
                variants={itemVariants}
              >
                <Icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
                <p className="text-gray-600 font-semibold mb-2">{label}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <GradientText>Advanced AI Capabilities</GradientText>
          </motion.h2>
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-gray-500 text-center leading-relaxed">
              Synth AI Suite offers a comprehensive set of tools powered by the latest advancements in artificial intelligence. Each feature is designed to provide unparalleled quality, customization, and ease of use, making it the ultimate platform for creators, developers, and professionals. Explore our capabilities below and see how Synth AI Suite can transform your workflow.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map(({ icon: Icon, title, description, details }, index) => (
              <motion.div
                key={title}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Icon className="h-14 w-14 text-indigo-600 mb-6 mx-auto" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">{title}</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-4">{description}</p>
                <p className="text-gray-500 text-sm text-center leading-relaxed">{details}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <GradientText>What Our Users Say</GradientText>
          </motion.h2>
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-gray-500 text-center leading-relaxed">
              Don’t just take our word for it—hear from our community of creators, designers, musicians, developers, and professionals who have transformed their workflows with Synth AI Suite. Their success stories highlight the power and versatility of our platform across various creative and professional domains.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map(({ quote, author, image }, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Quote className="h-10 w-10 text-indigo-600 mb-6 mx-auto" />
                <p className="text-gray-600 mb-6 text-center leading-relaxed">{quote}</p>
                <div className="flex items-center justify-center">
                  <img src={image} alt={author} className="w-12 h-12 rounded-full mr-4 object-cover" />
                  <p className="text-indigo-600 font-semibold">{author}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              <GradientText>Start Creating Today</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that best fits your needs and unlock the full potential of AI-powered creativity.
            </p>
          </motion.div>
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-gray-500 text-center leading-relaxed">
              Synth AI Suite offers two flexible plans to suit different needs. The Free plan is perfect for individuals and hobbyists who want to explore the platform’s capabilities with limited access. The Pro plan is designed for professionals, businesses, and power users who need unlimited access to advanced AI models, priority processing, and dedicated support. Compare the plans below and choose the one that’s right for you.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Free Plan */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Free</h3>
              <p className="text-5xl font-extrabold text-gray-900 mb-6">$0</p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Get started with Synth AI Suite at no cost. The Free plan is ideal for individuals who want to explore our core features and experiment with AI-powered creativity. Perfect for hobbyists, students, and anyone new to AI tools.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                  Limited generations per day
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                  Basic models access
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                  Community support
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="block w-full py-4 text-center bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200 transform hover:scale-105 transition-transform shadow-lg"
              >
                Get Started
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              className="bg-indigo-600 p-8 rounded-2xl shadow-lg text-white hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3 className="text-3xl font-bold mb-6">Pro</h3>
              <p className="text-5xl font-extrabold mb-6">$29</p>
              <p className="text-gray-200 mb-8 leading-relaxed">
                Unlock the full power of Synth AI Suite with the Pro plan. Designed for professionals, businesses, and power users, this plan offers unlimited access to advanced AI models, priority processing, and dedicated support. Perfect for high-volume creative projects and professional workflows.
              </p>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center">
                    <CheckCircle2 className="h-6 w-6 text-white mr-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleUpgrade}
                className="block w-full py-4 text-center bg-white text-indigo-600 rounded-full hover:bg-gray-100 transform hover:scale-105 transition-transform shadow-lg"
              >
                Upgrade to Pro
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <GradientText>Frequently Asked Questions</GradientText>
          </motion.h2>
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-gray-500 text-center leading-relaxed">
              Have questions about Synth AI Suite? We’ve compiled answers to some of the most common queries to help you understand our platform, plans, and how you can make the most of our tools. If you don’t find what you’re looking for, our support team is always here to help.
            </p>
          </motion.div>
          <motion.div
            className="space-y-6 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map(({ question, answer }, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{question}</h3>
                <p className="text-gray-600 leading-relaxed">{answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            className="text-5xl font-extrabold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to <GradientText className="text-white">Unleash Infinite Creativity</GradientText>?
          </motion.h2>
          <motion.p
            className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Upgrade to Pro and experience the ultimate AI-powered creative suite. Your ideas, amplified.
          </motion.p>
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg leading-relaxed">
              With Synth AI Suite Pro, you get unlimited access to the most advanced AI models, priority processing for faster results, and dedicated support to ensure your creative projects succeed. Whether you’re producing content at scale, designing professional visuals, composing music, creating videos, coding efficiently, or optimizing your career prospects, the Pro plan is your key to unlocking limitless possibilities. Join thousands of professionals who trust Synth AI Suite to bring their ideas to life.
            </p>
          </motion.div>
          <motion.button
            onClick={handleUpgrade}
            className="px-10 py-4 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transform hover:scale-105 transition-transform shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Upgrade Now <ArrowRight className="ml-9 h-5 w-5" />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-6">Synth AI Suite</h3>
          <p className="text-gray-400 mb-6">Empowering creativity with artificial intelligence.</p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
          </div>
          <p className="text-gray-500">© 2025 Synth AI Suite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;