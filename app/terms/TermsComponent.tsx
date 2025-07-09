"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

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

const listItemVariants = {
  hover: {
    x: 5,
    transition: { duration: 0.2 },
  },
};

export default function TermsAndConditions() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
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
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Last Updated: October 3rd, 2023
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={itemVariants}
          className={`rounded-xl p-8 mb-8 ${
            isDark ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          {/* Introduction */}
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
              Website Terms
            </h2>
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>
              The Website Owner provides the information contained on this
              website to visitors subject to these terms and conditions. By
              using this website, you agree to comply with and be bound by these
              terms.
            </p>
          </motion.div>

          {/* Definitions */}
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
              Definitions
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  term: "Website Owner",
                  definition:
                    "CORDELIA TECHNOLOGY PRIVATE LIMITED, GF13 Ajantha Meadows, Bengaluru, Karnataka 560068",
                },
                {
                  term: "Visitor/User",
                  definition: "Any person accessing or using this website",
                },
                {
                  term: "Content",
                  definition:
                    "All materials, information, and graphics on the website",
                },
                {
                  term: "Terms",
                  definition: "These terms and conditions of use",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className={`p-4 rounded-lg ${
                    isDark ? "bg-gray-600" : "bg-white"
                  } shadow-sm`}
                >
                  <h3
                    className={`font-medium mb-1 ${
                      isDark ? "text-purple-300" : "text-purple-600"
                    }`}
                  >
                    {item.term}
                  </h3>
                  <p
                    className={
                      isDark ? "text-gray-300" : "text-gray-700 text-sm"
                    }
                  >
                    {item.definition}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Terms of Use */}
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
              Terms of Use
            </h2>
            <ul
              className={`space-y-4 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {[
                "The content is for general information only and subject to change without notice",
                "We provide no warranty as to accuracy, timeliness, performance or completeness of information",
                "Your use of information is entirely at your own risk",
                "This website contains material owned by or licensed to us",
                "Unauthorized use may give rise to a claim for damages and/or be a criminal offense",
                "Links to other websites are provided for convenience only",
                "You may not create links to this website without our written consent",
                "Your use and any disputes are subject to the laws of India",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  whileHover="hover"
                  className="flex items-start"
                >
                  <span
                    className={`inline-block mr-2 ${
                      isDark ? "text-teal-400" : "text-teal-600"
                    }`}
                  >
                    •
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Intellectual Property */}
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
              Intellectual Property
            </h2>
            <div
              className={`p-4 rounded-lg mb-4 ${
                isDark ? "bg-gray-600" : "bg-white"
              } shadow-sm`}
            >
              <h3
                className={`font-semibold mb-2 ${
                  isDark ? "text-amber-300" : "text-amber-600"
                }`}
              >
                Copyright Notice
              </h3>
              <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                All design, layout, appearance and graphics are owned by or
                licensed to us. Reproduction is prohibited except in accordance
                with our copyright notice.
              </p>
            </div>
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
                Trademarks
              </h3>
              <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                All trademarks not property of or licensed to the operator are
                acknowledged on the website.
              </p>
            </div>
          </motion.div>

          {/* Governing Law */}
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
              Governing Law
            </h2>
            <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Your use of this website and any dispute arising out of such use
              is subject to the laws of India.
            </p>
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-600" : "bg-white"
              } shadow-sm`}
            >
              <h3
                className={`font-semibold mb-2 ${
                  isDark ? "text-green-300" : "text-green-600"
                }`}
              >
                Jurisdiction
              </h3>
              <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                Any legal matters will be subject to the jurisdiction of the
                courts in Bengaluru, Karnataka, India.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Section */}
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
              Questions About Our Terms?
            </h2>
            <p
              className={`text-lg mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Contact us for any clarifications regarding these terms and
              conditions.
            </p>
            <motion.div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  (window.location.href = "mailto:contactus@cordeliatech.com")
                }
                className={`px-6 py-3 rounded-lg font-medium mr-4 ${
                  isDark
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Email Us
              </motion.button>
              <motion.button
                onClick={() => router.push("/privacy")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium ${
                  isDark
                    ? "bg-gray-600 hover:bg-gray-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                View Privacy Policy
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
