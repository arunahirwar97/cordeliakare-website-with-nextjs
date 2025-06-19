// components/LoadingSpinner.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
}

const LoadingSpinner = ({
  message = "Finding the perfect specialists for you",
  subMessage = "CordeliaKare is analyzing your preferences to match you with top doctors",
}: LoadingSpinnerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-6"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="w-40 h-40 mx-auto mb-8"
      >
        <Image
          src="/cordeliakare_logo.png"
          alt="CordeliaKare Logo"
          width={160}
          height={160}
          className="object-contain"
        />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-blue-600 dark:text-blue-400 text-center mb-2"
      >
        {message}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-600 dark:text-gray-300 text-center max-w-md"
      >
        {subMessage}
      </motion.p>
    </motion.div>
  );
};

export default LoadingSpinner;