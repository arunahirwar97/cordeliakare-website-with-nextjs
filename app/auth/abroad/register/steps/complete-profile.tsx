"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface CompleteProfileProps {
  email: string;
  isDark: boolean;
}

export default function CompleteProfile({
  email,
  isDark,
}: CompleteProfileProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    profilePic: null,
    salutation: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    nationality: "",
    passportNumber: "",
    phoneNumber: "",
    address: "",
    area: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    phoneCountryCode: "+1",
    emergencyContactCountryCode: "+1",
    bloodGroup: "",
    referredBy: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, profilePic: e.target.files[0] }));
    }
  };

  const handlePostalCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, postalCode: value }));

    // Only fetch if postal code has at least 3 characters AND country is entered
    if (value.length >= 3 && formData.country.trim() !== "") {
      try {
        // Convert country name to country code (e.g., "Nigeria" → "NG")
        const countryCode = getCountryCode(formData.country);

        if (countryCode) {
          const response = await fetch(
            `http://api.geonames.org/postalCodeSearchJSON?postalcode=${value}&country=${countryCode}&maxRows=1&username=YOUR_GEONAMES_USERNAME`
          );
          const data = await response.json();

          if (data.postalCodes?.[0]) {
            const { placeName, adminName1, adminName2 } = data.postalCodes[0];
            setFormData((prev) => ({
              ...prev,
              city: placeName || prev.city,
              state: adminName1 || prev.state,
              area: adminName2 || prev.area,
            }));
          }
        }
      } catch (error) {
        console.error("GeoNames API error:", error);
      }
    }
  };

  // Helper: Convert country name to country code
  const getCountryCode = (countryName: string) => {
    const countryMap: Record<string, string> = {
      nigeria: "NG",
      "south africa": "ZA",
      kenya: "KE",
      ghana: "GH",
      ethiopia: "ET",
      india: "IN",
      pakistan: "PK",
      // Add more mappings as needed
    };
    return countryMap[countryName.toLowerCase()] || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store user data
      localStorage.setItem(
        "internationalPatient",
        JSON.stringify({
          email,
          ...formData,
          registrationComplete: true,
        })
      );

      router.push("/surgical-care/search?location=Abroad");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `w-full px-2 sm:px-4 py-1 sm:py-2 rounded-lg border ${
    isDark
      ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
      : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
  } transition-colors text-sm sm:text-base`;

  const labelClasses = `block text-sm font-medium mb-1 ${
    isDark ? "text-gray-300" : "text-gray-700"
  }`;

  const sectionButtonClasses = (section: string) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      activeSection === section
        ? isDark
          ? "bg-purple-700 text-white"
          : "bg-purple-600 text-white"
        : isDark
        ? "text-gray-300 hover:bg-gray-700"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const formSections = [
    { id: "personal", title: "Personal Info" },
    { id: "address", title: "Address" },
    { id: "emergency", title: "Emergency Contact" },
    { id: "health", title: "Health Info" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-xl shadow-lg overflow-hidden ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Form Header */}
        <div
          className={`p-6 border-b ${
            isDark
              ? "border-gray-700 bg-gray-900"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <h2
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Complete Your Profile
          </h2>
          <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Registered email: {email}
          </p>
        </div>

        {/* Form Navigation */}
        <div
          className={`p-4 border-b ${
            isDark
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-gray-100"
          }`}
        >
          <nav className="flex space-x-2 overflow-x-auto pb-1">
            {formSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={sectionButtonClasses(section.id)}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <AnimatePresence mode="wait">
              {activeSection === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="md:col-span-2">
                    <label className={labelClasses}>
                      Profile Picture (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="salutation" className={labelClasses}>
                      Salutation
                    </label>
                    <select
                      id="salutation"
                      name="salutation"
                      value={formData.salutation}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gender" className={labelClasses}>
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="firstName" className={labelClasses}>
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className={labelClasses}>
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="dob" className={labelClasses}>
                      Date of Birth*
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="nationality" className={labelClasses}>
                      Nationality
                    </label>
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="passportNumber" className={labelClasses}>
                      Passport Number
                    </label>
                    <input
                      type="text"
                      id="passportNumber"
                      name="passportNumber"
                      value={formData.passportNumber}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className={labelClasses}>
                      Phone Number
                    </label>
                    <div className="flex">
                      <select
                        name="phoneCountryCode"
                        value={formData.phoneCountryCode}
                        onChange={handleChange}
                        className={`w-16 sm:w-24 px-1 sm:px-2 text-xs sm:text-sm rounded-l-md border-r-0 ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-700"
                        }`}
                      >
                        <option value="+1">+1 (US)</option>
                        <option value="+91">+91 (IN)</option>
                        <option value="+44">+44 (UK)</option>
                        {/* Add more country codes as needed */}
                      </select>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Address Information */}
            {activeSection === "address" && (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Country Input (Text Field) */}
                <div className="md:col-span-2">
                  <label htmlFor="country" className={labelClasses}>
                    Country*
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g., Nigeria, South Africa"
                    required
                  />
                </div>

                {/* Postal Code Input */}
                <div className="md:col-span-2">
                  <label htmlFor="postalCode" className={labelClasses}>
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handlePostalCodeChange}
                    className={inputClasses}
                    placeholder="Enter to auto-fill address"
                  />
                  <p
                    className={`text-xs mt-1 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Start typing your postal code after entering country
                  </p>
                </div>

                {/* Auto-filled Address Fields */}
                <div>
                  <label htmlFor="city" className={labelClasses}>
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="state" className={labelClasses}>
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="area" className={labelClasses}>
                    Area/Street
                  </label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </motion.div>
            )}

            {/* Emergency Contact */}
            <AnimatePresence mode="wait">
              {activeSection === "emergency" && (
                <motion.div
                  key="emergency"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label
                      htmlFor="emergencyContactName"
                      className={labelClasses}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="emergencyContactName"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="emergencyContactRelation"
                      className={labelClasses}
                    >
                      Relation
                    </label>
                    <input
                      type="text"
                      id="emergencyContactRelation"
                      name="emergencyContactRelation"
                      value={formData.emergencyContactRelation}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="emergencyContactPhone"
                      className={labelClasses}
                    >
                      Phone Number
                    </label>
                    <div className="flex">
                      <select
                        name="emergencyContactCountryCode"
                        value={formData.emergencyContactCountryCode}
                        onChange={handleChange}
                        className={`w-24 px-2 rounded-l-md border-r-0 ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-700"
                        }`}
                      >
                        <option value="+1">+1 (US)</option>
                        <option value="+91">+91 (IN)</option>
                        <option value="+44">+44 (UK)</option>
                        {/* Add more country codes as needed */}
                      </select>
                      <input
                        type="tel"
                        id="emergencyContactPhone"
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border-l-0 ${
                          isDark
                            ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                            : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                        }`}
                        placeholder="[number]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Health Information */}
            <AnimatePresence mode="wait">
              {activeSection === "health" && (
                <motion.div
                  key="health"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label htmlFor="bloodGroup" className={labelClasses}>
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="referredBy" className={labelClasses}>
                      Referred By (Optional)
                    </label>
                    <input
                      type="text"
                      id="referredBy"
                      name="referredBy"
                      value={formData.referredBy}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="insuranceProvider" className={labelClasses}>
                      Health Insurance Provider
                    </label>
                    <input
                      type="text"
                      id="insuranceProvider"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="insurancePolicyNumber"
                      className={labelClasses}
                    >
                      Policy Number
                    </label>
                    <input
                      type="text"
                      id="insurancePolicyNumber"
                      name="insurancePolicyNumber"
                      value={formData.insurancePolicyNumber}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                {formSections.map((section, index) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`h-2 w-6 rounded-full transition-colors ${
                      activeSection === section.id
                        ? "bg-purple-600"
                        : isDark
                        ? "bg-gray-600"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to ${section.title}`}
                  />
                ))}
              </div>

              <div className="flex space-x-3">
                {activeSection !== "personal" && (
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = formSections.findIndex(
                        (s) => s.id === activeSection
                      );
                      setActiveSection(formSections[currentIndex - 1].id);
                    }}
                    className={`px-4 py-2 rounded-md ${
                      isDark
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    } transition-colors`}
                  >
                    Back
                  </button>
                )}

                {activeSection !== "health" ? (
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = formSections.findIndex(
                        (s) => s.id === activeSection
                      );
                      setActiveSection(formSections[currentIndex + 1].id);
                    }}
                    className={`px-6 py-2 rounded-md font-medium ${
                      isDark
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    } transition-colors`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-md font-medium ${
                      isSubmitting
                        ? isDark
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : isDark
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    } transition-colors`}
                  >
                    {isSubmitting ? "Submitting..." : "Complete Registration"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
