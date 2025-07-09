"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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

export default function PrivacyPolicy() {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 z-0" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-6xl mx-auto px-4 py-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Last Updated: October 3rd, 2023
          </p>
        </motion.div>

        {/* Policy Content */}
        <motion.div
          variants={itemVariants}
          className={`rounded-xl p-8 mb-8 ${
            isDark ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-lg mb-8 ${
              isDark ? "bg-gray-700" : "bg-blue-50"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDark ? "text-blue-300" : "text-blue-800"
              }`}
            >
              Introduction
            </h2>
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>
              This privacy policy sets out how CORDELIA TECHNOLOGY PRIVATE
              LIMITED uses and protects any information that you give when you
              use this website. We are committed to ensuring that your privacy
              is protected.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-lg mb-8 ${
              isDark ? "bg-gray-700" : "bg-purple-50"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDark ? "text-purple-300" : "text-purple-800"
              }`}
            >
              Information We Collect
            </h2>
            <ul
              className={`space-y-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <motion.li whileHover={{ x: 5 }} className="flex items-start">
                <span
                  className={`inline-block mr-2 ${
                    isDark ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  •
                </span>
                Name and job title
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start">
                <span
                  className={`inline-block mr-2 ${
                    isDark ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  •
                </span>
                Contact information including email address
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start">
                <span
                  className={`inline-block mr-2 ${
                    isDark ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  •
                </span>
                Demographic information such as postcode, preferences and
                interests
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start">
                <span
                  className={`inline-block mr-2 ${
                    isDark ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  •
                </span>
                Other information relevant to customer surveys and/or offers
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-lg mb-8 ${
              isDark ? "bg-gray-700" : "bg-teal-50"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDark ? "text-teal-300" : "text-teal-800"
              }`}
            >
              How We Use Your Information
            </h2>
            <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              We require this information to understand your needs and provide
              you with a better service, and in particular for the following
              reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Internal record keeping",
                "Improving our products and services",
                "Sending promotional emails",
                "Market research purposes",
                "Customizing the website according to your interests",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className={`p-4 rounded-lg ${
                    isDark ? "bg-gray-600" : "bg-white"
                  } shadow-sm`}
                >
                  <div className="flex items-center">
                    <span
                      className={`p-2 rounded-full mr-3 ${
                        isDark
                          ? "bg-teal-900 text-teal-300"
                          : "bg-teal-100 text-teal-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={isDark ? "text-gray-200" : "text-gray-700"}
                    >
                      {item}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-lg mb-8 ${
              isDark ? "bg-gray-700" : "bg-amber-50"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDark ? "text-amber-300" : "text-amber-800"
              }`}
            >
              Security & Cookies
            </h2>
            <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              We are committed to ensuring that your information is secure. We
              use traffic log cookies to identify which pages are being used.
              This helps us analyze data about web page traffic and improve our
              website.
            </p>
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-600" : "bg-white"
              } shadow-sm`}
            >
              <h3
                className={`font-semibold mb-2 ${
                  isDark ? "text-amber-300" : "text-amber-600"
                }`}
              >
                Cookie Control
              </h3>
              <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                You can choose to accept or decline cookies. Most web browsers
                automatically accept cookies, but you can usually modify your
                browser setting to decline cookies if you prefer.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-green-50"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDark ? "text-green-300" : "text-green-800"
              }`}
            >
              Controlling Your Personal Information
            </h2>
            <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              You may choose to restrict the collection or use of your personal
              information:
            </p>
            <ul
              className={`space-y-3 mb-6 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <motion.li whileHover={{ x: 5 }} className="flex items-start">
                <span
                  className={`inline-block mr-2 ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  •
                </span>
                Look for opt-out boxes in forms to prevent direct marketing use
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start">
                <span
                  className={`inline-block mr-2 ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  •
                </span>
                Change previous marketing consent by emailing us
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start">
                <span
                  className={`inline-block mr-2 ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  •
                </span>
                Request details of personal information we hold about you
              </motion.li>
            </ul>
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>
              If you believe any information we hold is incorrect, please email
              us at{" "}
              <span className="font-semibold">contactus@cordeliatech.com</span>.
            </p>
          </motion.div>
        </motion.div>

        {/* Policy Updates */}
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-xl mb-12 ${
            isDark
              ? "bg-gray-800"
              : "bg-gradient-to-r from-blue-50 to-purple-50"
          }`}
        >
          <div className="text-center">
            <h2
              className={`text-2xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Policy Updates
            </h2>
            <p
              className={`text-lg mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We may change this policy by updating this page. Please check
              periodically for updates.
            </p>
            <motion.button
              onClick={() =>
                (window.location.href =
                  "https://www.cordeliatech.com/contact-us/")
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium ${
                isDark
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              Contact Us for Questions
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
