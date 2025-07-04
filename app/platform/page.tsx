"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    },
  },
};

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const featureItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.5
    }
  })
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const hoverVariants = {
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const searchParams = useSearchParams();
  const productParam = searchParams.get("section");
  const router = useRouter();

  // Create refs for each product section
  const patientAppRef = useRef<HTMLDivElement>(null);
  const doctorAppRef = useRef<HTMLDivElement>(null);
  const hmsRef = useRef<HTMLDivElement>(null);
  const sosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Scroll to the appropriate product based on the param
    const scrollToProduct = () => {
      if (!productParam) return;

      let ref = null;
      switch (productParam) {
        case "1":
          ref = patientAppRef;
          break;
        case "2":
          ref = doctorAppRef;
          break;
        case "3":
          ref = hmsRef;
          break;
        case "4":
          ref = sosRef;
          break;
        default:
          return;
      }

      if (ref?.current) {
        // Use setTimeout to ensure the DOM is ready
        setTimeout(() => {
          ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    };
    
    scrollToProduct();
  }, [productParam, mounted, router]);

  if (!mounted) {
    return null; // or return a loading skeleton
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 z-0" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto px-4 py-8"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Healthcare Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions transforming healthcare delivery
          </p>
        </motion.div>

        {/* 1. Patient mHealth App */}
        <motion.div
          ref={patientAppRef}
          variants={itemVariants}
          className={`p-8 rounded-xl mb-12 ${
            isDark ? "bg-gray-800" : "bg-blue-50"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-blue-300" : "text-blue-800"
                }`}
              >
                Patient mHealth App
              </h2>
              <div
                className={`w-20 h-1 mb-6 ${
                  isDark ? "bg-blue-500" : "bg-blue-600"
                }`}
              ></div>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Connects Patients to Doctors and hospitals in a personalized way
              </p>
              <div
                className={`p-4 rounded-lg text-6xl flex items-center justify-center ${
                  isDark
                    ? "bg-blue-900 text-blue-300"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                📱
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3
                    className={`font-semibold text-lg mb-4 ${
                      isDark ? "text-blue-300" : "text-blue-800"
                    }`}
                  >
                    Core Features
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Online and Offline appointment scheduling",
                      "Check Upcoming & Past Appointments",
                      "Emergency services with Geo Fencing",
                      "Secure video consultations",
                      "Remote patient monitoring",
                      "Download/View Prescriptions",
                      "Electronic Health Records (EHR)",
                      "Doctor/Hospital feedback system",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-blue-400" : "text-blue-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    className={`font-semibold text-lg mb-4 ${
                      isDark ? "text-blue-300" : "text-blue-800"
                    }`}
                  >
                    Benefits
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Immediate attention to health issues",
                      "24/7 access to healthcare services",
                      "Personalized health management",
                      "Seamless hospital service extension",
                      "Centralized health records",
                      "Improved patient engagement",
                      "Reduced wait times",
                      "Enhanced care coordination",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-blue-400" : "text-blue-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Doctor mHealth App */}
        <motion.div
          ref={doctorAppRef}
          variants={itemVariants}
          className={`p-8 rounded-xl mb-12 ${
            isDark ? "bg-gray-800" : "bg-purple-50"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-purple-300" : "text-purple-800"
                }`}
              >
                Doctor mHealth App
              </h2>
              <div
                className={`w-20 h-1 mb-6 ${
                  isDark ? "bg-purple-500" : "bg-purple-600"
                }`}
              ></div>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Allows medical professionals to manage their practices
                efficiently
              </p>
              <div
                className={`p-4 rounded-lg text-6xl flex items-center justify-center ${
                  isDark
                    ? "bg-purple-900 text-purple-300"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                🩺
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3
                    className={`font-semibold text-lg mb-4 ${
                      isDark ? "text-purple-300" : "text-purple-800"
                    }`}
                  >
                    Core Features
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Practice management dashboard",
                      "Self-registration to automatic empanelment",
                      "Electronic Health Records (EHR)",
                      "Secure video consultations",
                      "Remote patient monitoring",
                      "HIMS integration",
                      "OT Notes with real-time updates",
                      "Discharge Summary generation",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-purple-400" : "text-purple-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    className={`font-semibold text-lg mb-4 ${
                      isDark ? "text-purple-300" : "text-purple-800"
                    }`}
                  >
                    Benefits
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Streamlined clinical workflows",
                      "Comprehensive patient records access",
                      "Improved care coordination",
                      "Enhanced clinical documentation",
                      "Time-saving automation",
                      "Better decision making",
                      "Seamless hospital integration",
                      "Improved patient outcomes",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-purple-400" : "text-purple-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Hospital Management System */}
        <motion.div
          ref={hmsRef}
          variants={itemVariants}
          className={`p-8 rounded-xl mb-12 ${
            isDark ? "bg-gray-800" : "bg-teal-50"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-teal-300" : "text-teal-800"
                }`}
              >
                Hospital Management System
              </h2>
              <div
                className={`w-20 h-1 mb-6 ${
                  isDark ? "bg-teal-500" : "bg-teal-600"
                }`}
              ></div>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Comprehensive solution for hospital administration and patient
                care
              </p>
              <div
                className={`p-4 rounded-lg text-6xl flex items-center justify-center ${
                  isDark
                    ? "bg-teal-900 text-teal-300"
                    : "bg-teal-100 text-teal-600"
                }`}
              >
                🏥
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="space-y-8">
                {/* Patient Services */}
                <div>
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      isDark ? "text-teal-300" : "text-teal-700"
                    }`}
                  >
                    Patient Services
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Registration (OP, IP, Referrals)",
                      "Admission Transfer (AT) - covers admission, discharge, bed management with 24-Hour Basis/Hourly Bed Price Calculation",
                      "Appointment Scheduler - covers Help Desk Management, Appointment Scheduling, Cancellation",
                      "Service Billing - Cash, Credit, TPA and Package billing, Allows billing for bundled services or treatment packages with itemized details",
                      "Online Appointment: Enables patients to book appointments online via the website or mobile app",
                      "Offline Appointment: Records walk-in appointments, enabling seamless integration with the online system",
                      "Bed Management: Streamlines bed allocation, availability, and status updates in real-time",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-teal-400" : "text-teal-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Administrative Modules */}
                <div>
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      isDark ? "text-teal-300" : "text-teal-700"
                    }`}
                  >
                    Administrative Modules
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Admin Dashboard: Operational, financial and management dashboard for daily, weekly, monthly analytical dashboard",
                      "Security and Administration: Role-based security feature promoting data integrity and confidentiality",
                      "MIS (Operational Reports & Dashboard)",
                      "Human Resources System (HR) and Payroll – covers Attendance",
                      "Audit Logs: Tracks all user activities across the system for accountability and compliance",
                      "Inventory Management covers Purchasing, Receipts, Consumptions, General Stores",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-teal-400" : "text-teal-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clinical Information Systems */}
                <div>
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      isDark ? "text-teal-300" : "text-teal-700"
                    }`}
                  >
                    Clinical Information Systems
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Laboratory Information System (LIS) - Covers the entire functionality of LAB (as part of Hospital or as independent Unit)",
                      "Pharmacy – Covers Drug Management",
                      "Diagnostic & Imaging services – covers RIS Generic EMR (Doctor & Wards) & CPOE – covers Case History Management",
                      "Operation Theatre (OT) - includes OT scheduling, capture structured real-time documentation of pre, intra and post-operative care and transfer to wards",
                      "Doctor's workbench – covers OPD prescriptions, discharge summary and OT notes",
                      "Nurse Workbench covers Wards, ICU's Blood Bank Accident & Emergency",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-teal-400" : "text-teal-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Auxiliary Modules */}
                <div>
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      isDark ? "text-teal-300" : "text-teal-700"
                    }`}
                  >
                    Auxiliary Modules
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Pharmacy module - Dispensing and inventory management of all medicines and drugs",
                      "Health Records: Health campaign, employee health records management",
                      "Free Website Creation and Customization",
                      "Gallery Option: Displays images and videos related to the hospital's services and facilities",
                      "Subscribers and Enquiries Management - Maintains details of newsletter subscribers and enquiry submissions for better engagement",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-teal-400" : "text-teal-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interface */}
                <div>
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      isDark ? "text-teal-300" : "text-teal-700"
                    }`}
                  >
                    Interface
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Interface with Laboratory equipment with 3rd party MediEquip Engine",
                      "Integration with 3rd party PACS (HL7 Compliant) system",
                      "Interface with ERP (Tally)",
                      "WhatsApp, SMS, and Email Notifications - Sends automated and configurable messages for reminders, updates, and alerts",
                      "Mobile App Interface: Extends hospital services to patients through a user-friendly mobile application",
                      "OT (Operation Theatre) Notes in Mobile Application: Real-Time Updates, Template Support, Secure Data, Storage Access Anywhere",
                      "Discharge Summary Notes in Mobile Application: Instant Generation, Pre-Filled Data, Digital Approval",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-teal-400" : "text-teal-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. Emergency SOS Services */}
        <motion.div
          ref={sosRef}
          variants={itemVariants}
          className={`p-8 rounded-xl mb-12 ${
            isDark ? "bg-gray-800" : "bg-red-50"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-red-300" : "text-red-800"
                }`}
              >
                Emergency SOS Services
              </h2>
              <div
                className={`w-20 h-1 mb-6 ${
                  isDark ? "bg-red-500" : "bg-red-600"
                }`}
              ></div>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Integrated emergency response system for immediate medical
                assistance
              </p>
              <div
                className={`p-4 rounded-lg text-6xl flex items-center justify-center ${
                  isDark ? "bg-red-900 text-red-300" : "bg-red-100 text-red-600"
                }`}
              >
                🚨
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3
                    className={`font-semibold text-lg mb-4 ${
                      isDark ? "text-red-300" : "text-red-800"
                    }`}
                  >
                    Core Features
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Immediate Emergency Response with SOS buttons",
                      "Triggers notification to nearby ambulances",
                      "Live location tracking of assigned ambulance",
                      "Estimated Time of Arrival (ETA) display",
                      "Multiple payment options (credit card, UPI, insurance)",
                      "Integrated hospital navigation",
                      "Traffic and route optimization alerts",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-red-400" : "text-red-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    className={`font-semibold text-lg mb-4 ${
                      isDark ? "text-red-300" : "text-red-800"
                    }`}
                  >
                    Benefits
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Life-saving rapid response",
                      "Reduced emergency response times",
                      "Real-time tracking for peace of mind",
                      "Seamless payment processing",
                      "Optimized routes for fastest arrival",
                      "Integrated with all hospital services",
                      "24/7 availability",
                      "User-friendly interface in crisis situations",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`flex-shrink-0 mt-1 mr-3 ${
                            isDark ? "text-red-400" : "text-red-600"
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
                          className={isDark ? "text-gray-300" : "text-gray-700"}
                        >
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Unified Platform CTA */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2
            className={`text-3xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            A Complete Healthcare Ecosystem
          </h2>
          <p
            className={`text-xl mb-8 max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            All our products work seamlessly together to provide comprehensive
            care from prevention to emergency
          </p>
          <button
            className={`py-3 px-8 rounded-lg text-lg font-semibold shadow-lg transition-all ${
              isDark
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Request a Demo
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
