"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { demoDoctors } from "./Data";
import { Doctor } from "./Data";
import LoadingSpinner from "@/components/loading/LoadingComponent";

type SearchData = {
  surgeryType?: string;
  priorities?: string[];
  dateRange?: { start: Date; end: Date };
  location?: string;
  healthConditions?: string[];
};

const DoctorResults = () => {
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchData, setSearchData] = useState<SearchData | null>(null);

  // Animation values
  const spinValue = React.useRef(0);
  const scaleValue = React.useRef(0.8);

  useEffect(() => {
    // Parse search params from URL
    const params = {
      surgeryType: searchParams.get("surgeryType") || undefined,
      priorities: searchParams.get("priorities")?.split(",") || undefined,
      location: searchParams.get("location") || undefined,
      healthConditions:
        searchParams.get("healthConditions")?.split(",") || undefined,
    };
    setSearchData(params);

    // Simulate API call
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        // TODO: Replace with actual API call
        // const response = await fetch(`/api/doctors?${new URLSearchParams(params)}`);
        // const data = await response.json();
        // setFilteredDoctors(data.doctors);

        // Using demo data for now
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFilteredDoctors(demoDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [searchParams]);

  const renderDoctorCard = (item: Doctor) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {item.name}
          </h3>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full"
          >
            {item.specialty}
          </motion.span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {item.hospital}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <motion.span
                whileHover={{ rotate: 15 }}
                className="mr-2 text-yellow-500"
              >
                ⭐
              </motion.span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.rating} ({item.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center">
              <motion.span
                whileHover={{ rotate: 15 }}
                className="mr-2 text-blue-500"
              >
                📍
              </motion.span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.distance} miles
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <motion.span
                whileHover={{ rotate: 15 }}
                className="mr-2 text-green-500"
              >
                💰
              </motion.span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                ${item.price}/session
              </span>
            </div>
            <div className="flex items-center">
              <motion.span
                whileHover={{ rotate: 15 }}
                className="mr-2 text-purple-500"
              >
                📅
              </motion.span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.availability}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/surgical-care/booking/${item.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Book Now
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );

  if (loading) {
    return <LoadingSpinner /> ;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Centered Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Find a Doctor
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {filteredDoctors.length}{" "}
            {filteredDoctors.length === 1 ? "doctor" : "doctors"} found
          </p>
        </motion.div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full max-w-md"
            >
              {renderDoctorCard(doctor)}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorResults;
