import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

function TeamPage() {
  const team: TeamMember[] = [
    {
      name: 'Sufiyan Khan',
      role: 'Frontend Developer',
      description: 'Sufiyan is a skilled frontend developer with a passion for creating intuitive user interfaces and seamless user experiences using React and modern web technologies.',
      socials: {
        github: 'https://github.com/sufiyankhan',
        linkedin: 'https://linkedin.com/in/sufiyankhan',
        twitter: 'https://twitter.com/sufiyankhan',
      },
    },
    {
      name: 'Jatin Bandekar',
      role: 'Backend Developer',
      description: 'Jatin excels in building robust backend systems, specializing in APIs and database management to ensure scalable and efficient applications.',
      socials: {
        github: 'https://github.com/jatinbandekar',
        linkedin: 'https://linkedin.com/in/jatinbandekar',
        twitter: 'https://twitter.com/jatinbandekar',
      },
    },
    {
      name: 'Somesh Jatti',
      role: 'AI/ML Engineer',
      description: 'Somesh drives innovation with expertise in artificial intelligence and machine learning, crafting intelligent solutions for complex problems.',
      socials: {
        github: 'https://github.com/someshjatti',
        linkedin: 'https://linkedin.com/in/someshjatti',
        twitter: 'https://twitter.com/someshjatti',
      },
    },
    {
      name: 'Aaditya Banosode',
      role: 'Full Stack Developer',
      description: 'Aaditya is a versatile full stack developer adept at both frontend and backend technologies, delivering end-to-end solutions with precision.',
      socials: {
        github: 'https://github.com/aadityabanosode',
        linkedin: 'https://linkedin.com/in/aadityabanosode',
        twitter: 'https://twitter.com/aadityabanosode',
      },
    },
  ];

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
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get to know the talented individuals behind Synth AI Suite, dedicated to pushing the boundaries of AI innovation.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          initial="hidden"
          animate="visible"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{member.name}</h2>
                <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.description}</p>
                <div className="flex space-x-4">
                  {member.socials.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-6 w-6 text-gray-600 hover:text-indigo-600 transition-colors" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-6 w-6 text-gray-600 hover:text-indigo-600 transition-colors" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-6 w-6 text-gray-600 hover:text-indigo-600 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

export default TeamPage;