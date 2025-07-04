"use client";

import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
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
import axios from "axios";

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
    route: '/profile/appointments'
  },
];

const ProfileComponent = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { userData, loading, error, getUserData } = useUser();
  const { logout, token, setToken } = useAuth();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: null,
    premises: "",
    zipCode: "",
    locality: "",
    state: "",
    country: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(userData);

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
      onClick: ()=>window.location.href = "https://prod.cordeliakare.com/privacy-policy"
    },
    {
      icon: HelpCircle,
      title: "Support",
      subtitle: "Click view Cordiakare support info",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400",
      onClick: ()=>router.push('/profile/support')
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

  const updateProfile = async () => {
    try {
      const accessToken = token || localStorage.getItem("token");
      const data = new FormData();

      data.append("register_type", "patient");
      data.append("first_name", formData.firstName);
      data.append("last_name", formData.lastName);
      data.append("email", formData.email);
      data.append("dob", formData.dob);
      data.append("gender", undefined);
      data.append("registration_type", 1);
      data.append("prefix_code", "91");
      data.append("address1", formData.premises);
      data.append("address2", "");
      data.append("zip", formData.zipCode);
      data.append("city", formData.locality);
      data.append("state", formData.state);
      data.append("country", formData.country);
      data.append("referrel", "");

      if (selectedImage) {
        // For web file uploads, the File object itself might be what's needed
        data.append("image", selectedImage);
      }

      const response = await axios.post(
        API_BASE_URL + "/api/profileupdate",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log("Update profile response ===> ", response);
      // Handle success
      setIsEditModalOpen(false);
      toast.success(response?.data.message);
      getUserData(); // Refresh user data
      // You might want to add a success toast here
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed, Try again.");
      // Handle error (show error message)
    }
  };

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
                onClick={() => router.back()}
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
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-500"
              >
                {userData?.image_url ? (
                  <img
                    src={userData.image_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-600">
                    <User className="w-8 h-8" />
                  </div>
                )}
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
            {/* Replace the existing edit button with this: */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors"
              onClick={() => {
                if (userData) {
                  setFormData({
                    firstName: userData.first_name || "",
                    lastName: userData.last_name || "",
                    email: userData.email || "",
                    dob: userData.dob || "",
                    gender: null,
                    premises: userData?.owner?.address?.address1 || "",
                    zipCode: userData?.owner?.address?.zip || "",
                    locality: userData?.city || "",
                    state: userData?.owner?.address?.state || "",
                    country: "India",
                  });
                }
                setIsEditModalOpen(true);
              }}
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
                onClick={()=>router.push(item.route!)}
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
            onClick={()=>toast.error("Unable to process your request!")}
          >
            <Trash2 className="w-5 h-5" />
            <span className="font-medium">Delete Account</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsEditModalOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className={`relative rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                className={`text-xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Edit Profile
              </h2>

              {/* Profile Image Upload */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  {selectedImage ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Profile Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : userData?.image_url ? (
                    <img
                      src={userData?.image_url}
                      alt="Current Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-white">
                      <User className="w-8 h-8" />
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="profileImage"
                      className={`px-4 py-2 rounded-lg cursor-pointer ${
                        isDark
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      Change Photo
                    </label>
                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedImage(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block mb-1 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className={`w-full p-2 rounded-lg border ${
                        isDark
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block mb-1 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className={`w-full p-2 rounded-lg border ${
                        isDark
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full p-2 rounded-lg border ${
                      isDark
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className={`w-full p-2 rounded-lg border ${
                      isDark
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.premises}
                    onChange={(e) =>
                      setFormData({ ...formData, premises: e.target.value })
                    }
                    className={`w-full p-2 rounded-lg border ${
                      isDark
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block mb-1 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      className={`w-full p-2 rounded-lg border ${
                        isDark
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block mb-1 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Locality
                    </label>
                    <input
                      type="text"
                      value={formData.locality}
                      onChange={(e) =>
                        setFormData({ ...formData, locality: e.target.value })
                      }
                      className={`w-full p-2 rounded-lg border ${
                        isDark
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block mb-1 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      className={`w-full p-2 rounded-lg border ${
                        isDark
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 pt-6">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className={`px-4 py-2 rounded-lg ${
                      isDark
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProfile}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileComponent;
