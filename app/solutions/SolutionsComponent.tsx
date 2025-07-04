"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  clinicsPointers,
  diagnosisPointers,
  doctorsPointers,
  hospitalPointers,
  patientsPointers,
} from "@/constants/constants";

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
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: 10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.9,
  },
};

export default function AudiencePage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const router = useRouter(); // Add this import from 'next/navigation'

  // Create refs for each section
  const patientsRef = useRef<HTMLDivElement>(null);
  const hospitalsRef = useRef<HTMLDivElement>(null);
  const specialistsRef = useRef<HTMLDivElement>(null);
  const clinicsRef = useRef<HTMLDivElement>(null);
  const diagnosisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !section) return;

    const scrollToSection = () => {
      let ref = null;
      switch (section) {
        case "1":
          ref = patientsRef;
          break;
        case "2":
          ref = hospitalsRef;
          break;
        case "3":
          ref = specialistsRef;
          break;
        case "4":
          ref = clinicsRef;
          break;
        case "5":
          ref = diagnosisRef;
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

    scrollToSection();
  }, [section, mounted, router]);

  if (!mounted) {
    return null;
  }

  // Determine the actual theme being displayed
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 z-0"
      />

      {/* Floating animated elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-purple-200/50 dark:bg-purple-900/30 blur-xl z-0"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-blue-200/50 dark:bg-blue-900/30 blur-xl z-0"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-6xl mx-auto px-4 py-8"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.h1
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Who We Serve?
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Our platform is designed to meet the needs of all healthcare
            stakeholders
          </motion.p>
        </motion.div>

        {/* Patients Section */}
        <motion.div
          ref={patientsRef}
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }}
          className={`p-8 rounded-xl mb-12 ${
            isDark ? "bg-gray-800" : "bg-blue-50"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              className="md:w-1/3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-blue-300" : "text-blue-800"
                }`}
              >
                Patients
              </h2>
              <motion.div
                className={`w-20 h-1 mb-6 ${
                  isDark ? "bg-blue-500" : "bg-blue-600"
                }`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className={`p-4 rounded-lg text-6xl flex items-center justify-center ${
                  isDark
                    ? "bg-blue-900 text-blue-300"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                👨‍⚕️
              </motion.div>
            </motion.div>
            <div className="md:w-2/3">
              <p
                className={`text-lg text-justify ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Patients looking for convenient access to healthcare services,
                including teleconsultations, surgical care, and digital health
                records through mHealth.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {patientsPointers.map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={featureItemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center p-3 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    <motion.span
                      className={`p-2 rounded-full mr-3 ${
                        isDark
                          ? "bg-blue-900 text-blue-300"
                          : "bg-blue-100 text-blue-600"
                      }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.span>
                    <div>
                      <span
                        className={isDark ? "text-gray-200" : "text-gray-800"}
                      >
                        {feature.title}
                      </span>
                      <p
                        className={`text-xs mt-1 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hospitals Section */}
        <motion.div
          ref={hospitalsRef}
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }}
          className={`p-8 rounded-xl mb-12 ${
            isDark ? "bg-gray-800" : "bg-teal-50"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              className="md:w-1/3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-teal-300" : "text-teal-800"
                }`}
              >
                Hospitals & Network Hospitals
              </h2>
              <motion.div
                className={`w-20 h-1 mb-6 ${
                  isDark ? "bg-teal-500" : "bg-teal-600"
                }`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className={`p-4 rounded-lg text-6xl flex items-center justify-center ${
                  isDark
                    ? "bg-teal-900 text-teal-300"
                    : "bg-teal-100 text-teal-600"
                }`}
              >
                🏥
              </motion.div>
            </motion.div>
            <div className="md:w-2/3">
              <p
                className={`text-lg text-justify ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Hospitals and healthcare institutions in need of an efficient
                Hospital Information Management System (HIMS) to optimize
                operational workflows, patient data management, and
                administrative processes.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {hospitalPointers.map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={featureItemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center p-3 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    <motion.span
                      className={`p-2 rounded-full mr-3 ${
                        isDark
                          ? "bg-teal-900 text-teal-300"
                          : "bg-teal-100 text-teal-600"
                      }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.span>
                    <div>
                      <span
                        className={isDark ? "text-gray-200" : "text-gray-800"}
                      >
                        {feature.title}
                      </span>
                      <p
                        className={`text-xs mt-1 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specialists Section */}
        <motion.div
          ref={specialistsRef}
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }}
          className={`p-8 rounded-xl mb-12 ${
            isDark ? "bg-gray-800" : "bg-purple-50"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              className="md:w-1/3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-purple-300" : "text-purple-800"
                }`}
              >
                Doctors & Physicians
              </h2>
              <motion.div
                className={`w-20 h-1 mb-6 ${
                  isDark ? "bg-purple-500" : "bg-purple-600"
                }`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className={`p-4 rounded-lg text-6xl flex items-center justify-center ${
                  isDark
                    ? "bg-purple-900 text-purple-300"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                👩‍⚕️
              </motion.div>
            </motion.div>
            <div className="md:w-2/3">
              <p
                className={`text-lg text-justify ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Doctors and Physicians (across all specialties) can leverage the
                mHealth features for remote patient monitoring, follow-ups, and
                convenient teleconsultations. The integration with HIMS ensures
                they have access to complete patient records during virtual
                interactions.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {doctorsPointers.map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={featureItemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center p-3 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    <motion.span
                      className={`p-2 rounded-full mr-3 ${
                        isDark
                          ? "bg-purple-900 text-purple-300"
                          : "bg-purple-100 text-purple-600"
                      }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.span>
                    <div>
                      <span
                        className={isDark ? "text-gray-200" : "text-gray-800"}
                      >
                        {feature.title}
                      </span>
                      <p
                        className={`text-xs mt-1 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Clinics Section */}
        <motion.div
          ref={clinicsRef}
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }}
          className={`p-8 rounded-xl mb-12 ${
            isDark ? "bg-gray-800" : "bg-green-50"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              className="md:w-1/3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-green-300" : "text-green-800"
                }`}
              >
                Clinics
              </h2>
              <motion.div
                className={`w-20 h-1 mb-6 ${
                  isDark ? "bg-green-500" : "bg-green-600"
                }`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className={`p-4 rounded-lg text-6xl flex items-center justify-center ${
                  isDark
                    ? "bg-green-900 text-green-300"
                    : "bg-green-100 text-green-600"
                }`}
              >
                🏩
              </motion.div>
            </motion.div>
            <div className="md:w-2/3">
              <p
                className={`text-lg text-justify ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Organizations Seeking Improved Patient Engagement and Outcomes:
                By connecting mHealth with HIMS, the platform facilitates better
                communication with patients, enables proactive care, and
                ultimately contributes to improved health outcomes.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {clinicsPointers.map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={featureItemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center p-3 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    <motion.span
                      className={`p-2 rounded-full mr-3 ${
                        isDark
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-600"
                      }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.span>
                    <div>
                      <span
                        className={isDark ? "text-gray-200" : "text-gray-800"}
                      >
                        {feature.title}
                      </span>
                      <p
                        className={`text-xs mt-1 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Diagnosis Centers Section */}
        <motion.div
          ref={diagnosisRef}
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }}
          className={`p-8 rounded-xl mb-12 ${
            isDark ? "bg-gray-800" : "bg-orange-50"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              className="md:w-1/3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-orange-300" : "text-orange-800"
                }`}
              >
                Diagnosis Centers
              </h2>
              <motion.div
                className={`w-20 h-1 mb-6 ${
                  isDark ? "bg-orange-500" : "bg-orange-600"
                }`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className={`p-4 rounded-lg text-6xl flex items-center justify-center ${
                  isDark
                    ? "bg-orange-900 text-orange-300"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                🔬
              </motion.div>
            </motion.div>
            <div className="md:w-2/3">
              <p
                className={`text-lg text-justify ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Surgeons and Surgical Teams: The platform's focus on surgical
                care, seamlessly connected to HIMS, means surgeons can access
                comprehensive patient histories, pre- and post-operative
                information, and manage their surgical schedules more
                effectively.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {diagnosisPointers.map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={featureItemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center p-3 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    <motion.span
                      className={`p-2 rounded-full mr-3 ${
                        isDark
                          ? "bg-orange-900 text-orange-300"
                          : "bg-orange-100 text-orange-600"
                      }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.span>
                    <div>
                      <span
                        className={isDark ? "text-gray-200" : "text-gray-800"}
                      >
                        {feature.title}
                      </span>
                      <p
                        className={`text-xs mt-1 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
