"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  GraduationCap,
  Clock,
  ThumbsUp,
  Languages,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    qualification: string;
    experience: string;
    rating: number;
    consultationFee: number;
    languages: string[];
    about: string;
    address: string;
  };
  onSelect?: (doctor: any) => void;
}

const DoctorCard = ({ doctor, onSelect }: DoctorCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getRandomColor = (str: string) => {
    // Generate consistent color based on name
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-amber-100 text-amber-800",
      "bg-rose-100 text-rose-800",
    ];
    const hash = str
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  const formatExperienceDescription = (
    specialty: string,
    experience: string
  ) => {
    const years = parseFloat(experience);
    if (isNaN(years)) {
      return `Experienced ${specialty} professional`;
    }

    const roundedYears = Math.round(years);
    const yearText = roundedYears === 1 ? "year" : "years";

    return `Experienced${
      /(er|or|ian|ist|st|ant)$/i.test(specialty.trim()) ? " " : " in "
    }${specialty} with ${roundedYears} ${yearText} experience`;
  };

  const toggleExpand = () => setExpanded(!expanded);

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ));
  };

  if (!mounted) {
    return (
      <div className="border rounded-lg overflow-hidden mb-4 shadow-sm h-[88px] bg-gray-100 animate-pulse"></div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div
      className={`border rounded-lg overflow-hidden mb-4 shadow-sm ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white"
      }`}
    >
      {/* Clickable header */}
      <div
        className={`p-4 flex items-center cursor-pointer ${
          isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
        }`}
        onClick={toggleExpand}
      >
        <div
          className={`relative w-12 h-12 rounded-full overflow-hidden mr-3 flex items-center justify-center font-semibold ${getRandomColor(
            doctor.name
          )}`}
        >
          {getInitials(doctor.name)}
        </div>
        <div className="flex-1">
          <h3 className={`font-bold ${isDark ? "text-white" : ""}`}>
            {doctor.name}
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {doctor.specialty}
          </p>
          <div className="flex items-center mt-1">
            {renderStars(doctor.rating)}
            <span
              className={`text-xs ml-1 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              (4.8)
            </span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight
            className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          />
        </motion.div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`border-t ${
              isDark ? "border-gray-700 bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div className="p-4">
              <div className="mb-4">
                <h4
                  className={`font-medium mb-2 ${isDark ? "text-white" : ""}`}
                >
                  About
                </h4>
                <p className={`text-sm ${isDark ? "text-gray-300" : ""}`}>
                  {doctor.experience === "0"
                    ? `Qualified${
                        /(er|or|ian|ist|st|ant)$/i.test(doctor.specialty.trim())
                          ? " "
                          : " in "
                      }${doctor.specialty} with fresh perspective`
                    : formatExperienceDescription(
                        doctor.specialty,
                        doctor.experience
                      )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4
                    className={`font-medium mb-2 ${isDark ? "text-white" : ""}`}
                  >
                    Details
                  </h4>
                  <div
                    className={`space-y-2 text-sm ${
                      isDark ? "text-gray-300" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-blue-500" />
                      {doctor.qualification}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      {doctor.experience}
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-2 text-blue-500" />
                      Board-Certified {doctor.specialty}
                    </div>
                    <div className="flex items-center">
                      <Languages className="w-4 h-4 mr-2 text-blue-500" />
                      Speaks {doctor.languages.join(", ")}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      {doctor.address}
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    className={`p-3 rounded-lg mb-3 ${
                      isDark ? "bg-gray-700" : "bg-blue-50"
                    }`}
                  >
                    <h4
                      className={`font-medium mb-1 ${
                        isDark ? "text-white" : ""
                      }`}
                    >
                      Consultation
                    </h4>
                    <p
                      className={`${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {doctor.consultationFee === 0
                        ? "Free Virtual Consultation"
                        : `₹${doctor.consultationFee}`}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-gray-300" : ""
                      }`}
                    >
                      Available for virtual and in-person consultations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorCard;
