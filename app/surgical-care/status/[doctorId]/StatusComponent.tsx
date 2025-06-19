"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import ChatSupport from "@/components/support/ChatSupport";
import LoadingSpinner from "@/components/loading/LoadingComponent";

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  location: string;
}

interface TimelineSection {
  title: string;
  expanded: boolean;
  events: TimelineEvent[];
}

const StatusComponent = () => {
  const params: any = useParams();
  const bookingId = params.bookingId as string;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [status, setStatus] = useState<
    "pending" | "awaiting_confirmation" | "confirmed"
  >("pending");
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  // Booking Under review messages
  const [reviewMessages] = useState([
    "Hospital verification in progress",
    "Doctor availability check",
    "Insurance validation",
    "Expected response: 24 hours",
  ]);

  const [doctorNotes] = useState([
    "Patient is cleared for surgery",
    "Standard pre-operative procedures apply",
    "No allergies reported",
    "Blood work results are normal",
    "Fasting required 8 hours before surgery",
  ]);

  // Timeline sections state
  const [timelineSections, setTimelineSections] = useState<
    Record<string, TimelineSection>
  >({
    preOp: {
      title: "Pre-Surgery Assessment",
      expanded: false,
      events: [
        {
          id: 1,
          title: "Blood Test",
          date: "Dec 13, 2023 - 10:00 AM",
          location: "Lab Room 2",
        },
        {
          id: 2,
          title: "Anesthesia Consultation",
          date: "Dec 14, 2023 - 2:00 PM",
          location: "Room 15",
        },
        {
          id: 3,
          title: "Pre-Op Assessment",
          date: "Dec 15, 2023 - 9:00 AM",
          location: "Room 12",
        },
      ],
    },
    surgery: {
      title: "Surgery Day",
      expanded: false,
      events: [
        {
          id: 1,
          title: "Check-in & Preparation",
          date: "Dec 20, 2023 - 6:30 AM",
          location: "Reception",
        },
        {
          id: 2,
          title: "Pre-Surgery Prep",
          date: "Dec 20, 2023 - 7:30 AM",
          location: "Pre-Op Room",
        },
        {
          id: 3,
          title: "Surgery Procedure",
          date: "Dec 20, 2023 - 8:30 AM",
          location: "OT 5",
        },
      ],
    },
    postOp: {
      title: "Post-Surgery Follow-up",
      expanded: false,
      events: [
        {
          id: 1,
          title: "Recovery Check",
          date: "Dec 21, 2023 - 10:00 AM",
          location: "Recovery Room",
        },
        {
          id: 2,
          title: "First Follow-up",
          date: "Dec 27, 2023 - 2:00 PM",
          location: "Room 8",
        },
        {
          id: 3,
          title: "Final Assessment",
          date: "Jan 3, 2024 - 11:00 AM",
          location: "Room 10",
        },
      ],
    },
  });

  // Fallback data if bookingData prop is not provided
  const defaultBookingData = {
    id: bookingId || "SUR-2023-1193",
    surgeryType: "Arthroscopic Knee Surgery",
    hospital: "Memorial General Hospital",
    lastUpdated: "2023-12-10 10:30 AM",
    doctor: {
      name: "Dr. Sarah Johnson",
      specialization: "Orthopedic Surgeon",
      rating: 4.9,
      experience: "15 years",
    },
    doctorNotes:
      "Patient is cleared for surgery. Standard pre-operative procedures apply.",
  };

  const data = defaultBookingData;

  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          text: "PENDING",
          color: "text-amber-600",
          backgroundColor: "bg-amber-50",
          borderColor: "border-amber-200",
        };
      case "awaiting_confirmation":
        return {
          text: "AWAITING CONFIRMATION",
          color: "text-blue-600",
          backgroundColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "confirmed":
        return {
          text: "CONFIRMED",
          color: "text-white",
          backgroundColor: "bg-teal-500",
          borderColor: "border-teal-500",
        };
      default:
        return {
          text: "PENDING",
          color: "text-amber-600",
          backgroundColor: "bg-amber-50",
          borderColor: "border-amber-200",
        };
    }
  };

  const toggleSection = (sectionKey: string) => {
    setTimelineSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        expanded: !prev[sectionKey].expanded,
      },
    }));
  };

  // Add these states after your existing useState declarations:
  const [documents, setDocuments] = useState([]);

  // Add these functions:
  const handleFileUpload = (event: any) => {
    const files: any = Array.from(event.target.files);
    const validFiles = files.filter((file: any) => {
      const isValidType =
        file.type === "application/pdf" || file.type.startsWith("image/");
      const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB

      if (!isValidType) {
        alert(
          `${file.name} is not a valid file type. Please upload PDF or image files only.`
        );
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum file size is 2MB.`);
        return false;
      }
      return true;
    });

    setDocuments((prev) => [...prev, ...validFiles]);
  };

  const removeDocument = (index: any) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  // TODO: Implement API integration for document submission
  const handleSubmitDocuments = async () => {
    if (documents.length === 0) {
      alert("Please upload documents before submitting");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        alert("Documents uploaded successfully!");
        setDocuments([]);
        setIsUploading(false);
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload documents. Please try again.");
      setIsUploading(false);
    }
  };

  const getTimelineIcon = (sectionKey: string) => {
    switch (sectionKey) {
      case "preOp":
        return status === "confirmed" ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <Clock className="w-5 h-5 text-amber-500" />
        );
      case "surgery":
        return status === "confirmed" ? (
          <CheckCircle className="w-5 h-5 text-blue-500" />
        ) : (
          <Clock className="w-5 h-5 text-amber-500" />
        );
      case "postOp":
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

  const getTimelineColor = (sectionKey: string) => {
    switch (sectionKey) {
      case "preOp":
        return status === "confirmed" ? "border-green-500" : "border-amber-500";
      case "surgery":
        return status === "confirmed" ? "border-blue-500" : "border-amber-500";
      case "postOp":
        return "border-amber-500";
      default:
        return "border-amber-500";
    }
  };

  // TODO: Implement API integration for booking confirmation
  const handleConfirmBooking = () => {
    if (
      window.confirm("Are you sure you want to confirm this surgery booking?")
    ) {
      // TODO: API call to confirm booking
      setStatus("confirmed");
      alert("Surgery booking confirmed successfully!");
    }
  };

  // TODO: Implement API integration for rescheduling
  const handleReschedule = () => {
    if (
      window.confirm(
        "This will send a request to the hospital for rescheduling."
      )
    ) {
      // TODO: API call to request reschedule
      console.log("Reschedule requested");
    }
  };

  // TODO: Implement API integration for cancellation
  const handleCancel = () => {
    if (window.confirm("❗ Are you sure? Refunds take 3-5 business days.")) {
      // TODO: API call to cancel surgery
      console.log("Surgery cancelled");
    }
  };

  // TODO: Implement PDF download functionality
  const handleDownloadPDF = () => {
    // TODO: API call to generate and download PDF
    alert("Surgery details PDF will be downloaded");
  };

  const copyBookingId = () => {
    navigator.clipboard.writeText(data.id);
    alert(`Booking ID ${data.id} copied to clipboard`);
  };

  const statusConfig = getStatusConfig();

  if (loading) {
    return <LoadingSpinner /> ;
  }

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen mt-4 bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    {/* Header */}
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className="p-6 border-b border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
    >
      <div className="flex justify-between items-start mb-2">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">
          {data.surgeryType}
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyBookingId}
          className="flex items-center gap-1 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
        >
          <span className="text-sm text-gray-600 dark:text-gray-300">#{data.id}</span>
          <Copy className="w-4 h-4 text-gray-400 dark:text-gray-400" />
        </motion.button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{data.hospital}</p>

      <div className="flex justify-start">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.backgroundColor} ${statusConfig.color} ${statusConfig.borderColor} border`}
        >
          {statusConfig.text}
        </span>
      </div>
    </motion.div>

    <div className="max-w-4xl mx-auto">
      {/* Conditional UI based on status */}
      {status === "pending" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="m-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-400 rounded-lg"
        >
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" />
            <h3 className="text-base font-semibold text-amber-800 dark:text-amber-200">
              Booking Submitted
            </h3>
          </div>
          <p className="text-sm text-amber-700 dark:text-amber-100 leading-relaxed">
            Your surgery booking request has been submitted. We will review
            your details and get back to you within 24 hours.
          </p>
        </motion.div>
      )}

      {status === "awaiting_confirmation" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="m-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg"
        >
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-base font-semibold text-blue-800 dark:text-blue-200">
              Confirmation Required
            </h3>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-100 leading-relaxed mb-4">
            Your surgery has been scheduled. Please review the details below
            and confirm your booking.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirmBooking}
            className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Confirm Booking
          </motion.button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-6 border-b border-gray-50 dark:border-gray-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Doctor Details */}
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-slate-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center">
              <motion.div 
                whileHover={{ rotate: 5 }}
                className="w-12 h-12 bg-teal-500 dark:bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold mr-3"
              >
                {data.doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </motion.div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {data.doctor.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {data.doctor.specialization}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    ⭐ {data.doctor.rating}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {data.doctor.experience}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hospital Details */}
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-slate-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              {data.hospital}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                  123 Medical Center Drive, New York
                </span>
              </div>
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center hover:text-teal-600 dark:hover:text-teal-400"
              >
                <span className="text-sm mr-1">🗺️</span>
                <span className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                  View on Map
                </span>
              </motion.button>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">1-800-555-0123</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {status === "pending" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="m-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center mb-3">
            <Loader2 className="w-4 h-4 text-amber-600 dark:text-amber-400 mr-2 animate-spin" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Your booking is under review
            </h3>
          </div>
          <div className="max-h-32 overflow-y-auto">
            <div className="space-y-2">
              {reviewMessages.map((message, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{message}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Surgery Timeline */}
      {status === "confirmed" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 border-b border-gray-50 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Surgery Timeline
          </h2>

          {Object.entries(timelineSections).map(([key, section]) => (
            <motion.div
              key={key}
              className="mb-2"
              whileHover={{ scale: 1.01 }}
            >
              <button
                onClick={() => toggleSection(key)}
                className={`w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 border ${getTimelineColor(
                  key
                )} border-l-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
              >
                <div className="flex items-center">
                  {getTimelineIcon(key)}
                  <span className="ml-3 font-medium text-gray-900 dark:text-white">
                    {section.title}
                  </span>
                </div>
                {section.expanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                )}
              </button>

              {section.expanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  className="ml-6 pl-4 border-l-2 border-gray-100 dark:border-gray-700 mt-2"
                >
                  {section.events.map((event) => (
                    <div key={event.id} className="flex items-start mb-4">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 -ml-5"></div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{event.date}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Download PDF Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-6 border-b border-gray-50 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Surgery Details
        </h2>
        <motion.button
          whileHover={{ scale: 1.01 }}
          onClick={handleDownloadPDF}
          className="flex items-center w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl mr-3">📄</span>
          <span className="flex-1 text-sm font-medium text-gray-900 dark:text-white text-left">
            Download PDF
          </span>
          <Download className="w-4 h-4 text-teal-500 dark:text-teal-400" />
        </motion.button>
      </motion.div>

      {/* Doctor's Notes */}
      {status !== "pending" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-6 border-b border-gray-50 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Doctor's Notes
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="max-h-24 overflow-y-auto">
              <div className="space-y-2">
                {doctorNotes.map((note, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Documents - Hide for pending status */}
      {status !== "pending" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 border-b border-gray-50 dark:border-gray-700"
        >
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Upload Documents
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Upload medical reports, previous scans, or referral letters (PDF
              or Images only, max 2MB each)
            </p>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
            >
              <input
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-medium text-blue-600 dark:text-blue-400">
                  Click to upload documents
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  or drag and drop files here
                </span>
              </label>
            </motion.div>

            {documents.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 space-y-3"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Uploaded Documents:
                </h3>
                {documents.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">{doc.name}</span>
                    <button
                      onClick={() => removeDocument(index)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {documents.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitDocuments}
                disabled={isUploading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                {isUploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading... {Math.round(uploadProgress)}%</span>
                  </div>
                ) : (
                  "Submit Documents"
                )}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6"
      >
        {status === "confirmed" && (
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReschedule}
              className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              Reschedule Surgery
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCancel}
              className="w-full border border-red-500 dark:border-red-400 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Cancel Surgery
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsChatOpen(true)}
              className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              🎧 Connect with Support
            </motion.button>
          </div>
        )}

        {(status === "pending" || status === "awaiting_confirmation") && (
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCancel}
              className="w-full border border-red-500 dark:border-red-400 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Cancel Request
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsChatOpen(true)}
              className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              🎧 Connect with Support
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Cancellation Notice - Show only for confirmed status */}
      {status === "confirmed" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="m-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
        >
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            Please note: Cancellation within 48 hours of surgery may incur
            additional charges.
          </p>
        </motion.div>
      )}

      {/* Demo Status Toggle Buttons - Remove in production */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="m-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Demo Status Toggle:
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setStatus("pending")}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors ${
              status === "pending"
                ? "bg-teal-500 text-white"
                : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatus("awaiting_confirmation")}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors ${
              status === "awaiting_confirmation"
                ? "bg-teal-500 text-white"
                : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
          >
            Awaiting
          </button>
          <button
            onClick={() => setStatus("confirmed")}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors ${
              status === "confirmed"
                ? "bg-teal-500 text-white"
                : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
          >
            Confirmed
          </button>
        </div>
      </motion.div>

      {/* Chat Support Modal */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md overflow-hidden shadow-xl"
          > 
            <ChatSupport
                isVisible={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                bookingId="12345"
                title="Support Chat"
                initialMessage="Hello! How can we help you today?"
              />
          </motion.div>
        </motion.div>
      )}
    </div>
  </motion.div>
);
};

export default StatusComponent;
