import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

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

function ContactButton() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-xl p-6 mb-12 mt-6 mx-4 ${
        isDark ? "bg-gray-800" : "bg-gradient-to-r from-blue-50 to-purple-50"
      }`}
    >
      <div className="text-center mb-6">
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Need Help? We're Here for You
        </h2>
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Contact our medical experts for personalized assistance
        </p>
      </div>

      {/* Main container - flex on large screens, column on medium/small */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full">
        {/* Contact Button - full width on medium/small, auto on large */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative overflow-hidden px-6 py-3 w-full lg:w-auto lg:px-8 lg:py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
            isDark
              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          } shadow-lg hover:shadow-xl`}
        >
          <span className="relative z-10 flex items-center justify-center lg:justify-start">
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Contact Us
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.div>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 group-hover:animate-pulse" />
        </motion.button>

        {/* Contact Info - stacked on medium/small, row on large */}
        <div className="flex flex-col md:flex-row w-full lg:w-auto gap-4">
          {/* Phone */}
          {/* <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center px-4 py-3 w-full md:w-auto rounded-lg transition-all ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200"
            } shadow-sm hover:shadow-md`}
          >
            <div
              className={`p-2 rounded-full mr-3 ${
                isDark
                  ? "bg-green-900 text-green-300"
                  : "bg-green-100 text-green-600"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Call Us</p>
              <p className="text-lg font-semibold">+91 89XXXX1111</p>
            </div>
          </motion.div> */}

          {/* Email */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center px-4 py-3 w-full md:w-auto rounded-lg transition-all ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200"
            } shadow-sm hover:shadow-md`}
          >
            <div
              className={`p-2 rounded-full mr-3 ${
                isDark
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Email Us</p>
              <p className="text-lg font-semibold break-all">
                contactus@cordeliatech.com
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactButton;