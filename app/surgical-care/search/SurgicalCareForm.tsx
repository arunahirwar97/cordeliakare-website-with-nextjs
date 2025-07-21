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
import toast from "react-hot-toast";
import { useMVT } from "@/context/MVT_Context";

export default function SurgicalCareForm() {
  const { surgeryOptions } = useMVT();
  const [mounted, setMounted] = useState(false);
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
  console.log("Search Params", initialLocation);
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleInputChange = (text: any) => {
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

  const handlePlaceSelect = async (suggestion: any) => {
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
    // Check for required fields and show toast notifications

    if (!surgeryType) {
      toast.error("Please select a surgery type");
      return;
    }

    // if (!specificSurgery && !specificSurgeryInput.trim()) {
    //   toast.error("Please enter a specific surgery");
    //   return;
    // }

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    } else if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date must be after start date");
      return;
    }

    if (!location || location.trim() === "" || location.includes("undefined")) {
      toast.error("Please enter a valid location");
      return;
    }

    // Check for optional fields (just show warning toasts)
    const hasHealthConditions = healthConditions.some(
      (condition) => condition.selected
    );
    if (!hasHealthConditions) {
      toast("Consider adding health conditions for better recommendations", {
        icon: "ℹ️",
      });
    }

    // Proceed with search if all required fields are filled
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
    sessionStorage.setItem("surgicalSearchData", JSON.stringify(searchData));
    console.log("Search Data:", searchData);
    router.push(`/surgical-care/result?location=${initialLocation}`);
  };

  const getSelectedSurgeryLabel = () => {
    if (!surgeryType) return "Select surgery type...";
    const selectedOption = surgeryOptions.find(
      (opt) => opt.value === surgeryType
    );
    return selectedOption ? selectedOption.label : "Select surgery type...";
  };

  // Date Range Validation
  const getMinStartDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const getMaxStartDate = () => {
    const today = new Date();
    const oneYearLater = new Date(today.setFullYear(today.getFullYear() + 1));
    return oneYearLater.toISOString().split("T")[0];
  };
  const getMinEndDate = (startDate: string) => {
    if (!startDate) return "";
    const start = new Date(startDate);
    return start.toISOString().split("T")[0];
  };
  const getMaxEndDate = (startDate: string) => {
    if (!startDate) return "";
    const start = new Date(startDate);
    const ninetyDaysLater = new Date(start.setDate(start.getDate() + 90));
    return ninetyDaysLater.toISOString().split("T")[0];
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Hero Section */}
        <motion.section
          variants={itemVariants}
          className="relative py-8 border-b bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100 dark:from-gray-800 dark:to-blue-900 dark:border-gray-700"
        >
          <div className="max-w-4xl mx-auto text-center px-4 mt-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {locationType === "Abroad"
                ? "Surgical Care for International Patients"
                : "Surgical Care for Indian Patients"}
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-blue-600 dark:text-blue-300">
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
              className="rounded-lg p-6 space-y-6 bg-white shadow-md dark:bg-gray-800 dark:shadow-lg"
            >
              {/* Surgery Type Selection */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Select Surgery Type
                </h3>
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setShowSurgeryDropdown(!showSurgeryDropdown)}
                    className="w-full p-3 text-left border rounded-lg transition flex items-center justify-between border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:hover:border-gray-600"
                  >
                    <span className="text-gray-700 dark:text-gray-200">
                      {getSelectedSurgeryLabel()}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        showSurgeryDropdown ? "rotate-180" : ""
                      } text-gray-500 dark:text-gray-400`}
                    />
                  </motion.button>

                  {showSurgeryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                    >
                      {surgeryOptions.map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{
                            backgroundColor:
                              mounted && isDark ? "#374151" : "#f9fafb",
                          }}
                          onClick={() => {
                            setSurgeryType(option.value);
                            setShowSurgeryDropdown(false);
                            setSpecificSurgery("");
                            setSpecificSurgeryInput("");
                          }}
                          className="w-full p-3 text-left transition first:rounded-t-lg last:rounded-b-lg text-gray-700 dark:text-gray-200"
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Specific Surgery Input */}
                {/* {surgeryType && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
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
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                      <Search className="absolute right-3 top-3 w-5 h-5 text-gray-500 dark:text-gray-400" />

                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                        >
                          {filteredSuggestions.map((suggestion, index) => (
                            <motion.button
                              key={index}
                              whileHover={{
                                backgroundColor:
                                  mounted && isDark ? "#374151" : "#f9fafb",
                              }}
                              onClick={() => handleSuggestionSelect(suggestion)}
                              className="w-full p-3 text-left transition first:rounded-t-lg last:rounded-b-lg text-gray-700 dark:text-gray-200"
                            >
                              {suggestion.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )} */}
              </motion.div>

              {/* Priority Ranking */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Rank Your Priorities
                </h3>
                <div className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
                  {priorities.map((priority, index) => (
                    <motion.div
                      key={priority.id}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-3 border-b transition bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-800 last:border-b-0"
                    >
                      <span className="text-gray-700 dark:text-gray-200">
                        {priority.icon} {priority.label}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => movePriorityUp(index)}
                          disabled={index === 0}
                          className={`p-1.5 rounded-md transition ${
                            index === 0
                              ? "text-gray-300 cursor-not-allowed dark:text-gray-500"
                              : "text-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-gray-700"
                          }`}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => movePriorityDown(index)}
                          disabled={index === priorities.length - 1}
                          className={`p-1.5 rounded-md transition ${
                            index === priorities.length - 1
                              ? "text-gray-300 cursor-not-allowed dark:text-gray-500"
                              : "text-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-gray-700"
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Preferred Date Range
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Start Date Input */}
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        const selectedDate = e.target.value;
                        // Reset end date if the new start date is after current end date
                        if (
                          endDate &&
                          new Date(selectedDate) > new Date(endDate)
                        ) {
                          setEndDate("");
                        }
                        setStartDate(selectedDate);
                      }}
                      min={getMinStartDate()}
                      max={getMaxStartDate()}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Calendar className="absolute right-3 top-3 w-4 h-4 pointer-events-none text-gray-500 dark:text-gray-400" />
                  </div>
                  {/* End Date Input */}
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={getMinEndDate(startDate)}
                      max={getMaxEndDate(startDate)}
                      disabled={!startDate}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        !startDate ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                    <Calendar className="absolute right-3 top-3 w-4 h-4 pointer-events-none text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
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
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                  <MapPin className="absolute right-3 top-3 w-4 h-4 pointer-events-none text-gray-500 dark:text-gray-400" />

                  {/* Suggestions dropdown */}
                  {status === "OK" && (
                    <div className="absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      {data.map((suggestion) => {
                        const {
                          place_id,
                          structured_formatting: { main_text, secondary_text },
                        } = suggestion;

                        return (
                          <button
                            key={place_id}
                            onClick={() => handlePlaceSelect(suggestion)}
                            className="w-full p-3 text-left transition hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                          >
                            <div className="font-medium">{main_text}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
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
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:border-gray-500"
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
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
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
