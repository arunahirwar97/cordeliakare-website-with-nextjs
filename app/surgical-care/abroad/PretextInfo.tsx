// app/surgical-care/PretextInfo.tsx
"use client";

import { comprehensiveServices, treatments } from "@/constants/constants";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PretextInfo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigation = async () => {
    setIsLoading(true);

    try {
      await router.push("/surgical-care/search?location=Abroad");

      // Scroll to top after navigation
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Surgical Care for International Patients
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            World-class medical treatments combined with exceptional hospitality
            and significant cost savings
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Why Choose Medical Tourism */}
          <div
            className={`p-6 rounded-lg ${
              isDark ? "bg-gray-800" : "bg-blue-50"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 flex items-center ${
                isDark ? "text-blue-300" : "text-blue-800"
              }`}
            >
              <span
                className={`p-2 rounded-full mr-3 ${
                  isDark ? "bg-blue-900" : "bg-blue-100"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </span>
              Why Choose Medical Tourism?
            </h2>
            <p
              className={`${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-4 text-justify`}
            >
              Medical Value Tourism (MVT) is revolutionizing healthcare by
              offering patients across the globe access to high-quality medical
              services at affordable prices, often combined with travel to
              destinations known for hospitality and healing.
            </p>
            <p
              className={`${
                isDark ? "text-gray-300" : "text-gray-700"
              } text-justify`}
            >
              At our core, we aim to bridge the gap between top-tier medical
              expertise and international patients looking for cost-effective,
              timely, and specialized treatments.
            </p>
          </div>

          {/* Who We Are */}
          <div
            className={`p-6 rounded-lg ${
              isDark ? "bg-gray-800" : "bg-teal-50"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 flex items-center ${
                isDark ? "text-teal-300" : "text-teal-900"
              }`}
            >
              <span
                className={`p-2 rounded-full mr-3 ${
                  isDark ? "bg-teal-900" : "bg-teal-100"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </span>
              Who We Are?
            </h2>
            <p
              className={`${
                isDark ? "text-gray-300" : "text-gray-700"
              } text-justify`}
            >
              At the core of CordeLiakare, we deliver a seamless experience that
              addresses all your medical treatment needs and supports a swift
              recovery. We serve international patients from the SAARC region,
              Africa (including Nigeria, Ethiopia, Tanzania, Kenya, Uganda, and
              Ghana), Southeast Asia, the Middle East/GCC, and developed
              countries, ensuring that every treatment is conducted in
              internationally accredited hospitals by certified specialists. We
              also cultivate strong partnerships with healthcare facilitators in
              our source countries and leverage digital platforms to enhance our
              outreach and patient support.
            </p>
          </div>
        </motion.div>

        {/* Our Services */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2
            className={`text-3xl font-bold mb-6 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Our Comprehensive Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comprehensiveServices.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`border rounded-lg p-4 shadow-sm transition-shadow ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-purple-500/20"
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="flex items-start">
                  <span
                    className={`p-2 rounded-lg mr-3 ${
                      isDark
                        ? "bg-purple-900 text-purple-300"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {service.icon}
                  </span>
                  <div>
                    <span
                      className={`font-medium ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {service.title}
                    </span>
                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Specialized Treatments - Full Width */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2
            className={`text-3xl font-bold mb-6 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Specialized Treatments We Offer
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {treatments.map((treatment, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className={`p-4 rounded-lg shadow-sm transition-all ${
                  isDark
                    ? "bg-gray-800 hover:shadow-lg hover:shadow-green-500/20"
                    : "bg-white hover:shadow-md border border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <span
                    className={`p-2 rounded-full mr-3 ${
                      isDark
                        ? "bg-green-900 text-green-300"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {treatment.icon}
                  </span>
                  <div>
                    <span
                      className={`font-medium ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {treatment.title}
                    </span>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {treatment.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your Care Path - Vertical Flow */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2
            className={`text-3xl font-bold mb-8 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Your Care Path
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                title: "Virtual OPD Centers",
                description: "Consult with specialists from your location",
                icon: (
                  <svg
                    className="w-6 h-6"
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
                ),
              },
              {
                title: "Patient Consultation and Diagnostics",
                description: "Comprehensive health assessment and tests",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                ),
              },
              {
                title: "Upload Medical Records",
                description: "Secure digital transfer of your medical history",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                ),
              },
              {
                title: "Hospital Recommendations in India",
                description:
                  "Personalized hospital suggestions based on your needs",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
              },
              {
                title: "Travel and Accommodation Arrangements",
                description:
                  "Comprehensive travel planning and stay coordination",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                ),
              },
              {
                title: "Hospital Liaison and Booking",
                description:
                  "Direct coordination with hospitals for your treatment",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Post-treatment Follow-up",
                description:
                  "Continued care and monitoring after your procedure",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`rounded-lg shadow-sm transition-all ${
                  isDark
                    ? "bg-gray-800 hover:shadow-lg hover:shadow-purple-500/20"
                    : "bg-white hover:shadow-md border border-gray-200"
                }`}
              >
                <div className="flex items-center p-6">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full mr-6 text-lg font-bold flex-shrink-0 ${
                      isDark
                        ? "bg-purple-900 text-purple-300"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={`p-3 rounded-lg mr-6 flex-shrink-0 ${
                      isDark
                        ? "bg-purple-800 text-purple-300"
                        : "bg-purple-50 text-purple-600"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1 text-center">
                    <h3
                      className={`font-semibold text-lg mb-2 ${
                        isDark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Trust Us */}
        <motion.div
          variants={itemVariants}
          className={`rounded-xl p-8 mb-12 ${
            isDark ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-6 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Why Patients Trust Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Affordable Pricing",
                desc: "Up to 70% cost savings compared to treatments in the U.S., UK, or Europe",
                icon: "💰",
              },
              {
                title: "Minimal Waiting Time",
                desc: "Immediate access to diagnostics, consultations, and surgeries",
                icon: "⏱️",
              },
              {
                title: "Global-Standard Facilities",
                desc: "JCI, NABH, ISO certified hospitals with advanced technologies",
                icon: "🏥",
              },
              {
                title: "Personalized Care",
                desc: "Dedicated patient coordinators ensure end-to-end support",
                icon: "👩‍⚕️",
              },
              {
                title: "Safe Recovery",
                desc: "Partnerships with rehabilitation centres and wellness resorts",
                icon: "🌿",
              },
              {
                title: "Post-Care Programs",
                desc: "Wellness programs, nutrition advice, and alternative therapies",
                icon: "💆‍♂️",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`p-5 rounded-lg shadow-sm transition-all ${
                  isDark
                    ? "bg-gray-700 hover:shadow-purple-500/20"
                    : "bg-white hover:shadow-md"
                }`}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3
                  className={`font-semibold text-lg mb-2 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          className="text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.button
            onClick={handleNavigation}
            disabled={isLoading}
            className={`py-3 px-8 rounded-lg text-lg font-semibold shadow-lg transition-all ${
              isDark
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Start Your Medical Journey Now"
            )}
          </motion.button>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={itemVariants}
          className={`rounded-xl p-8 mb-12 mt-6 ${
            isDark
              ? "bg-gray-800"
              : "bg-gradient-to-r from-blue-50 to-purple-50"
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
            <p
              className={`text-lg ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Contact our medical experts for personalized assistance
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Contact Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative overflow-hidden px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              } shadow-lg hover:shadow-xl`}
            >
              <span className="relative z-10 flex items-center">
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

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Phone */}
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center px-6 py-3 rounded-lg transition-all ${
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className={`flex items-center px-6 py-3 rounded-lg transition-all ${
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
                  <p className="text-lg font-semibold">
                    contactus@cordeliatech.com
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
