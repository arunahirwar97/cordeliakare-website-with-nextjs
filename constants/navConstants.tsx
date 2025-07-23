import {
  Users,
  Building2,
  Shield,
  Calendar,
  ChevronDown,
  Menu,
  AlertCircle,
  LogOut,
  User,
  X,
  Sun,
  Moon,
  UserPlus,
  Stethoscope,
  Building2 as BuildingHospital,
  Microscope,
  Network as NetworkIcon,
  Image as ImageIcon,
  ScissorsSquareDashedBottom,
  Globe,
  Flag,
  Video,
  Hospital,
  PackageSearch,
  Sliders,
  Smartphone,
} from "lucide-react";
import toast from "react-hot-toast";

export const headersolutions = [
  {
    id: "Patients",
    title: "Patients",
    description:
      "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
    icon: UserPlus,
    color: "bg-blue-500",
    image_name: "/images/rem/patients.png",
    s_id: 1,
  },
  {
    id: "network_hospitals",
    title: "Hospitals and Network Hospitals",
    description:
      "Our platform supports providers with patient engagement, workflow optimization, and seamless integrations.",
    icon: NetworkIcon,
    color: "bg-yellow-500",
    image_name: "/images/rem/hospitals.png",
    s_id: 2,
  },
  {
    id: "Specialist",
    title: "Specialist",
    description:
      "Solutions for payers focused on cost management, analytics, and improving member engagement.",
    icon: Stethoscope,
    color: "bg-green-500",
    image_name: "/images/rem/specialist.png",
    s_id: 3,
  },
  {
    id: "Clinics",
    title: "Clinics",
    description:
      "Our platform supports providers with patient engagement, workflow optimization, and seamless integrations.",
    icon: BuildingHospital,
    color: "bg-purple-500",
    image_name: "/images/rem/clinics.png",
    s_id: 4,
  },

  {
    id: "Diagnosis_centre",
    title: "Diagnosis Centre",
    description:
      "Our platform supports providers with patient engagement, workflow optimization, and seamless integrations.",
    icon: Microscope,
    color: "bg-red-500",
    image_name: "/images/rem/diagnosis.png",
    s_id: 5,
  },
];

export const plateforms = [
  {
    id: 1,
    title: "Patient mHealth App",
    description:
      "Personalized healthcare access for patients anytime, anywhere",
    icon: Smartphone,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Doctor mHealth App",
    description: "Comprehensive practice management for medical professionals",
    icon: Stethoscope,
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Hospital Management System",
    description: "End-to-end digital solution for hospital administration",
    icon: Hospital,
    color: "bg-teal-500",
  },
  {
    id: 4,
    title: "Emergency SOS Services",
    description: "Immediate medical assistance with real-time tracking",
    icon: AlertCircle,
    color: "bg-red-500",
  },
];

export const mvts = [
  {
    title: "Patient in India",
    slug: "/surgical-care/search?location=India",
    description:
      "Our platform that helps patients discover top-rated surgeons and hospitals, receive expert consultations and case reviews, and get clear cost estimates—empowering timely and informed decisions.",
    icon: Flag,
    color: "bg-red-500",
  },
  {
    title: "Patient in Abroad",
    slug: "/medical-tourism",
    description:
      "We provide international patients with dedicated, step-by-step support—connecting you to top-rated surgeons and hospitals, facilitating expert consultations, and assisting you through every stage of your treatment journey",
    icon: Globe,
    color: "bg-yellow-500",
  },
];

export const appointments = [
  {
    title: "Teleconsultation",
    description:
      "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
    icon: Video,
    color: "bg-indigo-500",
    url: () => toast("Not available now.", { icon: "ℹ️" }),
  },
  {
    title: "Hospital Appointments",
    description:
      "Solutions for payers focused on cost management, analytics, and improving member engagement.",
    icon: Calendar,
    color: "bg-cyan-500",
    url: () => toast("Not available now.", { icon: "ℹ️" }),
  },
];

export const hospitals = [
  {
    title: "Search Hospitals",
    description:
      "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
    icon: Hospital,
    color: "bg-rose-500",
    url: () =>
      (window.location.href = "https://prod.cordeliakare.com/hospitals"),
  },
  {
    title: "Hospital With Surgical Facilities",
    description:
      "Solutions for payers focused on cost management, analytics, and improving member engagement.",
    icon: ScissorsSquareDashedBottom,
    color: "bg-amber-500",
    url: () => toast("Not available now.", { icon: "ℹ️" }),
  },
  {
    title: "Gallery",
    description:
      "Solutions for payers focused on cost management, analytics, and improving member engagement.",
    icon: ImageIcon,
    color: "bg-lime-500",
    url: () => (window.location.href = "https://prod.cordeliakare.com/gallery"),
  },
];

export const loginOptions = [
  {
    title: "Indian User",
    url: "/auth/login",
    icon: Flag,
    color: "bg-orange-500",
  },
  {
    title: "Abroad User",
    url: "/auth/abroad/login",
    icon: Globe,
    color: "bg-blue-500",
  },
];
