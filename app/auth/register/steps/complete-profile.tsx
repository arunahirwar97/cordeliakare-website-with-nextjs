"use client";

import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import LoadingSpinner from "@/components/loading/LoadingComponent";
import toast from "react-hot-toast";

interface Salutation {
  name: string;
  id: number;
}

interface CompleteProfileProps {
  phone: string;
  isDark: boolean;
}

// API Configuration - Update this with your actual API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CompleteProfile({
  phone,
  isDark,
}: CompleteProfileProps) {
  const { isLoadingSalutations, salutations, setUser, setToken } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    register_type: "patient",
    image: null as File | null,
    salutation: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    email: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    referredBy: "",
    address: "",
    phone: phone,
    area: "",
    locality: "",
    state: "",
    country: "India",
    pincode: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    aadhaarNumber: "",
    panNumber: "",
    passportNumber: "",
    registrationType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // Convert gender to numeric value as required by API
  const getGenderValue = (gender: string): number | null => {
    switch (gender) {
      case "Male":
        return 0;
      case "Female":
        return 1;
      case "Other":
        return 2;
      default:
        return null;
    }
  };

  // Convert salutation to ID as required by API
  const getSalutationId = (salutationName: string): string => {
    const salutation = salutations.find(
      (s: any) =>
        s.name.toLowerCase().replace(".", "") === salutationName.toLowerCase()
    );
    return salutation ? salutation.id.toString() : "";
  };

  const registerApi = async () => {
    const data = new FormData();

    // Your original data mapping (unchanged)
    data.append("register_type", "patient");
    data.append("first_name", formData.firstName);
    data.append("last_name", formData.lastName);
    data.append("email", formData.email);
    data.append("father_name", formData.fatherName);
    data.append("dob", formData.dob);
    data.append("phone", phone);
    data.append("emergencycontact", formData.emergencyContactPhone);
    data.append("emergencycontact_relation", formData.emergencyContactName);
    const genderValue = getGenderValue(formData.gender);
    if (genderValue !== null) {
      data.append("gender", genderValue.toString());
    }
    data.append("emergency_prefix_code", "91");
    data.append("prefix_code", "91");
    data.append("address1", formData.address);
    data.append("address2", formData.area);
    data.append("zip", formData.pincode);
    data.append("city", formData.locality);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("referrel", formData.referredBy);
    data.append("blood_group", formData.bloodGroup);
    data.append("salutation_id", getSalutationId(formData.salutation));
    data.append("registration_type", formData.registrationType || "");
    data.append("aadhar_number", formData.aadhaarNumber);
    data.append("pan_number", formData.panNumber);
    data.append("passport_number", formData.passportNumber);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/confirmregistration`,
        data
      );
      console.log("Registration response==>", response);
      const result = response.data;

      if (response.status === 201) {
        setUser(response?.data?.data.user);
        setToken(response?.data?.data.token);
        localStorage.setItem("token", response?.data?.data.token);
        localStorage.setItem("user", "patient");
        toast.success("Account Created, Hello ", response?.data?.data.user.first_name)
        // console.log("Registration successful:", response);
        router.push("/profile");
        setLoading(false);
      }

      if (response.status !== 200 && response.status !== 201) {
        setLoading(false);
        toast.error("Registration failed")
        throw new Error(result.message || "Registration failed");
      }

      return result;
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error.message)
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.dob) {
      alert("Please fill in all required fields");
      return;
    }
    await registerApi();
  };

  const inputClasses = `w-full px-4 py-2 rounded-lg border ${
    isDark
      ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
      : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
  } transition-colors`;

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
    { id: "documents", title: "Documents" },
  ];

  return loading ? (
    <LoadingSpinner />
  ) : (
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
            Registered mobile: +91 {phone}
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
                    {isLoadingSalutations ? (
                      <div
                        className={`${inputClasses} flex items-center justify-center h-10`}
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </div>
                    ) : (
                      <select
                        id="salutation"
                        name="salutation"
                        value={formData.salutation}
                        onChange={handleChange}
                        className={inputClasses}
                        disabled={isLoadingSalutations}
                      >
                        <option value="">Select</option>
                        {salutations.map((salutation: any) => (
                          <option key={salutation.id} value={salutation.id}>
                            {salutation.name}
                          </option>
                        ))}
                      </select>
                    )}
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
                    <label htmlFor="fatherName" className={labelClasses}>
                      Father's Name
                    </label>
                    <input
                      type="text"
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* Address Information */}
            <AnimatePresence mode="wait">
              {activeSection === "address" && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="md:col-span-2">
                    <label htmlFor="address" className={labelClasses}>
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Enter your primary address"
                    />
                  </div>

                  <div>
                    <label htmlFor="area" className={labelClasses}>
                      Area/Street (Address Line 2)
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

                  <div>
                    <label htmlFor="locality" className={labelClasses}>
                      City/Locality
                    </label>
                    <input
                      type="text"
                      id="locality"
                      name="locality"
                      value={formData.locality}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className={labelClasses}>
                      State
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

                  <div>
                    <label htmlFor="country" className={labelClasses}>
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={inputClasses}
                      disabled
                    />
                  </div>

                  <div>
                    <label htmlFor="pincode" className={labelClasses}>
                      Pincode/ZIP
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={inputClasses}
                      maxLength={6}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                      Emergency Contact Name
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
                      placeholder="e.g., Father, Mother, Spouse"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="emergencyContactPhone"
                      className={labelClasses}
                    >
                      Emergency Contact Phone
                    </label>
                    <div className="flex">
                      <span
                        className={`inline-flex items-center px-3 rounded-l-md border border-r-0 ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-gray-300"
                            : "bg-gray-100 border-gray-300 text-gray-500"
                        }`}
                      >
                        +91
                      </span>
                      <input
                        type="tel"
                        id="emergencyContactPhone"
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border ${
                          isDark
                            ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                            : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                        }`}
                        placeholder="9876543210"
                        maxLength={10}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Documents */}
            <AnimatePresence mode="wait">
              {activeSection === "documents" && (
                <motion.div
                  key="documents"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label htmlFor="registrationType" className={labelClasses}>
                      Registration Document Type
                    </label>
                    <select
                      id="registrationType"
                      name="registrationType"
                      value={formData.registrationType}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select Document Type</option>
                      <option value="aadhaar">Aadhaar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="passport">Passport</option>
                    </select>
                  </div>

                  <div></div>

                  <div>
                    <label htmlFor="aadhaarNumber" className={labelClasses}>
                      Aadhaar Number
                    </label>
                    <input
                      type="text"
                      id="aadhaarNumber"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={handleChange}
                      className={inputClasses}
                      maxLength={12}
                      placeholder="Enter 12-digit Aadhaar number"
                    />
                  </div>

                  <div>
                    <label htmlFor="panNumber" className={labelClasses}>
                      PAN Number
                    </label>
                    <input
                      type="text"
                      id="panNumber"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      className={inputClasses}
                      maxLength={10}
                      placeholder="Enter PAN number"
                      style={{ textTransform: "uppercase" }}
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
                      placeholder="Enter passport number"
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

                {activeSection !== "documents" ? (
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
