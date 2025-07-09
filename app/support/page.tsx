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
    const email = 'support@cordeliatech.com';
    const url = `mailto:${email}`;
    window.open(url, '_blank');
  };

  const handlePhonePress = () => {
    const phoneNumber = '';
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
                support@cordeliatech.com
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
                Not Available
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