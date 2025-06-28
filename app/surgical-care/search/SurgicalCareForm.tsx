"use client";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Calendar, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { surgeryOptions, specificSurgeries } from "./constants";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function SurgicalCareForm() {
  const { userData, getUserData } = useUser();
  const initialAddress =
    userData?.owner?.address?.address1 + ", " + userData?.owner?.address?.city;
  const router = useRouter();
  const { theme } = useTheme();
  const searchParams: any = useSearchParams();
  const initialLocation: any = searchParams?.get("location");
  const [locationType, setLocationType] = useState(initialLocation);
  const [surgeryType, setSurgeryType] = useState("");
  const [specificSurgery, setSpecificSurgery] = useState("");
  const [specificSurgeryInput, setSpecificSurgeryInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [priorities, setPriorities] = useState([
    { id: "1", label: "Cost", icon: "🏷️" },
    { id: "2", label: "Distance", icon: "📍" },
    { id: "3", label: "Doctor Rating", icon: "⭐" },
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState(initialAddress);
  const [healthConditions, setHealthConditions] = useState([
    { id: "diabetes", label: "Diabetes 🩸", selected: false },
    { id: "bloodPressure", label: "High Blood Pressure 💓", selected: false },
    { id: "thyroid", label: "Thyroid 🦋", selected: false },
    { id: "asthma", label: "Asthma 🌬️", selected: false },
    { id: "none", label: "None", selected: false },
    { id: "other", label: "Other", selected: false },
  ]);
  const [otherCondition, setOtherCondition] = useState("");
  const [showSurgeryDropdown, setShowSurgeryDropdown] = useState(false);
  const inputRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const setInitialLocation = async () => {
    if (ready && initialAddress) {
      try {
        // Set the value in the input
        setValue(initialAddress, false);
        setLocation(initialAddress);

        // Geocode to get coordinates
        const results = await getGeocode({ address: initialAddress });
        const { lat, lng } = await getLatLng(results[0]);

        setCoordinates({ lat, lng });

        // console.log("Initial location set:", initialAddress);
        // console.log("Initial coordinates:", { lat, lng });
      } catch (error) {
        console.error("Error geocoding initial location:", error);
        // Still set the location even if geocoding fails
        setValue(initialAddress, false);
        setLocation(initialAddress);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setInitialLocation();
  }, [userData]);

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

  const filterSuggestions = (input) => {
    if (!surgeryType || !input.trim()) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const suggestions =
      specificSurgeries[surgeryType]?.filter((surgery: any) =>
        surgery.label.toLowerCase().includes(input.toLowerCase())
      ) || [];
    setFilteredSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSpecificSurgery(suggestion.value);
    setSpecificSurgeryInput(suggestion.label);
    setShowSuggestions(false);
  };

  const handleInputChange = (text) => {
    setSpecificSurgeryInput(text);
    if (text.trim() === "") {
      setSpecificSurgery("");
    }
    filterSuggestions(text);
  };

  const movePriorityUp = (index: any) => {
    if (index <= 0) return;
    const newPriorities = [...priorities];
    [newPriorities[index], newPriorities[index - 1]] = [
      newPriorities[index - 1],
      newPriorities[index],
    ];
    setPriorities(newPriorities);
  };

  const movePriorityDown = (index: any) => {
    if (index >= priorities.length - 1) return;
    const newPriorities = [...priorities];
    [newPriorities[index], newPriorities[index + 1]] = [
      newPriorities[index + 1],
      newPriorities[index],
    ];
    setPriorities(newPriorities);
  };

  const toggleCondition = (id: any) => {
    setHealthConditions((prevConditions) => {
      if (id === "none") {
        return prevConditions.map((condition) => ({
          ...condition,
          selected: condition.id === "none" ? !condition.selected : false,
        }));
      }

      return prevConditions.map((condition) => {
        if (condition.id === id) {
          return { ...condition, selected: !condition.selected };
        }
        if (id !== "none" && condition.id === "none" && condition.selected) {
          return { ...condition, selected: false };
        }
        return condition;
      });
    });
  };

  const handlePlaceSelect = async (suggestion) => {
    setValue(suggestion.description, false);
    clearSuggestions();

    // console.log("Selected place:", suggestion); 

    try {
      const results = await getGeocode({ address: suggestion.description });
      const { lat, lng } = await getLatLng(results[0]);

      console.log("Geocoded coordinates:", { lat, lng });

      // Update location state
      setLocation(suggestion.description);
      setCoordinates({ lat, lng });
    } catch (error) {
      console.error("Error getting geocode:", error);
    }
  };

  const handleSearch = () => {
    if (!surgeryType) {
      alert("Please select a surgery type");
      return;
    }

    if (!specificSurgery && !specificSurgeryInput.trim()) {
      alert("Please enter a specific surgery");
      return;
    }

    if (!location) {
      alert("Please enter your location");
      return;
    }
    console.log("Location", location);
    if (!coordinates) {
      alert("Please enter your coordinates");
      return;
    }
    console.log("Co-ordinates", coordinates);

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert("End date must be after start date");
      return;
    }

    const selectedConditions = healthConditions
      .filter((condition) => condition.selected && condition.id !== "other")
      .map((condition) => condition.label);

    if (
      healthConditions.find((c) => c.id === "other")?.selected &&
      otherCondition.trim()
    ) {
      selectedConditions.push(otherCondition.trim());
    }

    const searchData = {
      locationType,
      surgeryType,
      specificSurgery: specificSurgery || specificSurgeryInput.trim(),
      priorities: priorities.map((p) => p.label),
      dateRange: { start: startDate, end: endDate },
      location,
      coordinates,
      healthConditions: selectedConditions,
    };

    console.log("Search Data:", searchData);
    router.push("/surgical-care/result");
  };

  const getSelectedSurgeryLabel = () => {
    if (!surgeryType) return "Select surgery type...";
    const selectedOption = surgeryOptions.find(
      (opt) => opt.value === surgeryType
    );
    return selectedOption ? selectedOption.label : "Select surgery type...";
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0  z-0" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Hero Section */}
        <motion.section
          variants={itemVariants}
          className={`relative py-8 border-b ${
            isDark
              ? "bg-gradient-to-r from-gray-800 to-blue-900 border-gray-700"
              : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center px-4 mt-4">
            <h1
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {locationType === "Abroad"
                ? "Surgical Care for International Patients"
                : "Surgical Care for Indian Patients"}
            </h1>
            <p
              className={`text-base md:text-lg max-w-2xl mx-auto ${
                isDark ? "text-blue-300" : "text-blue-600"
              }`}
            >
              Tell us your surgical needs and we'll match you with the perfect
              specialist
            </p>
          </div>
        </motion.section>

        {/* Main Form */}
        <motion.section variants={itemVariants} className="pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              whileHover={{ scale: 1.005 }}
              className={`rounded-lg p-6 space-y-6 ${
                isDark ? "bg-gray-800 shadow-lg" : "bg-white shadow-md"
              }`}
            >
              {/* Surgery Type Selection */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Select Surgery Type
                </h3>
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setShowSurgeryDropdown(!showSurgeryDropdown)}
                    className={`w-full p-3 text-left border rounded-lg transition flex items-center justify-between ${
                      isDark
                        ? "border-gray-700 bg-gray-700 hover:border-gray-600"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={isDark ? "text-gray-200" : "text-gray-700"}
                    >
                      {getSelectedSurgeryLabel()}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        showSurgeryDropdown ? "rotate-180" : ""
                      } ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    />
                  </motion.button>

                  {showSurgeryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 ${
                        isDark
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      {surgeryOptions.map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{
                            backgroundColor: isDark ? "#374151" : "#f9fafb",
                          }}
                          onClick={() => {
                            setSurgeryType(option.value);
                            setShowSurgeryDropdown(false);
                            setSpecificSurgery("");
                            setSpecificSurgeryInput("");
                          }}
                          className={`w-full p-3 text-left transition first:rounded-t-lg last:rounded-b-lg ${
                            isDark ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Specific Surgery Input */}
                {surgeryType && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3
                      className={`text-xl font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Enter Specific Surgery
                    </h3>
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={specificSurgeryInput}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Type to search for specific surgery..."
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-200"
                        }`}
                      />
                      <Search
                        className={`absolute right-3 top-3 w-5 h-5 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      />

                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto ${
                            isDark
                              ? "bg-gray-800 border-gray-700"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          {filteredSuggestions.map((suggestion, index) => (
                            <motion.button
                              key={index}
                              whileHover={{
                                backgroundColor: isDark ? "#374151" : "#f9fafb",
                              }}
                              onClick={() => handleSuggestionSelect(suggestion)}
                              className={`w-full p-3 text-left transition first:rounded-t-lg last:rounded-b-lg ${
                                isDark ? "text-gray-200" : "text-gray-700"
                              }`}
                            >
                              {suggestion.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Priority Ranking */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Rank Your Priorities
                </h3>
                <div
                  className={`rounded-lg overflow-hidden ${
                    isDark ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  {priorities.map((priority, index) => (
                    <motion.div
                      key={priority.id}
                      whileHover={{ scale: 1.01 }}
                      className={`flex items-center justify-between p-3 border-b transition ${
                        isDark
                          ? "border-gray-600 bg-gray-800"
                          : "border-gray-200 bg-white"
                      } last:border-b-0`}
                    >
                      <span
                        className={isDark ? "text-gray-200" : "text-gray-700"}
                      >
                        {priority.icon} {priority.label}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => movePriorityUp(index)}
                          disabled={index === 0}
                          className={`p-1.5 rounded-md transition ${
                            index === 0
                              ? isDark
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-gray-300 cursor-not-allowed"
                              : isDark
                              ? "text-teal-400 hover:bg-gray-700"
                              : "text-teal-600 hover:bg-teal-50"
                          }`}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => movePriorityDown(index)}
                          disabled={index === priorities.length - 1}
                          className={`p-1.5 rounded-md transition ${
                            index === priorities.length - 1
                              ? isDark
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-gray-300 cursor-not-allowed"
                              : isDark
                              ? "text-teal-400 hover:bg-gray-700"
                              : "text-teal-600 hover:bg-teal-50"
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Date Range */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Preferred Date Range
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-200"
                      }`}
                    />
                    <Calendar
                      className={`absolute right-3 top-3 w-4 h-4 pointer-events-none ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-200"
                      }`}
                    />
                    <Calendar
                      className={`absolute right-3 top-3 w-4 h-4 pointer-events-none ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Your Location
                </h3>

                <div className="relative">
                  <input
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      console.log(
                        "Google Places API hit with query:",
                        e.target.value
                      );
                    }}
                    disabled={!ready}
                    placeholder="Search for your location..."
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-200"
                    }`}
                  />
                  <MapPin
                    className={`absolute right-3 top-3 w-4 h-4 pointer-events-none ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />

                  {/* Suggestions dropdown */}
                  {status === "OK" && (
                    <div
                      className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto ${
                        isDark
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      {data.map((suggestion) => {
                        const {
                          place_id,
                          structured_formatting: { main_text, secondary_text },
                        } = suggestion;

                        return (
                          <button
                            key={place_id}
                            onClick={() => handlePlaceSelect(suggestion)}
                            className={`w-full p-3 text-left transition hover:${
                              isDark ? "bg-gray-700" : "bg-gray-50"
                            } ${isDark ? "text-gray-200" : "text-gray-700"}`}
                          >
                            <div className="font-medium">{main_text}</div>
                            <div
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {secondary_text}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Health Conditions */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Select Health Conditions (Optional)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {healthConditions.map((condition) => (
                    <motion.button
                      key={condition.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleCondition(condition.id)}
                      className={`px-3 py-1.5 rounded-full border transition ${
                        condition.selected
                          ? "bg-blue-500 text-white border-blue-500"
                          : isDark
                          ? "bg-gray-700 text-gray-200 border-gray-600 hover:border-gray-500"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {condition.label}
                    </motion.button>
                  ))}
                </div>

                {healthConditions.find((c) => c.id === "other")?.selected && (
                  <input
                    type="text"
                    value={otherCondition}
                    onChange={(e) => setOtherCondition(e.target.value)}
                    placeholder="Specify other condition"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-200"
                    }`}
                  />
                )}
              </motion.div>

              {/* Search Button */}
              <motion.div
                variants={itemVariants}
                className="pt-6"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-500 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-600 transition shadow-md"
                >
                  Find My Doctor
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
