"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/loading/LoadingComponent";

interface CompleteProfileProps {
  email: string;
  isDark: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CompleteProfile({
  email,
  isDark,
}: CompleteProfileProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const searchParams: any = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const {
    isLoadingSalutations,
    salutations,
    setUser,
    setToken,
    clearOtpState,
  } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    register_type: "patient",
    image: null as File | null,
    salutation: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    email: email,
    gender: "",
    dob: "",
    bloodGroup: "",
    referredBy: "",
    address: "",
    phone: "",
    prefix_code: "",
    area: "",
    locality: "",
    state: "",
    country: "",
    pincode: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    emergencyContactCountryCode: "",
    aadhaarNumber: "",
    panNumber: "",
    passportNumber: "",
    registrationType: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const requiredFields = [
    "salutation",
    "firstName",
    "lastName",
    "gender",
    "dob",
    "country",
    "state",
    "locality",
    "pincode",
    "bloodGroup",
  ];

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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

  const getSalutationId = (salutationName: string): string => {
    const salutation = salutations.find(
      (s: any) =>
        s.name.toLowerCase().replace(".", "") === salutationName.toLowerCase()
    );
    return salutation ? salutation.id.toString() : "";
  };

  const validateForm = () => {
    const errors: string[] = [];

    const updatedRequiredFields = [
      "salutation",
      "firstName",
      "lastName",
      "gender",
      "dob",
      "country",
      "state",
      "locality",
      "pincode",
      "bloodGroup",
    ];

    updatedRequiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        const fieldName = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        if (field === "locality") {
          errors.push(`City is required`);
        } else {
          errors.push(`${fieldName} is required`);
        }
      }
    });

    if (formData.phone && !/^\d{10,12}$/.test(formData.phone)) {
      errors.push("Phone number must be 10-12 digits");
    }

    if (
      formData.emergencyContactPhone &&
      !/^\d{10,12}$/.test(formData.emergencyContactPhone)
    ) {
      errors.push("Emergency contact phone must be 10-12 digits");
    }

    if (formData.dob && !/^\d{4}-\d{2}-\d{2}$/.test(formData.dob)) {
      errors.push("Invalid date format");
    }

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, image: null }));
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handlePostalCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, pincode: value }));

    if (value.length >= 3 && formData.country) {
      try {
        const countryCode = getCountryCode(formData.country);
        if (countryCode) {
          const response = await fetch(
            `https://secure.geonames.org/postalCodeSearchJSON?postalcode_startsWith=${value}&country=${countryCode}&maxRows=1&username=YOUR_GEONAMES_USERNAME`
          );
          const data = await response.json();
          if (data.postalCodes?.[0]) {
            const { placeName, adminName1, adminName2 } = data.postalCodes[0];
            setFormData((prev) => ({
              ...prev,
              locality: placeName || prev.locality,
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

  const getCountryCode = (countryName: string) => {
    const countryMap: Record<string, string> = {
      nigeria: "NG",
      "south africa": "ZA",
      kenya: "KE",
      ghana: "GH",
      ethiopia: "ET",
      india: "IN",
      pakistan: "PK",
    };
    return countryMap[countryName.toLowerCase()] || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }
    setIsSubmitting(true);
    const data = new FormData();
    const emergencyPhone =
      "+" +
      formData.emergencyContactCountryCode +
      "-" +
      formData.emergencyContactPhone;

    data.append("register_type", "patient");
    data.append("first_name", formData.firstName);
    data.append("last_name", formData.lastName);
    data.append("email", email);
    data.append("father_name", formData.fatherName);
    data.append("dob", formData.dob);
    data.append("phone", formData.phone);
    data.append("emergencycontact", emergencyPhone);
    data.append("emergencycontact_relation", formData.emergencyContactRelation); // Corrected this line
    const genderValue = getGenderValue(formData.gender);
    if (genderValue !== null) {
      data.append("gender", genderValue.toString());
    }
    data.append("emergency_prefix_code", "");
    data.append("prefix_code", formData.prefix_code);
    data.append("address1", formData.address);
    data.append("address2", formData.area);
    data.append("zip", formData.pincode);
    data.append("city", formData.locality);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("referrel", formData.referredBy);
    data.append("blood_group", formData.bloodGroup);
    data.append("salutation_id", getSalutationId(formData.salutation));
    data.append("registration_type", "3");
    data.append("aadhar_number", formData.aadhaarNumber);
    data.append("pan_number", formData.panNumber);
    data.append(
      "passport_number",
      formData.passportNumber ? formData.passportNumber : "0"
    );

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/confirmForeignRegistration`,
        data
      );
      const result = response.data;

      if (response.status === 201) {
        setIsSubmitting(false);
        setUser(response?.data?.data.user);
        setToken(response?.data?.data.token);
        clearOtpState();
        localStorage.setItem("token", response?.data?.data.token);
        localStorage.setItem("user", "abroad_patient");
        toast.success(
          "Account Created, Hello ",
          response?.data?.data.user.first_name
        );
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push("/profile");
        }
        setLoading(false);
      }

      if (response.status !== 200 && response.status !== 201) {
        setLoading(false);
        toast.error("Registration failed");
        throw new Error(result.message || "Registration failed");
      }

      return result;
    } catch (error: any) {
      setIsSubmitting(false);
      console.error("Registration failed:", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const maxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18)
  )
    .toISOString()
    .split("T")[0];

  const inputClasses = `w-full px-2 sm:px-4 py-1 sm:py-2 rounded-lg border ${
    isDark
      ? "bg-gray-800 border-gray-500 text-white focus:ring-purple-500 focus:border-purple-500"
      : "bg-white border-gray-500 focus:ring-purple-500 focus:border-purple-500"
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
    { id: "documents", title: "Documents" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formContainerRef.current) {
        formContainerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <div ref={formContainerRef} className="max-w-6xl mx-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-xl shadow-lg overflow-hidden ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
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

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
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
                  {/* UPDATED: Profile Picture Input with Preview */}
                  <div className="md:col-span-2">
                    <label className={labelClasses}>
                      Profile Picture (Optional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        style={{ display: imagePreview ? "none" : "block" }}
                      />
                    </div>
                    {imagePreview && (
                      <div className="mt-4 flex items-center gap-4">
                        <img
                          src={imagePreview}
                          alt="Profile Preview"
                          className="h-20 w-20 rounded-full object-cover border-2 border-purple-300"
                        />
                        <div className="text-sm">
                          <p
                            className={`font-medium ${
                              isDark ? "text-gray-300" : "text-gray-800"
                            }`}
                          >
                            {formData.image?.name}
                          </p>
                          <button
                            type="button"
                            onClick={removeImage}
                            className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* End of updated profile picture section */}

                  {/* ... other personal info fields ... */}
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
                      required
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
                      required
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
                      maxLength={40}
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
                      maxLength={35}
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
                      max={maxDate}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className={labelClasses}>
                      Phone Number*
                    </label>
                    <div className="flex gap-2">
                      <div className="relative w-24">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span
                            className={
                              isDark ? "text-gray-400" : "text-gray-500"
                            }
                          >
                            +
                          </span>
                        </div>
                        <input
                          type="text"
                          name="prefix_code"
                          value={formData.prefix_code.replace("+", "")}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 3);
                            setFormData((prev) => ({
                              ...prev,
                              prefix_code: value ? `+${value}` : "",
                            }));
                          }}
                          className={`w-full pl-8 py-2 rounded-md ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-100 border-gray-300 text-gray-700"
                          }`}
                          placeholder="1"
                        />
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const sanitizedValue = e.target.value.replace(
                            /\D/g,
                            ""
                          );
                          setFormData((prev) => ({
                            ...prev,
                            phone: sanitizedValue,
                          }));
                        }}
                        className={`flex-1 ${
                          isDark
                            ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                            : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                        } rounded-md px-3 py-2`}
                        placeholder="Phone number"
                        required
                        maxLength={12}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                    placeholder="e.g., Nigeria, India"
                    required
                    maxLength={20}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="pincode" className={labelClasses}>
                    Postal Code*
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handlePostalCodeChange}
                    className={inputClasses}
                    placeholder="Enter to auto-fill address"
                    maxLength={10}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="locality" className={labelClasses}>
                    City*
                  </label>
                  <input
                    type="text"
                    id="locality"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    className={inputClasses}
                    maxLength={30}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className={labelClasses}>
                    State/Province*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={inputClasses}
                    maxLength={30}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className={labelClasses}>
                    Address Line
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClasses}
                    maxLength={50}
                  />
                </div>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {activeSection === "emergency" && (
                <motion.div
                  key="emergency"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                  <div className="md:col-span-2 lg:col-span-1">
                    <label
                      htmlFor="emergencyContactPhone"
                      className={labelClasses}
                    >
                      Phone Number
                    </label>
                    <div className="flex">
                      <div className="relative w-24">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span
                            className={
                              isDark ? "text-gray-400" : "text-gray-500"
                            }
                          >
                            +
                          </span>
                        </div>
                        <input
                          type="text"
                          name="emergencyContactCountryCode"
                          value={formData.emergencyContactCountryCode.replace(
                            "+",
                            ""
                          )}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 3);
                            setFormData((prev) => ({
                              ...prev,
                              emergencyContactCountryCode: value
                                ? `+${value}`
                                : "",
                            }));
                          }}
                          className={`w-full pl-8 py-2 rounded-md ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-100 border-gray-300 text-gray-700"
                          }`}
                          placeholder="1"
                        />
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        id="emergencyContactPhone"
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => {
                          const sanitizedValue = e.target.value.replace(
                            /\D/g,
                            ""
                          );
                          setFormData((prev) => ({
                            ...prev,
                            emergencyContactPhone: sanitizedValue,
                          }));
                        }}
                        className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border-l-0 ${
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
                      <option value="passport">Passport</option>
                    </select>
                  </div>
                  <div></div>
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
                      maxLength={20}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                {formSections.map((section) => (
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
                    onClick={(e) => {
                      e.preventDefault();
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
