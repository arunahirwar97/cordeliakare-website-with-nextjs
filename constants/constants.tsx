import {
  Activity,
  AlertTriangle,
  Award,
  Baby,
  Bandage,
  Bed,
  Bone,
  BookOpen,
  Brain,
  CalendarCheck,
  CalendarDays,
  Car,
  ClipboardCheck,
  ClipboardEdit,
  ClipboardList,
  Clock,
  Cpu,
  CreditCard,
  Database,
  Dna,
  Ear,
  Eye,
  FileText,
  FlaskConical,
  Heart,
  HeartPulse,
  HeartPulseIcon,
  Languages,
  Leaf,
  LineChart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Pill,
  Plane,
  Radiation,
  Scan,
  Shield,
  Skull,
  Smile,
  Stethoscope,
  Syringe,
  Thermometer,
  TrendingUp,
  Users,
  Users2,
  Video,
  VideoIcon,
  Weight,
  Workflow,
  X,
} from "lucide-react";
import { JSX } from "react";

export const ScalpelIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M18.6 2.4l3 3L10 17H7v-3L18.6 2.4z" />
    <path d="M7 17l-4 4" />
  </svg>
);

export const RupeeIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-rupee ${props.className || ""}`}
  >
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="M6 13l8 8" />
    <path d="M6 13h3a6 6 0 0 0 6-6V3" />
  </svg>
);

export const patientsPointers = [
  {
    title: "24/7 Teleconsultations",
    icon: <Video className="w-4 h-4" />,
    description: "Connect with doctors anytime, anywhere",
  },
  {
    title: "Digital Health Records",
    icon: <FileText className="w-4 h-4" />,
    description: "Secure and centralized medical history",
  },
  {
    title: "Surgical Care Coordination",
    icon: <Syringe className="w-4 h-4" />,
    description: "End-to-end surgical journey management",
  },
  {
    title: "Medication Management",
    icon: <Pill className="w-4 h-4" />,
    description: "Track and organize your prescriptions",
  },
  {
    title: "Appointment Scheduling",
    icon: <CalendarDays className="w-4 h-4" />,
    description: "Book and manage doctor visits easily",
  },
  {
    title: "Health Monitoring",
    icon: <Activity className="w-4 h-4" />,
    description: "Track vital signs and health metrics",
  },
];

export const treatments = [
  {
    title: "Cardiology & Cardiothoracic Surgery",
    icon: HeartPulse,
    description: "Advanced heart care and surgical treatments",
    image: "/cardio.png",
    savings: "70% savings vs. US",
  },
  {
    title: "Ophthalmology",
    icon: Eye,
    description: "Advanced treatments for vision and eye disorders",
    image: "/optha.png",
    savings: "60% savings vs. UK",
  },
  {
    title: "General Surgery",
    icon: Stethoscope,
    description: "Comprehensive surgical care for a variety of conditions",
    image: "/general_surgery.png",
    savings: "55% savings vs. US",
  },
  {
    title: "Orthopedics & Joint Replacement",
    icon: Bone,
    description: "Bone, joint and musculoskeletal treatments",
    image: "/ortho.png",
    savings: "65% savings vs. UK",
  },
  {
    title: "Oncology (Cancer Treatment)",
    icon: Dna,
    description: "Comprehensive cancer diagnosis and therapy",
    image: "/onco.png",
    savings: "60% savings vs. Germany",
  },
  {
    title: "Cosmetic & Plastic Surgery",
    icon: Syringe,
    description: "Aesthetic and reconstructive procedures",
    image: "/cosmetic.png",
    savings: "75% savings vs. Canada",
  },
  {
    title: "IVF and Fertility Treatments",
    icon: Baby,
    description: "Assisted reproductive technologies",
    image: "/ivf.png",
    savings: "70% savings vs. Australia",
  },
  {
    title: "Neurology & Neurosurgery",
    icon: Brain,
    description: "Brain and nervous system treatments",
    image: "/neuro.png",
    savings: "65% savings vs. USA",
  },
];

export const services = [
  {
    title: "Affordable Pricing",
    emoji: "💰",
    description:
      "Up to 70% cost savings compared to treatments in the U.S., UK, or Europe",
    icon: RupeeIcon,
    color: "text-green-500",
  },
  {
    title: "Minimal Waiting Time",
    emoji: "⏱️",
    description:
      "Immediate access to diagnostics, consultations, and surgeries",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    title: "Global-Standard Facilities",
    emoji: "🏥",
    description:
      "JCI, NABH, ISO certified hospitals with advanced technologies",
    icon: Award,
    color: "text-purple-500",
  },
  {
    title: "Personalized Care",
    emoji: "👩‍⚕️",
    description: "Dedicated patient coordinators ensure end-to-end support",
    icon: Users,
    color: "text-pink-500",
  },
  {
    title: "Safe Recovery",
    emoji: "🌿",
    description:
      "Partnerships with rehabilitation centres and wellness resorts",
    icon: Shield,
    color: "text-yellow-500",
  },
  {
    title: "Post-Care Programs",
    emoji: "💆‍♂️",
    description:
      "Wellness programs, nutrition advice, and alternative therapies",
    icon: HeartPulse,
    color: "text-red-500",
  },
];

export const carePath = [
  {
    title: "Virtual OPD Centers",
    description: "Consult with specialists from your location",
    icon: VideoIcon,
    side: "left",
  },
  {
    title: "Patient Consultation and Diagnostics",
    description: "Comprehensive health assessment and tests",
    icon: Stethoscope,
    side: "right",
  },
  {
    title: "Upload Medical Records",
    description: "Secure digital transfer of your medical history",
    icon: ClipboardList,
    side: "left",
  },
  {
    title: "Hospital Recommendations in India",
    description: "Personalized hospital suggestions based on your needs",
    icon: MapPin,
    side: "right",
  },
  {
    title: "Travel and Accommodation Arrangements",
    description: "Comprehensive travel planning and stay coordination",
    icon: Plane,
    side: "left",
  },
  {
    title: "Hospital Liaison and Booking",
    description: "Direct coordination with hospitals for your treatment",
    icon: CalendarCheck,
    side: "right",
  },
  {
    title: "Post-treatment Follow-up",
    description: "Continued care and monitoring after your procedure",
    icon: Phone,
    side: "left",
  },
];

export const dummyTestimonials = [
  {
    name: "Sarah Johnson",
    country: "United Kingdom",
    treatment: "Hip Replacement",
    quote:
      "The care I received was exceptional. The surgery was successful and I saved over £15,000 compared to UK prices.",
    image: "/images/patient-uk.jpg",
  },
  {
    name: "Michael Brown",
    country: "United States",
    treatment: "Cardiac Bypass",
    quote:
      "From the first consultation to my follow-up care, everything was perfectly organized. The hospital was world-class.",
    image: "/images/patient-us.jpg",
  },
  {
    name: "Amina Al-Mansoori",
    country: "United Arab Emirates",
    treatment: "Spine Surgery",
    quote:
      "The doctors were incredibly skilled and the aftercare was thorough. I'm now pain-free and back to my active lifestyle.",
    image: "/images/patient-uae.jpg",
  },
];

export const comprehensiveServices = [
  {
    title: "Pre-Travel Medical Consultation",
    icon: Stethoscope,
    description: "Comprehensive health assessment before your medical journey",
  },
  {
    title: "Visa Assistance and Travel Coordination",
    icon: Plane,
    description: "Help with medical visas and travel arrangements",
  },
  {
    title: "Hospital and Doctor Appointments",
    icon: CalendarCheck,
    description: "Schedule consultations with top specialists",
  },
  {
    title: "Translation and Interpretation Services",
    icon: Languages,
    description: "Professional language support during treatment",
  },
  {
    title: "Local Transportation and Accommodation",
    icon: Car,
    description: "Comfortable stays and reliable local transport",
  },
  {
    title: "Post-Treatment Follow-ups (In-person & Telehealth)",
    icon: VideoIcon,
    description: "Continued care after your medical procedure",
  },
];

export const hospitalPointers = [
  {
    title: "Patient Data Management",
    icon: <Database className="w-4 h-4" />,
    description: "Centralized and secure patient information system",
  },
  {
    title: "Operational Workflow Automation",
    icon: <Workflow className="w-4 h-4" />,
    description: "Streamlined hospital processes and operations",
  },
  {
    title: "Billing & Insurance Integration",
    icon: <CreditCard className="w-4 h-4" />,
    description: "Seamless financial transactions and claims processing",
  },
  {
    title: "Resource Allocation",
    icon: <Cpu className="w-4 h-4" />,
    description: "Optimal utilization of hospital assets and staff",
  },
  {
    title: "Staff Management",
    icon: <Users className="w-4 h-4" />,
    description: "Efficient scheduling and workforce coordination",
  },
  {
    title: "Reporting & Analytics",
    icon: <LineChart className="w-4 h-4" />,
    description: "Data-driven insights for better decision making",
  },
];

export const doctorsPointers = [
  {
    title: "Remote Patient Monitoring",
    icon: <HeartPulse className="w-4 h-4" />,
    description: "Track patient vitals and health data remotely",
  },
  {
    title: "Teleconsultation Platform",
    icon: <Video className="w-4 h-4" />,
    description: "Secure video consultations with patients",
  },
  {
    title: "Complete Patient Records",
    icon: <ClipboardList className="w-4 h-4" />,
    description: "Access to comprehensive medical histories",
  },
  {
    title: "Prescription Management",
    icon: <Pill className="w-4 h-4" />,
    description: "Digital prescriptions with medication tracking",
  },
  {
    title: "Diagnostic Integration",
    icon: <Activity className="w-4 h-4" />,
    description: "Seamless connection with lab and imaging results",
  },
  {
    title: "Collaboration Tools",
    icon: <Users className="w-4 h-4" />,
    description: "Secure communication with healthcare teams",
  },
];

export const clinicsPointers = [
  {
    title: "Patient Engagement Tools",
    icon: <MessageSquare className="w-4 h-4" />,
    description: "Interactive tools to keep patients involved in their care",
  },
  {
    title: "Proactive Care Management",
    icon: <TrendingUp className="w-4 h-4" />,
    description: "Early intervention and preventive care strategies",
  },
  {
    title: "Outcome Tracking",
    icon: <ClipboardCheck className="w-4 h-4" />,
    description: "Monitor and measure treatment effectiveness",
  },
  {
    title: "Communication Platforms",
    icon: <Mail className="w-4 h-4" />,
    description: "Secure messaging and appointment reminders",
  },
  {
    title: "Preventive Care Support",
    icon: <Shield className="w-4 h-4" />,
    description: "Vaccination and screening program management",
  },
  {
    title: "Health Education Resources",
    icon: <BookOpen className="w-4 h-4" />,
    description: "Patient-friendly educational materials",
  },
];

export const diagnosisPointers = [
  {
    icon: "🏢",
    title: "Centralized LIMS",
    description:
      "Enables unified data handling across locations—sample tracking, reporting, billing, and inventory.",
  },
  {
    icon: "☁️",
    title: "Cloud-Based Accessibility",
    description:
      "Facilitates remote monitoring, multi-location coordination, and real-time data sharing.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Diagnostics",
    description:
      "Supports faster and more accurate test interpretation, especially in pathology and radiology.",
  },
  {
    icon: "🔗",
    title: "National Health Platform Integration",
    description:
      "Seamless interoperability with Ayushman Bharat Digital Mission (ABDM), EMRs, and HIMS.",
  },
  {
    icon: "⚙️",
    title: "Total Lab Automation (TLA)",
    description:
      "Reduces manual errors, improves turnaround time, and boosts operational efficiency.",
  },
  {
    icon: "📱",
    title: "Digital Access for Patients",
    description:
      "Patients receive reports via mobile/web apps with multilingual support.",
  },
];

