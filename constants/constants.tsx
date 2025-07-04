import { Activity, Baby, Bone, BookOpen, Brain, CalendarCheck, CalendarDays, Car, ClipboardCheck, ClipboardEdit, ClipboardList, Cpu, CreditCard, Database, Dna, FileText, HeartPulse, HeartPulseIcon, Languages, LineChart, Mail, MessageSquare, Pill, Plane, Shield, Stethoscope, TrendingUp, Users, Users2, Video, VideoIcon, Workflow } from "lucide-react";
import { FaDumbbell, FaTooth } from "react-icons/fa";
import { GiScalpel } from "react-icons/gi";
import { MdMonitorHeart } from "react-icons/md";

export const patientsPointers = [
  {
    title: "24/7 Teleconsultations",
    icon: <Video className="w-4 h-4" />,
    description: "Connect with doctors anytime, anywhere"
  },
  {
    title: "Digital Health Records",
    icon: <FileText className="w-4 h-4" />,
    description: "Secure and centralized medical history"
  },
  {
    title: "Surgical Care Coordination",
    icon: <GiScalpel className="w-4 h-4" />,
    description: "End-to-end surgical journey management"
  },
  {
    title: "Medication Management",
    icon: <Pill className="w-4 h-4" />,
    description: "Track and organize your prescriptions"
  },
  {
    title: "Appointment Scheduling",
    icon: <CalendarDays className="w-4 h-4" />,
    description: "Book and manage doctor visits easily"
  },
  {
    title: "Health Monitoring",
    icon: <Activity className="w-4 h-4" />,
    description: "Track vital signs and health metrics"
  }
];


 export const treatments = [
    {
      title: "Cardiology & Cardiothoracic Surgery",
      icon: <HeartPulse className="w-4 h-4" />,
      description: "Advanced heart care and surgical treatments",
    },
    {
      title: "Orthopedics & Joint Replacement",
      icon: <Bone className="w-4 h-4" />,
      description: "Bone, joint and musculoskeletal treatments",
    },
    {
      title: "Oncology (Cancer Treatment)",
      icon: <Dna className="w-4 h-4" />,
      description: "Comprehensive cancer diagnosis and therapy",
    },
    {
      title: "Cosmetic & Plastic Surgery",
      icon: <GiScalpel className="w-4 h-4" />,
      description: "Aesthetic and reconstructive procedures",
    },
    {
      title: "IVF and Fertility Treatments",
      icon: <Baby className="w-4 h-4" />,
      description: "Assisted reproductive technologies",
    },
    {
      title: "Neurology & Neurosurgery",
      icon: <Brain className="w-4 h-4" />,
      description: "Brain and nervous system treatments",
    },
    {
      title: "Dental Procedures",
      icon: <FaTooth className="w-4 h-4" />,
      description: "Specialized dental care and surgeries",
    },
    {
      title: "Bariatric Surgery",
      icon: <FaDumbbell className="w-4 h-4" />,
      description: "Weight loss and metabolic surgery",
    },
  ];


export const comprehensiveServices = [
    {
      title: "Pre-Travel Medical Consultation",
      icon: <Stethoscope className="w-5 h-5" />,
      description:
        "Comprehensive health assessment before your medical journey",
    },
    {
      title: "Visa Assistance and Travel Coordination",
      icon: <Plane className="w-5 h-5" />,
      description: "Help with medical visas and travel arrangements",
    },
    {
      title: "Hospital and Doctor Appointments",
      icon: <CalendarCheck className="w-5 h-5" />,
      description: "Schedule consultations with top specialists",
    },
    {
      title: "Translation and Interpretation Services",
      icon: <Languages className="w-5 h-5" />,
      description: "Professional language support during treatment",
    },
    {
      title: "Local Transportation and Accommodation",
      icon: <Car className="w-5 h-5" />,
      description: "Comfortable stays and reliable local transport",
    },
    {
      title: "Post-Treatment Follow-ups (In-person & Telehealth)",
      icon: <VideoIcon className="w-5 h-5" />,
      description: "Continued care after your medical procedure",
    },
  ];

