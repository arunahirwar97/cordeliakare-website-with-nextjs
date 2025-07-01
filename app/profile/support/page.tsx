'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Mail, Phone } from 'lucide-react';

const SupportsPage = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure we only render UI on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEmailPress = () => {
    const email = 'support@cordeliatech.atlassian.net';
    const url = `mailto:${email}`;
    window.open(url, '_blank');
  };

  const handlePhonePress = () => {
    const phoneNumber = '+919632211381';
    const url = `tel:${phoneNumber}`;
    window.open(url, '_blank');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Don't render until we know the theme on client side
  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen ${resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b ${resolvedTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className={`p-2 rounded-full ${resolvedTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke={resolvedTheme === 'dark' ? 'white' : 'currentColor'}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h1 className={`ml-4 text-xl font-semibold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Support
            </h1>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-full ${resolvedTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            aria-label="Toggle dark mode"
          >
            {resolvedTheme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-lg shadow-md ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} mb-8`}
        >
          <h2 className={`text-lg font-medium mb-4 ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Contact Our Support Team
          </h2>
          
          <p className={`mb-6 ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            In case of any queries please reach out to our support team. We're here to help!
          </p>

          {/* Email Support */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center p-4 rounded-lg mb-4 cursor-pointer ${resolvedTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} border ${resolvedTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
            onClick={handleEmailPress}
          >
            <div className={`p-3 rounded-full ${resolvedTheme === 'dark' ? 'bg-gray-600' : 'bg-blue-50'} mr-4`}>
              <Mail className={`h-6 w-6 ${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h3 className={`font-medium ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Email Support</h3>
              <p className={`text-sm ${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                support@cordeliatech.atlassian.net
              </p>
            </div>
          </motion.div>

          {/* Phone Support */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center p-4 rounded-lg cursor-pointer ${resolvedTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} border ${resolvedTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
            onClick={handlePhonePress}
          >
            <div className={`p-3 rounded-full ${resolvedTheme === 'dark' ? 'bg-gray-600' : 'bg-green-50'} mr-4`}>
              <Phone className={`h-6 w-6 ${resolvedTheme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <div>
              <h3 className={`font-medium ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Phone Support</h3>
              <p className={`text-sm ${resolvedTheme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                +91 96322 11381
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          variants={itemVariants}
          className={`p-6 rounded-lg shadow-md ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
        >
          <h2 className={`text-lg font-medium mb-4 ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: "How do I reset my password?",
                answer: "You can reset your password by clicking on 'Forgot Password' on the login page."
              },
              {
                question: "What are your support hours?",
                answer: "Our support team is available 24/7 to assist you with any issues."
              },
              {
                question: "How long does it take to get a response?",
                answer: "We typically respond to all support requests within 24 hours."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 5 }}
                className={`p-4 rounded-lg ${resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-white'} border ${resolvedTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
              >
                <h3 className={`font-medium ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {faq.question}
                </h3>
                <p className={`mt-2 text-sm ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SupportsPage;