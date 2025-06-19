"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  Play,
  HelpCircle,
  Upload,
  X,
  Star,
  MapPin,
  Clock,
  Languages,
  GraduationCap,
  ThumbsUp,
  Camera,
  Monitor,
  Building2,
  ChevronDown,
  Shield,
} from "lucide-react";
import LoadingSpinner from "@/components/loading/LoadingComponent";
import {motion} from 'framer-motion'

interface FacilityImage {
  id: string;
  title: string;
  image: string;
  badge?: string;
}

interface DoctorData {
  id: string;
  name: string;
  hospital: string;
  rating: number;
  reviews: number;
  specialty: string;
  distance: number;
  price: number;
  availability: string;
  experience: number;
  languages: string[];
  bio: string;
  successRate: number;
}

interface BookingData {
  bookingType: "virtual" | "surgery" | null;
  query: string;
  documents: Array<{
    name: string;
    type: string;
    size: number;
    file?: File;
  }>;
}

const BookingComponent = () => {
  const params:any = useParams();
  const doctorId = params.id as string;
  const router = useRouter();
  const [doctor, setDoctor] = useState<DoctorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [bookingType, setBookingType] = useState<"virtual" | "surgery" | null>(
    null
  );
  const [bookingData, setBookingData] = useState<BookingData>({
    bookingType: null,
    query: "",
    documents: [],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Dummy data - replace with API call
  const dummyDoctor: DoctorData = {
    id: doctorId,
    name: "Dr. Sarah Wilson",
    hospital: "Advanced Medical Center",
    rating: 4.9,
    reviews: 324,
    specialty: "Orthopedic Surgeon",
    distance: 2.3,
    price: 5000,
    availability: "Available Today",
    experience: 15,
    languages: ["English", "Hindi", "Bengali"],
    bio: "Dr. Wilson specializes in robotic-assisted joint replacements with a 98% success rate. Her minimally invasive techniques reduce recovery time by 40% compared to traditional methods.",
    successRate: 98,
  };

  const facilityImages: FacilityImage[] = [
    {
      id: "1",
      title: "Operating Theater",
      image:
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=250&fit=crop",
      badge: "3D Tour Available",
    },
    {
      id: "2",
      title: "Recovery Suite",
      image:
        "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccf?w=400&h=250&fit=crop",
      badge: "Private Room",
    },
    {
      id: "3",
      title: "Pharmacy/Lab",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      badge: "On-site Medications",
    },
  ];

  // API call placeholder - replace with actual API
  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setDoctor(dummyDoctor);
        setLoading(false);
      }, 1000);

      // TODO: Replace with actual API call
      // const response = await fetch(`/api/doctors/${doctorId}`);
      // const doctorData = await response.json();
      // setDoctor(doctorData);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();
    console.log('doctorid===>' , doctorId)
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        file,
      }));

      setBookingData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...newFiles],
      }));
      setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeDocument = (index: number) => {
    setBookingData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBookingConfirmation = () => {
    if (!bookingType || !doctor) return;

    const finalBookingData = {
      doctorId: doctor.id,
      bookingType,
      query: bookingData.query,
      documents: bookingData.documents,
    };

    console.log("Booking Data:", finalBookingData);

    // TODO: API call to confirm booking
    // await bookAppointment(finalBookingData);

    router.push("/surgical-care/status/1");
  };

  const handleVirtualConsult = () => {
    setBookingType("virtual");
    setBookingData((prev) => ({ ...prev, bookingType: "virtual" }));
  };

  const handleSurgeryBooking = () => {
    setBookingType("surgery");
    setBookingData((prev) => ({ ...prev, bookingType: "surgery" }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
            ? "fill-yellow-200 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return <LoadingSpinner /> ;
  }

  if (!doctor) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Doctor not found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The requested doctor profile could not be loaded.
          </p>
        </motion.div>
      </motion.div>
    );
  }

 return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen mt-6 bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    {/* Header */}
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className="bg-blue-600 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="flex items-center space-x-2 hover:bg-blue-700 rounded-lg p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>

          <div className="flex-1 ml-4">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold"
            >
              {doctor.name}
            </motion.h1>
            <p className="text-blue-100 text-sm">{doctor.specialty}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                {renderStars(doctor.rating)}
                <span className="text-sm text-blue-100">
                  ({doctor.reviews})
                </span>
              </div>
            </div>
            <p className="text-blue-100 text-xs mt-1">{doctor.hospital}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Heart
              className={`w-6 h-6 ${
                isSaved ? "fill-red-400 text-red-400" : "text-white"
              }`}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="max-w-7xl mx-auto px-4 py-8 space-y-8"
    >
      {/* Doctor Profile Section */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <motion.div 
            whileHover={{ rotate: 2 }}
            className="flex-shrink-0"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Board-Certified {doctor.specialty}
                </span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {doctor.experience}+ years experience
                </span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {doctor.distance} km away
                </span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Speaks {doctor.languages.join(", ")}
                </span>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
            >
              View Full Credentials
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Bio Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {doctor.bio}
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          <Play className="w-4 h-4" />
          <span>Watch 2-min Patient Story</span>
        </motion.button>
      </motion.div>

      {/* Facility Gallery */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Our Facilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilityImages.map((facility) => (
            <motion.div
              key={facility.id}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="aspect-video relative">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">
                    {facility.title}
                  </h3>
                  {facility.badge && (
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mt-2"
                    >
                      {facility.badge}
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Query Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Have Questions?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get personalized answers about your procedure, recovery time, or any
          concerns you may have with {doctor.name}.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowQuestionModal(true)}
          className="flex items-center space-x-2 bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors font-medium"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Ask a Question</span>
        </motion.button>
      </motion.div>

      {/* Document Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Upload Documents
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Upload medical reports, previous scans, or referral letters (PDF or
          Images only, max 2MB each)
        </p>

        <motion.div
          whileHover={{ scale: 1.005 }}
          className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
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

        {bookingData.documents.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 space-y-3"
          >
            <h3 className="font-medium text-gray-900 dark:text-white">Uploaded Documents:</h3>
            {bookingData.documents.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">{doc.name}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeDocument(index)}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Appointment Scheduling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Schedule Appointment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleVirtualConsult}
            className={`p-6 rounded-xl border-2 transition-all ${
              bookingType === "virtual"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
            }`}
          >
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Monitor className="w-6 h-6" />
              <span className="font-semibold">Virtual Consult</span>
            </div>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">Free 15-min consultation</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSurgeryBooking}
            className={`p-6 rounded-xl border-2 transition-all ${
              bookingType === "surgery"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
            }`}
          >
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Building2 className="w-6 h-6" />
              <span className="font-semibold">Surgery Booking</span>
            </div>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">Schedule an enquiry</p>
          </motion.button>
        </div>
      </motion.div>

      {/* Patient Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Patient Reviews
        </h2>

        <div className="space-y-6">
          <motion.div 
            whileHover={{ y: -2 }}
            className="border-b border-gray-200 dark:border-gray-700 pb-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                  alt="Reviewer"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">John D.</h4>
                <div className="flex items-center space-x-1">
                  {renderStars(5)}
                </div>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              "{doctor.name}'s treatment let me get back to my normal
              activities within 8 weeks!"
            </p>

            <div className="flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>24 Helpful</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Camera className="w-4 h-4" />
                <span>See Recovery Photos</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            <ChevronDown className="w-4 h-4" />
            <span>Load More Reviews (12)</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center"
      >
        <motion.button
          whileHover={bookingType ? { scale: 1.02 } : {}}
          whileTap={bookingType ? { scale: 0.98 } : {}}
          onClick={handleBookingConfirmation}
          disabled={!bookingType}
          className={`w-full py-4 px-8 rounded-xl text-white font-bold text-lg transition-colors ${
            bookingType
              ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
          }`}
        >
          {bookingType === "virtual"
            ? "BOOK VIRTUAL CONSULTATION"
            : bookingType === "surgery"
            ? "SCHEDULE SURGERY ENQUIRY"
            : "SELECT BOOKING TYPE"}
        </motion.button>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <Shield className="w-4 h-4" />
          <span>Secure booking. Cancel anytime up to 48hrs prior.</span>
        </motion.div>
      </motion.div>
    </motion.div>

    {/* Question Modal */}
    {showQuestionModal && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Ask a Question
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQuestionModal(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="What would you like to ask the doctor?"
            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />

          <div className="flex space-x-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowQuestionModal(false)}
              className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                console.log("Question submitted:", questionText);
                setShowQuestionModal(false);
                setQuestionText("");
              }}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800"
            >
              Submit
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </motion.div>
);
};

export default BookingComponent;
