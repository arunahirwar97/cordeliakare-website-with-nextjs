// app/surgical-care/PretextInfo.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PretextInfo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4 text-justify`}>
              Medical Value Tourism (MVT) is revolutionizing healthcare by
              offering patients across the globe access to high-quality medical
              services at affordable prices, often combined with travel to
              destinations known for hospitality and healing.
            </p>
            <p className={`${isDark ? "text-gray-300" : "text-gray-700"} text-justify`}>
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
                isDark ? "text-teal-300" : "text-teal-800"
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
              Who We Are
            </h2>
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>
              At the heart of CordeLiakare we provide our patients a seamless
              experience for their surgical requirements and a quick recovery
              thereafter. All treatments are performed in internationally
              accredited hospitals by certified specialists.
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
            {[
              "Pre-Travel Medical Consultation",
              "Visa Assistance and Travel Coordination",
              "Hospital and Doctor Appointments",
              "Translation and Interpretation Services",
              "Local Transportation and Accommodation",
              "Post-Treatment Follow-ups (In-person & Telehealth)",
            ].map((service, index) => (
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {service}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Treatments and Destinations */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Specialized Treatments */}
          <div>
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Specialized Treatments We Offer
            </h2>
            <div
              className={`rounded-lg shadow-sm overflow-hidden ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              {[
                "Cardiology & Cardiothoracic Surgery",
                "Orthopedics & Joint Replacement",
                "Oncology (Cancer Treatment)",
                "Cosmetic & Plastic Surgery",
                "IVF and Fertility Treatments",
                "Neurology & Neurosurgery",
                "Dental Procedures",
              ].map((treatment, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className={`p-4 ${
                    index % 2 === 0
                      ? isDark
                        ? "bg-gray-700"
                        : "bg-gray-50"
                      : isDark
                      ? "bg-gray-800"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <span
                      className={`p-1 rounded-full mr-3 ${
                        isDark
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span
                      className={isDark ? "text-gray-200" : "text-gray-700"}
                    >
                      {treatment}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Top Medical Tourism Destinations
            </h2>
            <div className="grid gap-4">
              {[
                {
                  country: "India",
                  specialty:
                    "Excellence in cardiac, orthopedic, and fertility care",
                  color: isDark
                    ? "bg-amber-900 text-amber-200"
                    : "bg-amber-100 text-amber-800",
                },
                {
                  country: "Thailand",
                  specialty: "World leader in cosmetic surgery and wellness",
                  color: isDark
                    ? "bg-blue-900 text-blue-200"
                    : "bg-blue-100 text-blue-800",
                },
                {
                  country: "Turkey",
                  specialty: "Advanced transplant and dental treatments",
                  color: isDark
                    ? "bg-red-900 text-red-200"
                    : "bg-red-100 text-red-800",
                },
                {
                  country: "UAE",
                  specialty: "Fast-growing hub for oncology and diagnostics",
                  color: isDark
                    ? "bg-emerald-900 text-emerald-200"
                    : "bg-emerald-100 text-emerald-800",
                },
              ].map((destination, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-lg overflow-hidden ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className={`p-3 font-semibold ${destination.color}`}>
                    {destination.country}
                  </div>
                  <div className={`p-4 ${isDark ? "bg-gray-800" : "bg-white"}`}>
                    <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                      {destination.specialty}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                title: "Zero Waiting Time",
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
          <button
            className={`py-3 px-8 rounded-lg text-lg font-semibold shadow-lg transition-all ${
              isDark
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Link
              href={{
                pathname: "/surgical-care/search",
                query: { location: "Abroad" },
              }}
            >
              Start Your Medical Journey Now
            </Link>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
