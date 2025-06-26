"use client";

import React, { useEffect } from "react";
import {
  ArrowLeft,
  Edit,
  Users,
  Calendar,
  MapPin,
  User,
  CheckCircle,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useUser } from "@/context/UserContext";
import LoadingSpinner from "@/components/loading/LoadingComponent";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const dashboardItems = [
  {
    icon: Users,
    title: "Add Members",
    bgColor: "bg-teal-500",
    cardBg: "bg-teal-50 dark:bg-teal-900/30",
  },
  {
    icon: Calendar,
    title: "Appointments",
    bgColor: "bg-teal-500",
    cardBg: "bg-teal-50 dark:bg-teal-900/30",
  },
];

const ProfileComponent = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { userData, loading, error, getUserData } = useUser();
  const { logout, token, setToken } = useAuth();
  const router = useRouter();
  // console.log(user)

  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      getUserData();
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
    setToken(null);
  };

  const profileSections = [
    {
      icon: User,
      title: "All Members",
      subtitle: "View member list",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: CheckCircle,
      title: "Completed Appointments",
      subtitle: "Click to see completed appointments list",
      bgColor: "bg-pink-100 dark:bg-pink-900/30",
      iconColor: "text-pink-600 dark:text-pink-400",
    },
    {
      icon: CreditCard,
      title: "Failed Payments",
      subtitle: "View your failed payments info",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      subtitle: "Read our refund policy",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: HelpCircle,
      title: "Support",
      subtitle: "Click view Cordiakare support info",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      icon: LogOut,
      title: "Logout",
      subtitle: "Logout your account",
      bgColor: "bg-teal-100 dark:bg-teal-900/30",
      iconColor: "text-teal-600 dark:text-teal-400",
      onClick: handleLogout,
    },
  ];

  return loading ? (
    <LoadingSpinner />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className={`shadow-sm ${isDark ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.button>
              <h1
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                My Profile
              </h1>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Profile Info */}
        <motion.div
          variants={itemVariants}
          className={`rounded-xl shadow-sm p-6 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center"
              >
                <div className="w-12 h-8 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-8 h-6 bg-teal-500 rounded-sm"></div>
                </div>
              </motion.div>
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {userData?.full_name}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin
                    className={`w-4 h-4 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {userData?.city}
                  </span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors"
            >
              <Edit className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Dashboard */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <h3
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            My Dashboard
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`${item.cardBg} rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${item.bgColor} p-3 rounded-xl`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4
                      className={`text-lg font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <ChevronRight
                    className={`w-6 h-6 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Profile Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <h3
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            My Profile
          </h3>
          <motion.div
            className={`rounded-xl shadow-sm overflow-hidden ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <AnimatePresence>
              {profileSections.map((section, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  onClick={section.onClick}
                  className={`border-b ${
                    isDark
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-100 hover:bg-gray-50"
                  } last:border-b-0 cursor-pointer transition-colors`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`${section.bgColor} p-3 rounded-xl`}>
                          <section.icon
                            className={`w-6 h-6 ${section.iconColor}`}
                          />
                        </div>
                        <div>
                          <h4
                            className={`font-medium ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {section.title}
                          </h4>
                          <p
                            className={`text-sm mt-1 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {section.subtitle}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Delete Account */}
        <motion.div
          variants={itemVariants}
          className={`rounded-xl shadow-sm p-4 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors ${
              isDark
                ? "text-red-400 hover:bg-red-900/30"
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            <Trash2 className="w-5 h-5" />
            <span className="font-medium">Delete Account</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileComponent;
