"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
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
  ChevronRight,
  Users,
  Scissors,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clipboard,
  Package,
} from "lucide-react";
import LoadingSpinner from "@/components/loading/LoadingComponent";
import { motion } from "framer-motion";
import { PackageDetailsSection } from "./PackageDetailsSection";
import {
  BookingData,
  DoctorData,
  HospitalData,
  facilityImages,
  dummyHospital,
  PackageDetails,
} from "./Data";
import { useMVT } from "@/context/MVT_Context";
import toast from "react-hot-toast";
import DoctorCard from "./DoctorCard";
import ContactButton from "@/components/ContactButton";
import HospitalGallery from "./HospitalGallery";
import { useUser } from "@/context/UserContext";
import NotesModal from "./NotesModal";
import SuccessModal from "./SuccessModal";
import BookingLoadingModal from "./BookingLoadingModal";

const BookingComponent = () => {
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [pendingBookingType, setPendingBookingType] = useState<
    "virtual" | "surgery" | null
  >(null);
  const [sessionData, setSessionData] = useState({});
  const { getUserData, userData } = useUser();
  const [expandedDepartments, setExpandedDepartments] = useState<
    Record<string, boolean>
  >({});
  const {
    getHospitalByPackage,
    getPackageAmount,
    getDoctorsByTenant,
    getGalleryImages,
    galleryImages,
    notifyBooking,
    loading: apiLoading,
  } = useMVT();
  const params: any = useParams();
  const doctorId = params.doctorId as string;
  const router = useRouter();
  const [hospital, setHospital] = useState<HospitalData | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [packageLoading, setPackageLoading] = useState(false);
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
  const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);
  const [doctorsData, setDoctorsData] = useState<Record<string, any[]>>({});
  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(
    null
  );
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    bed: false,
    services: false,
    surgeries: false,
    medicines: false,
    implants: false,
  });

  const fetchPackageDetails = async () => {
    setPackageLoading(true);
    try {
      const response = await getPackageAmount(Number(doctorId));
      if (response.success) {
        setPackageDetails(response.data);
        setPackageLoading(false);
      }
    } catch (error) {
      setPackageLoading(false);
      console.error("Error fetching package details:", error);
      toast.error("Failed to load package details");
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const fetchHospitalData = async () => {
    setLoading(true);
    try {
      const response = await getHospitalByPackage(doctorId);
      // console.log("Hospital data from API", response);
      if (response.success) {
        setHospital({
          ...dummyHospital,
          about_us: response.data?.about_us || dummyHospital.about_us,
          facebook_url:
            response.data?.facebook_url || dummyHospital.facebook_url,
          hospital_address:
            response.data?.hospital_address || dummyHospital.hospital_address,
          hospital_email:
            response.data?.hospital_email || dummyHospital.hospital_email,
          hospital_from_day:
            response.data?.hospital_from_day || dummyHospital.hospital_from_day,
          hospital_from_time:
            response.data?.hospital_from_time ||
            dummyHospital.hospital_from_time,
          hospital_name:
            response.data?.hospital_name || dummyHospital.hospital_name,
          hospital_phone:
            response.data?.hospital_phone || dummyHospital.hospital_phone,
          instagram_url:
            response.data?.instagram_url || dummyHospital.instagram_url,
          linkedIn_url:
            response.data?.linkedIn_url || dummyHospital.linkedIn_url,
          package_id: response.data?.package_id || dummyHospital.package_id,
          package_name:
            response.data?.package_name || dummyHospital.package_name,
          tenant_id: response.data?.tenant_id || dummyHospital.tenant_id,
          twitter_url: response.data?.twitter_url || dummyHospital.twitter_url,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
      setLoading(false);
    }
  };

  const fetchDoctorsData = async () => {
    setLoading(true);
    try {
      const response = await getDoctorsByTenant(Number(doctorId));
      if (response.success) {
        setDoctorsData(response.data);

        // Set the first department and doctor as selected by default
        const departments = Object.keys(response.data);
        if (departments.length > 0) {
          setSelectedDepartment(departments[0]);
          const firstDoctor = response.data[departments[0]][0];
          if (firstDoctor) {
            setSelectedDoctor({
              id: firstDoctor.doctor_id.toString(),
              name: `${firstDoctor.first_name} ${firstDoctor.last_name}`,
              specialty: firstDoctor.specialist,
              qualification: firstDoctor.qualification,
              experience: firstDoctor.total_experience || "Not specified",
              rating: 4.8,
              consultationFee: 0,
              languages: ["English", "Hindi"],
              about: `Experienced ${firstDoctor.specialist} with ${
                firstDoctor.total_experience || "extensive"
              } experience.`,
              address: firstDoctor.address
                ? `${firstDoctor.address.address1}, ${firstDoctor.address.city}, ${firstDoctor.address.state}`
                : "Address not available",
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching doctors data:", error);
      setLoading(false);
      toast.error("Failed to load doctors data");
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const response = await getGalleryImages(Number(doctorId));
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingNotification = async (userNotes: string = "") => {
    const enquiryType = bookingData?.bookingType!.charAt(0).toUpperCase() + bookingData?.bookingType!.slice(1);
    let bookType = "Indian Patient"
    if(localStorage.getItem("user")==='abroad_patient'){
      bookType="Abroad Patient"
    }
    try {
      setShowLoadingModal(true);
      const notifyBookingData = {
        Enquiry_Type: enquiryType,
        User_Type: bookType,
        User_Full_Name: userData?.full_name,
        User_Id: userData?.id,
        User_Email: userData?.email,
        User_Phone: userData?.phone,
        User_Age: userData?.age,
        User_DOB: userData?.dob,
        User_Gender: userData?.gender === 0 ? "male" : "female",
        Enquiry_Coordinates: sessionData.coordinates,
        Enquiry_Location: sessionData.location,
        Enquiry_Location_Type: sessionData.locationType,
        Enquiry_Date_Range: sessionData.dateRange,
        Enquiry_Health_Conditions: sessionData.healthConditions,
        Enquiry_Surgery_Type: sessionData.surgeryType,
        Package_Id: packageDetails?.package_id,
        Package_Name: packageDetails?.package_name,
        Package_Total_Amount: packageDetails?.total_amount,
        Hospital_Name: hospital?.hospital_name,
        Hospital_Email: hospital?.hospital_email,
        Hospital_Phone: hospital?.hospital_phone,
        Notes: userNotes || "No notes given",
      };
      
      console.log("INITIATE BOOKING===>", notifyBookingData);
      const result = await notifyBooking(notifyBookingData);
      setShowLoadingModal(false);
      toast.success(result.message);
      console.log(result.message);
      setShowSuccessModal(true);
    } catch (error) {
      setShowLoadingModal(false);
      console.error("Notification failed:", error);
      toast.error("Booking failed");
    }
  };

  const handleNavigateHome = () => {
    setShowSuccessModal(false);
    router.push("/"); // Adjust the home route as needed
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleNotesSubmit = async (notes: string) => {
    setShowNotesModal(false);
    setPendingBookingType(null);
    await handleBookingNotification(notes);
  };

  const handleNotesSkip = async () => {
    setShowNotesModal(false);
    setPendingBookingType(null);
    await handleBookingNotification("");
  };

  const handleNotesCancel = () => {
    setShowNotesModal(false);
    setPendingBookingType(null);
    setShowLoadingModal(false);
    // No API call happens
  };
  useEffect(() => {
    fetchHospitalData();
    fetchPackageDetails();
    fetchDoctorsData();
    fetchGalleryImages();
    getUserData();
    const data = sessionStorage.getItem("surgicalSearchData");
    if (data) {
      setSessionData(JSON.parse(data));
    }
  }, []);
  // console.log("SESSION DATA", hospital);
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

  const toggleDoctorExpand = (doctorId: string) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
  };

  const toggleDepartmentExpansion = (deptName: string) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [deptName]: !prev[deptName],
    }));

    // Set selected department when expanding
    if (!expandedDepartments[deptName]) {
      setSelectedDepartment(deptName);
      // Set the first doctor of this department as selected
      const firstDoctor = doctorsData[deptName][0];
      if (firstDoctor) {
        setSelectedDoctor({
          id: firstDoctor.doctor_id.toString(),
          name: `${firstDoctor.first_name} ${firstDoctor.last_name}`,
          specialty: firstDoctor.specialist,
          qualification: firstDoctor.qualification,
          experience: firstDoctor.total_experience || "Not specified",
          rating: 4.8,
          consultationFee: 0,
          languages: ["English", "Hindi"],
          about: `Experienced ${firstDoctor.specialist} with ${
            firstDoctor.total_experience || "extensive"
          } experience.`,
          address: firstDoctor.address
            ? `${firstDoctor.address.address1}, ${firstDoctor.address.city}, ${firstDoctor.address.state}`
            : "Address not available",
        });
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!hospital) {
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
            Hospital not found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The requested hospital profile could not be loaded.
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
                className="text-lg md:text-xl font-bold"
              >
                {hospital.hospital_name}
              </motion.h1>
              {selectedDepartment && (
                <p className="text-blue-100 text-xs md:text-sm flex items-center">
                  <Scissors className="w-4 h-4 mr-1" /> {selectedDepartment}
                </p>
              )}
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  {renderStars(hospital.rating)}
                  <span className="text-xs md:text-sm text-blue-100">
                    (1,245 reviews)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <div className="flex items-center space-x-1 text-blue-100 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>{hospital.hospital_address}</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-100 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>
                    {hospital.hospital_from_day} {hospital.hospital_from_time}
                  </span>
                </div>
              </div>
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
        {/* Department Selection with Expandable Doctors */}
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">
            Doctor Departments
          </h2>
          <div className="space-y-3">
            {Object.keys(doctorsData).map((deptName) => (
              <motion.div
                key={deptName}
                className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
              >
                {/* Department Header */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 cursor-pointer transition-colors ${
                    expandedDepartments[deptName]
                      ? "bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800"
                      : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => toggleDepartmentExpansion(deptName)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Scissors className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm md:text-base font-medium">
                        {deptName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        {doctorsData[deptName].length}{" "}
                        {doctorsData[deptName].length === 1
                          ? "specialist"
                          : "specialists"}
                      </span>
                      <motion.div
                        animate={{
                          rotate: expandedDepartments[deptName] ? 90 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Expanded Doctors List */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedDepartments[deptName] ? "auto" : 0,
                    opacity: expandedDepartments[deptName] ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {expandedDepartments[deptName] && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 space-y-3">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Specialists in {deptName}
                      </h3>
                      <div className="space-y-3">
                        {doctorsData[deptName].map((doctor) => {
                          const doctorData = {
                            id: doctor.doctor_id.toString(),
                            name: `${doctor.first_name} ${doctor.last_name}`,
                            specialty: doctor.specialist,
                            qualification: doctor.qualification,
                            experience:
                              doctor.total_experience || "Not specified",
                            rating: 4.8,
                            consultationFee: 0,
                            languages: ["English", "Hindi"],
                            about: `Experienced ${doctor.specialist} with ${
                              doctor.total_experience || "extensive"
                            } experience.`,
                            address: doctor.address
                              ? `${doctor.address.address1}, ${doctor.address.city}, ${doctor.address.state}`
                              : "Address not available",
                          };

                          return (
                            <DoctorCard
                              key={doctor.doctor_id}
                              doctor={doctorData}
                              onSelect={(selectedDoctor) => {
                                setSelectedDoctor(selectedDoctor);
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hospital Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About {hospital.hospital_name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                {hospital.about_us}
              </p>
            </div>

            <div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2">
                Contact Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {hospital.hospital_address}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {hospital.hospital_from_day} {hospital.hospital_from_time}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <a
                    href={`tel:${hospital.hospital_phone}`}
                    className="text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {hospital.hospital_phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <a
                    href={`mailto:${hospital.hospital_email}`}
                    className="text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {hospital.hospital_email}
                  </a>
                </div>
              </div>

              <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-white mt-4 mb-2">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                {hospital.facebook_url && (
                  <a
                    href={hospital.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-5 h-5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" />
                  </a>
                )}
                {hospital.twitter_url && (
                  <a
                    href={hospital.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter className="w-5 h-5 text-blue-400 hover:text-blue-500" />
                  </a>
                )}
                {hospital.instagram_url && (
                  <a
                    href={hospital.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-5 h-5 text-pink-600 hover:text-pink-700" />
                  </a>
                )}
                {hospital.linkedIn_url && (
                  <a
                    href={hospital.linkedIn_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 text-blue-700 hover:text-blue-800" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Facility Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <HospitalGallery galleryImages={galleryImages} />
        </motion.div>

        {/* Package Information */}
        {!packageLoading && (
          <PackageDetailsSection
            packageDetails={packageDetails}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        )}

        {/* Query Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Have Questions?
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
            Get personalized answers about procedures, recovery time, or any
            concerns you may have about {selectedDepartment} at {hospital.name}.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowQuestionModal(true)}
            className="flex items-center space-x-2 bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm md:text-base font-medium"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Ask a Question</span>
          </motion.button>
        </motion.div>
        {/* Document Upload Section */}
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Upload Documents
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
              Upload medical reports, previous scans, or referral letters (PDF
              or Images only, max 2MB each)
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
                <span className="text-base md:text-lg font-medium text-blue-600 dark:text-blue-400">
                  Click to upload documents
                </span>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
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
                <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                  Uploaded Documents:
                </h3>
                {bookingData.documents.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                  >
                    <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                      {doc.name}
                    </span>
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
        )}
        {/* Appointment Scheduling */}
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            {/* <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Schedule with {selectedDoctor.name}
            </h2> */}

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
                  <span className="text-sm md:text-base font-semibold">
                    Virtual Consult
                  </span>
                </div>
                <p className="text-xs md:text-sm text-center text-gray-600 dark:text-gray-400">
                  Free 15-min consultation
                </p>
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
                  <span className="text-sm md:text-base font-semibold">
                    Surgery Booking
                  </span>
                </div>
                <p className="text-xs md:text-sm text-center text-gray-600 dark:text-gray-400">
                  Schedule an enquiry
                </p>
              </motion.button>
            </div>
          </motion.div>
        )}
        {/* Patient Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
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
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                    John D.
                  </h4>
                  <div className="flex items-center space-x-1">
                    {renderStars(5)}
                  </div>
                </div>
              </div>

              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 italic mb-4">
                "The {selectedDepartment} team at {hospital.name} provided
                exceptional care. My recovery was faster than expected!"
              </p>

              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>24 Helpful</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Camera className="w-4 h-4" />
                  <span>See Recovery Photos</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 text-sm md:text-base text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              <ChevronDown className="w-4 h-4" />
              <span>Load More Reviews (12)</span>
            </motion.button>
          </div>
        </motion.div>

        {/* CONTACT SECTION */}
        <ContactButton />

        {/* Final CTA */}
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center"
          >
            <motion.button
              whileHover={bookingType && !apiLoading ? { scale: 1.02 } : {}}
              whileTap={bookingType && !apiLoading ? { scale: 0.98 } : {}}
              onClick={() => {
                if (bookingType && !apiLoading) {
                  setPendingBookingType(bookingType);
                  setShowNotesModal(true);
                }
              }}
              disabled={!bookingType || apiLoading}
              className={`w-full py-4 px-8 rounded-xl text-white font-bold text-base md:text-lg transition-colors ${
                bookingType && !apiLoading
                  ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              {apiLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  {bookingType === "virtual"
                    ? "BOOK VIRTUAL CONSULTATION"
                    : bookingType === "surgery"
                    ? "SCHEDULE SURGERY ENQUIRY"
                    : "SELECT BOOKING TYPE"}
                </>
              )}
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-center space-x-2 mt-4 text-xs md:text-sm text-gray-500 dark:text-gray-400"
            >
              <Shield className="w-4 h-4" />
              <span>Secure booking. Cancel anytime up to 48hrs prior.</span>
            </motion.div>
          </motion.div>
        )}
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
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
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
              placeholder="What would you like to ask about this procedure?"
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm md:text-base"
            />

            <div className="flex space-x-3 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowQuestionModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-sm md:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
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

      {/* Notes Modal */}
      <NotesModal
        isOpen={showNotesModal}
        onClose={handleNotesCancel}
        onSubmit={handleNotesSubmit}
        onSkip={handleNotesSkip}
        bookingType={pendingBookingType}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        onNavigateHome={handleNavigateHome}
        bookingType={bookingData.bookingType}
      />

      {/* Loading Modal */}
      <BookingLoadingModal
        isOpen={showLoadingModal}
        bookingType={bookingData.bookingType}
      />
    </motion.div>
  );
};

export default BookingComponent;
