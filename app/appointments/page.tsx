"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import {
  CalendarCheck,
  Video,
  Upload,
  WalletCards,
  Smartphone,
  FileText,
  Stethoscope,
  Clock,
  Bell,
  UserSquare,
  ListChecks,
  CreditCard,
  CalendarX,
  Cross,
  ArrowRight,
  Sparkles,
  Shield,
  Heart,
} from "lucide-react";

const AppointmentsPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const teleconsultationRef = useRef<HTMLDivElement>(null);
  const hospitalRef = useRef<HTMLDivElement>(null);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMounted(true);
    const hash = window.location.hash;

    if (hash === "#hospital-appointments" && hospitalRef.current) {
      setTimeout(() => {
        hospitalRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  const isDark = mounted ? theme === "dark" : false;

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

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50" />; // Prevent hydration mismatch
  }

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900 opacity-90" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              Next-Gen Healthcare Platform
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span
                className={`bg-gradient-to-r ${
                  isDark
                    ? "from-blue-400 via-purple-400 to-teal-400"
                    : "from-blue-600 via-purple-600 to-teal-600"
                } bg-clip-text text-transparent`}
              >
                Smart Appointment System
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Seamless healthcare access through teleconsultation and hospital
              appointments
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Shield className="h-5 w-5" />
                <span className="font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Heart className="h-5 w-5" />
                <span className="font-medium">24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Innovative Solutions</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Teleconsultation Section */}
      <section
        id="teleconsultation"
        className="py-20 scroll-mt-20"
        ref={teleconsultationRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Teleconsultation Features
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"
            />
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Experience the future of healthcare with our comprehensive
              telemedicine platform
            </motion.p>
          </motion.div>

          {/* New Layout: Full-width feature cards with image integration */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* App Showcase Card */}
            <motion.div
              variants={itemVariants}
              className={`p-8 rounded-3xl ${
                isDark ? "bg-gray-800/50" : "bg-white/80"
              } backdrop-blur-sm border ${
                isDark ? "border-gray-700" : "border-gray-200"
              } shadow-2xl ${
                isDark &&
                "dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.15)]"
              } overflow-hidden`}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* App Image */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative order-2 lg:order-1"
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden shadow-xl ${
                      isDark &&
                      "dark:shadow-[0_20px_25px_-5px_rgba(255,255,255,0.1),0_8px_10px_-6px_rgba(255,255,255,0.1)]"
                    }`}
                  >
                    <Image
                      src="/teleconsultation.jpg"
                      alt="CordeliaKare mHealth Mobile App Interface"
                      width={500}
                      height={600}
                      className="w-full h-auto"
                    />

                    {/* Floating badges on the image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className={`absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-xl shadow-lg ${
                        isDark &&
                        "dark:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.07),0_4px_6px_-4px_rgba(255,255,255,0.07)]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Live Now</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Download buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="flex gap-4 mt-6 justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className={`px-6 py-3 bg-black text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 text-sm ${
                        isDark &&
                        "dark:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.07),0_4px_6px_-4px_rgba(255,255,255,0.07)] dark:hover:shadow-[0_20px_25px_-5px_rgba(255,255,255,0.1),0_8px_10px_-6px_rgba(255,255,255,0.1)]"
                      }`}
                    >
                      <Smartphone className="h-4 w-4" />
                      App Store
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className={`px-6 py-3 bg-green-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 text-sm ${
                        isDark &&
                        "dark:shadow-[0_10px_15px_-3px_rgba(9,151,64,0.3),0_4px_6px_-4px_rgba(9,151,64,0.3)] dark:hover:shadow-[0_20px_25px_-5px_rgba(9,151,64,0.4),0_8px_10px_-6px_rgba(9,151,64,0.4)]"
                      }`}
                    >
                      <Smartphone className="h-4 w-4" />
                      Google Play
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* App Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="order-1 lg:order-2"
                >
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-4">
                      CordeliaKare mHealth App
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      Connects patients to doctors, hospitals, and emergency
                      care facilities anywhere & anytime you need them
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div
                      className={`p-4 rounded-xl ${
                        isDark ? "bg-blue-900/20" : "bg-blue-50"
                      } border ${
                        isDark ? "border-blue-800" : "border-blue-200"
                      }`}
                    >
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        24/7
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Available Support
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-xl ${
                        isDark ? "bg-green-900/20" : "bg-green-50"
                      } border ${
                        isDark ? "border-green-800" : "border-green-200"
                      }`}
                    >
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        Verified
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Healthcare Providers
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium">
                      <Shield className="h-4 w-4" />
                      HIPAA Compliant
                    </div>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                      <Sparkles className="h-5 w-5" />
                      <span className="font-medium">Innovative Solutions</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <CalendarCheck className="h-6 w-6" />,
                  title: "Appointment Scheduling",
                  desc: "Streamlines booking and reminders for both patients and providers.",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "bg-blue-50 dark:bg-blue-900/20",
                  borderColor: "border-blue-200 dark:border-blue-800",
                },
                {
                  icon: <Video className="h-6 w-6" />,
                  title: "Real-Time Video Consultations",
                  desc: "Enables synchronous interaction between patients and doctors for diagnosis, follow-ups, and treatment planning.",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "bg-purple-50 dark:bg-purple-900/20",
                  borderColor: "border-purple-200 dark:border-purple-800",
                },
                {
                  icon: <Upload className="h-6 w-6" />,
                  title: "Documentation Upload",
                  desc: "Patients can send health data, images, or queries for review at the time of specialist input or second opinions.",
                  color: "from-green-500 to-green-600",
                  bgColor: "bg-green-50 dark:bg-green-900/20",
                  borderColor: "border-green-200 dark:border-green-800",
                },
                {
                  icon: <WalletCards className="h-6 w-6" />,
                  title: "Digital Payments & Billing",
                  desc: "Simplifies transactions over UPI and other facilities.",
                  color: "from-amber-500 to-amber-600",
                  bgColor: "bg-amber-50 dark:bg-amber-900/20",
                  borderColor: "border-amber-200 dark:border-amber-800",
                },
                {
                  icon: <FileText className="h-6 w-6" />,
                  title: "E-Prescriptions & EMR",
                  desc: "Digital prescriptions sent directly to patients with access to patient history, previous prescriptions, and test results for informed care.",
                  color: "from-teal-500 to-teal-600",
                  bgColor: "bg-teal-50 dark:bg-teal-900/20",
                  borderColor: "border-teal-200 dark:border-teal-800",
                },
                {
                  icon: <Smartphone className="h-6 w-6" />,
                  title: "Technology Used",
                  desc: "Mobile apps, web portals, secure video conferencing for seamless healthcare access.",
                  color: "from-indigo-500 to-indigo-600",
                  bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
                  borderColor: "border-indigo-200 dark:border-indigo-800",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  className={`group relative p-6 rounded-2xl ${
                    feature.bgColor
                  } border ${feature.borderColor} hover:shadow-xl ${
                    isDark &&
                    "dark:hover:shadow-[0_20px_25px_-5px_rgba(255,255,255,0.1),0_8px_10px_-6px_rgba(255,255,255,0.1)]"
                  } transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${
                        feature.color.split(" ")[1]
                      }, ${feature.color.split(" ")[3]})`,
                    }}
                  />

                  <motion.div
                    variants={cardHoverVariants}
                    className="relative z-10"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${
                          feature.color
                        } text-white shadow-lg group-hover:shadow-xl ${
                          isDark &&
                          "dark:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.07),0_4px_6px_-4px_rgba(255,255,255,0.07)] dark:group-hover:shadow-[0_20px_25px_-5px_rgba(255,255,255,0.1),0_8px_10px_-6px_rgba(255,255,255,0.1)]"
                        } transition-shadow duration-300`}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hospital Appointments Section */}
      <section
        ref={hospitalRef}
        id="hospital-appointments"
        className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-blue-900/20 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Hospital Appointment Features
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Streamlined in-person care with digital convenience
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {[
              {
                icon: <CalendarCheck className="h-6 w-6" />,
                text: "Easy Appointment Booking",
                desc: "Schedule appointments anytime via website or mobile app.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Stethoscope className="h-6 w-6" />,
                text: "Doctor & Time Selection",
                desc: "Choose preferred doctor, department, and available time slot.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: <Bell className="h-6 w-6" />,
                text: "Instant Confirmation & Reminders",
                desc: "Automated SMS/email confirmation and reminders reduce missed appointments.",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: <UserSquare className="h-6 w-6" />,
                text: "Patient Registration in Advance",
                desc: "Pre-register to speed up check-in process on arrival.",
                gradient: "from-amber-500 to-orange-500",
              },
              {
                icon: <ListChecks className="h-6 w-6" />,
                text: "Digital Queue Management",
                desc: "Minimize wait times & avoid overcrowding",
                gradient: "from-teal-500 to-blue-500",
              },
              {
                icon: <FileText className="h-6 w-6" />,
                text: "Integration with Health Records",
                desc: "Syncs with EMRs for doctor reference during consultation.",
                gradient: "from-indigo-500 to-purple-500",
              },
              {
                icon: <CreditCard className="h-6 w-6" />,
                text: "Online Payment Facility",
                desc: "Secure payment for consultation fees at booking time.",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                icon: <CalendarX className="h-6 w-6" />,
                text: "Rescheduling & Cancellation Options",
                desc: "Flexible management of appointments with minimal hassle.",
                gradient: "from-violet-500 to-purple-500",
              },
              {
                icon: <Cross className="h-6 w-6" />,
                text: "Multi-Specialty Access",
                desc: "Book across departments for diagnostics & health packages.",
                gradient: "from-emerald-500 to-teal-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className={`group relative p-6 rounded-2xl ${
                  isDark ? "bg-gray-800/50" : "bg-white/80"
                } backdrop-blur-sm border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } hover:shadow-2xl ${
                  isDark &&
                  "dark:hover:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.15)]"
                } transition-all duration-300 overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${
                        feature.gradient
                      } text-white shadow-lg group-hover:shadow-xl ${
                        isDark &&
                        "dark:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.07),0_4px_6px_-4px_rgba(255,255,255,0.07)] dark:group-hover:shadow-[0_20px_25px_-5px_rgba(255,255,255,0.1),0_8px_10px_-6px_rgba(255,255,255,0.1)]"
                      } transition-shadow duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.text}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div
              className={`inline-block p-8 rounded-3xl ${
                isDark ? "bg-gray-800/50" : "bg-white/80"
              } backdrop-blur-sm border ${
                isDark ? "border-gray-700" : "border-gray-200"
              } shadow-2xl ${
                isDark &&
                "dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.15)]"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Your health journey starts with our compassionate care
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl ${
                    isDark &&
                    "dark:shadow-purple-800/20 dark:hover:shadow-purple-800/30"
                  } transition-shadow flex items-center justify-center gap-3 group`}
                >
                  <Video className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Teleconsultation
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 ${
                    isDark
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  } rounded-xl font-semibold shadow-lg hover:shadow-xl ${
                    isDark &&
                    "dark:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.07),0_4px_6px_-4px_rgba(255,255,255,0.07)] dark:hover:shadow-[0_20px_25px_-5px_rgba(255,255,255,0.1),0_8px_10px_-6px_rgba(255,255,255,0.1)]"
                  } transition-shadow border-2 flex items-center justify-center gap-3 group`}
                >
                  <CalendarCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Book Hospital Visit
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  Secure & Private
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  Trusted by Patients
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentsPage;