export const hospitalPointers = [
  {
    title: "Patient Data Management",
    icon: <Database className="w-4 h-4" />,
    description: "Centralized and secure patient information system"
  },
  {
    title: "Operational Workflow Automation",
    icon: <Workflow className="w-4 h-4" />,
    description: "Streamlined hospital processes and operations"
  },
  {
    title: "Billing & Insurance Integration",
    icon: <CreditCard className="w-4 h-4" />,
    description: "Seamless financial transactions and claims processing"
  },
  {
    title: "Resource Allocation",
    icon: <Cpu className="w-4 h-4" />,
    description: "Optimal utilization of hospital assets and staff"
  },
  {
    title: "Staff Management",
    icon: <Users className="w-4 h-4" />,
    description: "Efficient scheduling and workforce coordination"
  },
  {
    title: "Reporting & Analytics",
    icon: <LineChart className="w-4 h-4" />,
    description: "Data-driven insights for better decision making"
  }
];

export const doctorsPointers = [
  {
    title: "Remote Patient Monitoring",
    icon: <MdMonitorHeart className="w-4 h-4" />,
    description: "Track patient vitals and health data remotely"
  },
  {
    title: "Teleconsultation Platform",
    icon: <Video className="w-4 h-4" />,
    description: "Secure video consultations with patients"
  },
  {
    title: "Complete Patient Records",
    icon: <ClipboardList className="w-4 h-4" />,
    description: "Access to comprehensive medical histories"
  },
  {
    title: "Prescription Management",
    icon: <Pill className="w-4 h-4" />,
    description: "Digital prescriptions with medication tracking"
  },
  {
    title: "Diagnostic Integration",
    icon: <Activity className="w-4 h-4" />,
    description: "Seamless connection with lab and imaging results"
  },
  {
    title: "Collaboration Tools",
    icon: <Users className="w-4 h-4" />,
    description: "Secure communication with healthcare teams"
  }
];

export const clinicsPointers = [
  {
    title: "Patient Engagement Tools",
    icon: <MessageSquare className="w-4 h-4" />,
    description: "Interactive tools to keep patients involved in their care"
  },
  {
    title: "Proactive Care Management",
    icon: <TrendingUp className="w-4 h-4" />,
    description: "Early intervention and preventive care strategies"
  },
  {
    title: "Outcome Tracking",
    icon: <ClipboardCheck className="w-4 h-4" />,
    description: "Monitor and measure treatment effectiveness"
  },
  {
    title: "Communication Platforms",
    icon: <Mail className="w-4 h-4" />,
    description: "Secure messaging and appointment reminders"
  },
  {
    title: "Preventive Care Support",
    icon: <Shield className="w-4 h-4" />,
    description: "Vaccination and screening program management"
  },
  {
    title: "Health Education Resources",
    icon: <BookOpen className="w-4 h-4" />,
    description: "Patient-friendly educational materials"
  }
];

export const diagnosisPointers = [
  {
    title: "Surgical Planning Tools",
    icon: <ClipboardEdit className="w-4 h-4" />,
    description: "Advanced visualization and simulation for surgical procedures"
  },
  {
    title: "Pre-op Assessment",
    icon: <Stethoscope className="w-4 h-4" />,
    description: "Comprehensive patient evaluation before surgery"
  },
  {
    title: "Post-op Monitoring",
    icon: <HeartPulseIcon className="w-4 h-4" />,
    description: "Continuous tracking of patient recovery progress"
  },
  {
    title: "Surgical Team Coordination",
    icon: <Users2 className="w-4 h-4" />,
    description: "Real-time communication for surgical teams"
  },
  {
    title: "Procedure Documentation",
    icon: <FileText className="w-4 h-4" />,
    description: "Detailed digital records of surgical interventions"
  },
  {
    title: "Outcome Analysis",
    icon: <LineChart className="w-4 h-4" />,
    description: "Data-driven evaluation of surgical results"
  }
];
