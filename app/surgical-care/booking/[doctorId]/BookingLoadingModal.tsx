"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  Heart, 
  Shield,
  Zap,
  Users
} from "lucide-react";

interface BookingLoadingModalProps {
  isOpen: boolean;
  bookingType: "virtual" | "surgery" | null;
}

const BookingLoadingModal: React.FC<BookingLoadingModalProps> = ({
  isOpen,
  bookingType,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const messages = {
    virtual: [
      "Setting up your virtual consultation...",
      "Connecting you with our specialists...",
      "Preparing your personalized health journey...",
      "Almost ready for your consultation...",
      "Finalizing your appointment details..."
    ],
    surgery: [
      "Processing your surgery enquiry...",
      "Matching you with expert surgeons...",
      "Preparing comprehensive care plan...",
      "Coordinating with medical team...",
      "Finalizing your treatment pathway..."
    ]
  };

  const motivationalMessages = [
    "Your health is our priority ✨",
    "Expert care awaits you 🏥",
    "Taking the first step to better health 💪",
    "World-class treatment coming your way 🌟",
    "Your journey to wellness begins now 🚀"
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentMessageIndex(0);
      setShowCheckmark(false);
      return;
    }

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        const maxIndex = bookingType ? messages[bookingType].length - 1 : 0;
        return prev < maxIndex ? prev + 1 : 0;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen, bookingType]);

  const currentMessages = bookingType ? messages[bookingType] : [];
  const currentMotivationalMessage = motivationalMessages[currentMessageIndex % motivationalMessages.length];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 text-center relative overflow-hidden"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 opacity-50"></div>
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              {/* Main Icon Animation */}
              <div className="mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto shadow-lg"
                >
                  {bookingType === "virtual" ? (
                    <Calendar className="w-10 h-10 text-white" />
                  ) : (
                    <Heart className="w-10 h-10 text-white" />
                  )}
                </motion.div>
              </div>

              {/* Loading Spinner */}
              <div className="mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"
                />
              </div>

              {/* Main Message */}
              <motion.h2
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold text-gray-900 dark:text-white mb-4"
              >
                {currentMessages[currentMessageIndex]}
              </motion.h2>

              {/* Motivational Message */}
              <motion.p
                key={`motivational-${currentMessageIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm text-gray-600 dark:text-gray-300 mb-6"
              >
                {currentMotivationalMessage}
              </motion.p>

              {/* Progress Indicators */}
              <div className="flex justify-center space-x-2 mb-6">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-3 h-3 bg-blue-500 rounded-full"
                  />
                ))}
              </div>

              {/* Feature Icons */}
              <div className="flex justify-center space-x-6 mb-4">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="flex flex-col items-center"
                >
                  <Shield className="w-6 h-6 text-green-500 mb-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Secure</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <Zap className="w-6 h-6 text-yellow-500 mb-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Fast</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <Users className="w-6 h-6 text-blue-500 mb-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Expert</span>
                </motion.div>
              </div>

              {/* Estimated Time */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
              >
                <Clock className="w-4 h-4" />
                <span>This may take 10-20 seconds</span>
              </motion.div>

              {/* Sparkle Effect */}
              <div className="absolute top-4 right-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingLoadingModal;