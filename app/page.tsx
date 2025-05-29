"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Stethoscope,
  Building2,
  Shield,
  Calendar,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  CheckCircle,
  ArrowRight,
  Play,
  PackageSearch,
  Sliders,
  Globe,
  Flag,
  Video,
  Hospital,
  Search,
  Monitor,
  Image as ImageIcon,
  ScissorsSquareDashedBottom,
} from "lucide-react"

import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function CordeliakarePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollYProgress } = useScroll()

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const [expandedCards, setExpandedCards] = useState({});
  const [openCardsHealth, setOpenCardsHealth] = useState([]);
  const [popupData, setPopupData] = useState(null);
  
  useEffect(() => {
    setMounted(true)
  }, [])


  
  
  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const toggleCard1 = (index) => {
    setOpenCardsHealth((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const openPopup = (challenge) => {
    setPopupData(challenge);
  };

  const closePopup = () => {
    setPopupData(null);
  };
  
  const solutions = [
    {
      title: "Enabling Remote care delivery",
      description: [
        "Patient mHealth app is connected with HMS system for care delivery",
        "Appointment Booking & Management",
        "Telemedicine / Virtual Consultations",
        "Electronic Health Records (EHR) Access",
        "Prescription & Medication Tracking",
        "View and pay hospital bills",
        "Hospital Navigation & Information",
        "Emergency & Support Features"
    ],
      icon: Search,
      color: "bg-blue-500",
      image_name : "/images/remote_care.png"
    },
    {
      title: "Intelligent Referral Management",
      description: [
        "Consultation and review of the case history",
        "Post-treatment Follow-up",
        "Discover top-rated surgeons and hospitals, along with treatment costs and reviews.",
        "Book an appointment for pre-consultation, post surgery consultation, diet consultation and ambulatory services.",
        "mHealth platform is collaborated with leading hospitals for providing intelligent platform for referring surgical cases in India and abroad.",
        "Medical Tourism Referral"
    ],
      icon: Stethoscope,
      color: "bg-green-500",
      image_name : "/images/intellegent_referral_management.png"
    },
    {
      title: "Advanced Hospital Management System (HMS)",
      description: [
        "Integrated Electronic Health Records (EHR/EMR)",
        "Revenue Cycle Management (RCM)",
        "Designed for large or technology-forward hospitals and healthcare networks",
        "Inventory & Pharmacy Management",
        "Radiology/Lab & PACS Integration",
        "OPD / IPD Workflow Management",
        "Feedback & Grievance Module",
        "Cloud-Based: Yes",
        "On-premise: Yes",
        "ABDM-Ready: Yes",
        "Used By: Private hospitals, diagnostics chains",
        "Multi-location & Multi-specialty Support: Yes"
    ],
      icon: Calendar,
      color: "bg-purple-500",
      image_name : "/images/advanced_hims.png"
    },
    // {
    //   title: "Virtual Delivery",
    //   description: "Expand your digital borders with telehealth capabilities.",
    //   icon: Monitor,
    //   color: "bg-orange-500",
    // },
  ];
  
  const plateforms = [
    {
      title: "Product",
      description: "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
      icon: PackageSearch,
      color: "bg-teal-500",
    },
    {
      title: "Features",
      description: "Solutions for payers focused on cost management, analytics, and improving member engagement.",
      icon: Sliders,
      color: "bg-pink-500",
    },
  ];
  
  const mvts = [
    {
      title: "INDIA",
      description: "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
      icon: Globe,
      color: "bg-red-500",
    },
    {
      title: "USA",
      description: "Solutions for payers focused on cost management, analytics, and improving member engagement.",
      icon: Flag,
      color: "bg-yellow-500",
    },
  ];
  
  const appointments = [
    {
      title: "Teleconsultation",
      description: "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
      icon: Video,
      color: "bg-indigo-500",
    },
    {
      title: "Hospital Appointments",
      description: "Solutions for payers focused on cost management, analytics, and improving member engagement.",
      icon: Calendar,
      color: "bg-cyan-500",
    },
  ];
  
  const hospitals = [
    {
      title: "Search Hospitals",
      description: "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
      icon: Hospital,
      color: "bg-rose-500",
    },
    {
      title: "Hospital with surgical facilities",
      description: "Solutions for payers focused on cost management, analytics, and improving member engagement.",
      icon: ScissorsSquareDashedBottom,
      color: "bg-amber-500",
    },
    {
      title: "Gallery",
      description: "Solutions for payers focused on cost management, analytics, and improving member engagement.",
      icon: ImageIcon,
      color: "bg-lime-500",
    },
  ]

  const challenges = [
    {
      title: "Patients",
      subtitle: "Digital health records give patients quick, easy access to their medical history",
      points: [
        "Lack of Access to Trusted Healthcare Providers",
        "Lack of Awareness & Understanding of disease and management",
        "Delays in Diagnosis or Scheduling",
        "Cost & Affordability",
        "Emotional and Mental Stress due to costly and complex surgical procedure",
        "Complex Documentation & Paperwork",
        "Lack of Continuity in Care",
        "Trust & Safety Concerns",
        "Post-Procedure Recovery Challenges",
        "Transportation & Logistics",
        "Queues for registration and doctor consultation",
        "Commute problem for differently abled and chronic disease management",
        "Hassles in carrying medical reports and prescriptions",
        "Difficulty in rescheduling or refund in case of unforeseen circumstances",
      ],
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Doctors",
      subtitle: "Why digital health records are the future of efficient clinical practice",
      points: [
        "Managing patients with multiple chronic conditions.",
        "Balancing patient care with administrative responsibilities.",
        "Effectively communicating with patients and families.",
        "Navigating the complexities of the healthcare system.",
      ],
      icon: Stethoscope,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Hospital/Network Hospitals",
      subtitle: "Streamlined hospital operations and enhanced patient care",
      points: [
        "Patients increasingly demand high service quality, shorter wait times, and billing transparency.",
        "High competition forces hospitals to enhance patient satisfaction or risk losing business to competitors.",
        "Significant administrative effort is needed for insurance claims, affecting efficiency.",
        "Lacks in overseas patients approachability.",
        "Ensuring uniform quality, patient experience, and clinical standards across the network is challenging.",
        "High cost of digital transformation: Implementing hospital information systems (HIS), EMRs, and telehealth is expensive.",
        "Poor interoperability: Lack of seamless integration between departments, especially in multi-site networks.",
      ],
      icon: Building2,
      gradient: "from-purple-500 to-violet-500",
    },
    {
      title: "Data Security and Privacy",
      subtitle: "Crucial protection for the future of digital health records",
      points: [
        "Increased exposure to cyber threats and legal liability for data breaches.",
        "Hospitals are increasingly targeted by ransomware and cybercriminals due to the high value of patient data on the black market.",
        "Data breaches can result in severe legal consequences, including penalties under HIPAA and other regional healthcare compliance laws.",
        "Internet-connected medical devices often lack proper security protocols, becoming easy entry points for attackers.",
        "Without strict access control policies, unauthorized staff may access sensitive data, increasing the risk of internal breaches.",
      ],
      icon: Shield,
      gradient: "from-red-500 to-pink-500",
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b h-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <Link href="/">
                <Image
                  src="/cordeliakare_logo.png" // Make sure logo.png is inside the /public folder
                  alt="Logo"
                  width={180}
                  height={120}
                />
            </Link> 
              {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                cordeliakare
              </span> */}
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* <Link href="#platform" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Platform
              </Link> */}
              <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                  Solutions <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {solutions.map((solution, index) => (
                    <div key={index} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}>
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-muted-foreground">{solution.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                Platform <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {plateforms.map((solution, index) => (
                    <div key={index} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}>
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-muted-foreground">{solution.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              
              <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                  MVT <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {mvts.map((solution, index) => (
                    <div key={index} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}>
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-muted-foreground">{solution.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                Appointments <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {appointments.map((solution, index) => (
                    <div key={index} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}>
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-muted-foreground">{solution.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                Hospitals <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {hospitals.map((solution, index) => (
                    <div key={index} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}>
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-muted-foreground">{solution.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* <Link href="#customer-stories" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Customer Stories
              </Link>
              <Link href="#resources" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Resources
              </Link>
              <Link href="#company" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Company
              </Link> */}
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="relative w-14 h-7 bg-muted rounded-full p-1 transition-colors duration-300 border"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-5 h-5 bg-background rounded-full shadow-md flex items-center justify-center border"
                  animate={{
                    x: theme === "dark" ? 28 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {theme === "dark" ? (
                    <Moon className="h-3 w-3 text-blue-600" />
                  ) : (
                    <Sun className="h-3 w-3 text-orange-500" />
                  )}
                </motion.div>
              </motion.button>

              <Button asChild className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">
                <Link href="https://prod.cordeliakare.com/login">Login</Link>
              </Button>

              {/* Mobile menu button */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-t"
            >
              <div className="px-4 py-4 space-y-4">
                <Link href="#platform" className="block text-sm font-medium">
                  Platform
                </Link>
                <Link href="#solutions" className="block text-sm font-medium">
                  Solutions
                </Link>
                <Link href="#customer-stories" className="block text-sm font-medium">
                  Customer Stories
                </Link>
                <Link href="#resources" className="block text-sm font-medium">
                  Resources
                </Link>
                <Link href="#company" className="block text-sm font-medium">
                  Company
                </Link>
                {/* <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                  Solutions <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {solutions.map((solution, index) => (
                    <div key={index} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}>
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-muted-foreground">{solution.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                Platform <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {plateforms.map((solution, index) => (
                    <div key={index} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}>
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-muted-foreground">{solution.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              
              <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                  MVT <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {mvts.map((solution, index) => (
                    <div key={index} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}>
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-muted-foreground">{solution.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                Appointments <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {appointments.map((solution, index) => (
                    <div key={index} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}>
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-muted-foreground">{solution.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                Hospitals <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {hospitals.map((solution, index) => (
                    <div key={index} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}>
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-muted-foreground">{solution.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="https://prod.cordeliakare.com/login">Login</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
        />

        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              HELLO! MEET THE
            </Badge>
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Transforming   {" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Healthcare</span>
            <br />
            with <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Innovation</span>{" "}
            {/* for
            <br />
            more{" "}
            <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">people.</span> */}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-1 max-w-3xl mx-auto"
          >
            Our comprehensive mHealth integrated solution with HMS enables 
            <br />
            healthcare providers to deliver patient-centric, efficient, and high-quality care. By leveraging mobile technologies, data analytics, and AI-driven insights, we can improve patient outcomes, enhance the patient experience, and optimize healthcare operations
          </motion.p>

          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
              Request A Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              <Play className="mr-2 h-5 w-5" />
              Watch Video
            </Button>
          </motion.div> */}
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20"
        />
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">       
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16 mt-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
            About Cordeliakare
            </motion.h2>
          </motion.div>

          {/* Main Solutions Feature */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground">
              Welcome to Cordeliakare - Transforming Healthcare with Innovation. In the ever-evolving world of digital
              health, Cordeliakare stands as a beacon of innovation, bringing together a complete digital health
              ecosystem.
              </p>
            </motion.div>

            {/* Right Image - Doctor with Mobile Interface */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
            <Image
                src="/images/about_us.png"
                alt="Dr. Nadeem Vaidya Testimonial"
                width={600}
                height={400}
                className=""
              />              
            </motion.div>
          </div>

          
        </div>
      </section>
      {/* Challenges Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-1000/20 dark:to-blue-1000/20 mt-5">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="text-center mb-16"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 mt-6">
        Key Challenges in the Healthcare Ecosystem
      </motion.h2>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {challenges.map((challenge, i) => {
        const index = i + 10; // Unique index offset
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${challenge.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <challenge.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3">{challenge.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{challenge.subtitle}</p>

                <div className="space-y-2 mb-4">
                  {challenge.points
                    .slice(0, openCardsHealth.includes(index) ? challenge.points.length : 3)
                    .map((point, pointIndex) => (
                      <motion.div
                        key={pointIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + pointIndex * 0.1 }}
                        className="flex items-start space-x-2"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs leading-relaxed">{point}</span>
                      </motion.div>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700 text-sm"
                    onClick={() => toggleCard1(index)}
                  >
                    {openCardsHealth.includes(index) ? "Show Less" : "Read More"}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>

                  {["Doctors", "Patients"].includes(challenge.title) && (
                    <button
                      onClick={() => openPopup(challenge)}
                      className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
                    >
                      Install
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  </div>

  {/* Popup Modal */}
  {popupData && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 ">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-3xl w-full relative shadow-lg">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
        {/* <h3 className="text-lg font-semibold mb-2">{popupData.title}</h3> */}
       
        <Image
          src="/images/qr_code_image.jpg"
          alt="Dr. Nadeem Vaidya Testimonial"
          width={300}
          height={100}   // increase height here to show full image
          className="rounded-lg w-full object-contain mb-4"  // use object-contain to keep entire image visible
        />
        {/* <p className="text-sm text-gray-700 dark:text-gray-300">{popupData.description}</p> */}
      </div>
    </div>
  )}
</section>


      {/* Solutions Suite */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">       
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16 mt-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
            Your Trusted Health Platform for Hospitals and Patients
            </motion.h2>
          </motion.div>

          {/* Main Solutions Feature */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold">The real-time digital front door</h3>
              <p className="text-lg text-muted-foreground">
                Guide patients to the right care, at the right location, right now.
              </p>

              <div className="space-y-4">
                {[
                    "Streamline Patient Referrals",
                    "Enhancing Patient Care",
                    "Streamlined Operations",
                    "Empowering Medical Teams",
                    "Improve Patient Outcomes",
                    "Improve Revenue Streams",
                    "Enhanced Accessibility",
                    "Better Decision-Making",
                    "Improved Patient Engagement"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6">
                Request A Demo
              </Button> */}
            </motion.div>

            {/* Right Image - Doctor with Mobile Interface */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
            <Image
                src="/images/helth_care.png"
                alt="Dr. Nadeem Vaidya Testimonial"
                width={600}
                height={400}
                className="w-full h-auto"
              />              
            </motion.div>
          </div>

          
        </div>
      </section>

      {/* Who Can Use Our Platform Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Solutions Grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-10 mt-10"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              Who Can Use Our Platform
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-3">
            {solutions.map((solution, index) => {
              const showAll = expandedCards[index] || false;
              const visibleBenefits = showAll ? solution.description : solution.description.slice(0, 2);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center flex flex-col justify-between h-full">
                      <div>
                      {solution.image_name && (
                        <img
                          src={solution.image_name}
                          alt={solution.title}
                          className="mt-4 w-full h-32 object-cover rounded-xl"
                        />
                      )}
                        <h3 className="text-xl font-bold mb-3 mt-3">{solution.title}</h3>

                        <div className="space-y-4 mb-4">
                          {Array.isArray(solution.description) &&
                            visibleBenefits.map((benefit_sol, i) => (
                              <motion.div
                                key={i}
                                // initial={{ opacity: 0, x: -20 }}
                                // whileInView={{ opacity: 1, x: 0 }}
                                // viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-left space-x-3 text-left"
                              >
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>{benefit_sol}</span>
                              </motion.div>
                            ))}
                        </div>

                        {solution.description.length > 2 && (
                          <button
                            className="text-sm text-blue-500 hover:underline"
                            onClick={() => toggleCard(index)}
                          >
                            {showAll ? "Show Less" : "Read More"}
                          </button>
                        )}
                      </div>

                      
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          {/* End here */}
        </div>
      </section>

      

      {/* Testimonials Section - New */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              Empowering Doctors Everyday
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-16 h-1 bg-blue-600 mx-auto mb-8"></motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Nadeem Vaidya - Ophthalmology</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dr. Nadeem Vaidya from Retina OC, has used technology to run his ophthalmology practice. Using DrChrono
                he has been able to thrive while maintaining full ownership and insights from patient check-in to
                payment disbursement.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Schedule a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Video Testimonial */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
            >
              <Image
                src="/images/testimonial-doctor.png"
                alt="Dr. Nadeem Vaidya Testimonial"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Healthcare System?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join thousands of healthcare providers who trust Cordeliakare to deliver exceptional patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
                Request A Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg border-white text-black hover:bg-green hover:text-blue-600"
              >
                <Link href="https://prod.cordeliakare.com/login" className="flex items-center">
                  Login to Platform
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-10 md:space-y-0">
          
          {/* Logo & About */}
          <div className="max-w-sm space-y-4">
            <div className="flex items-center space-x-2">
              <Link href="/">
                  <Image
                    src="/footer_logo.png" // Make sure logo.png is inside the /public folder
                    alt="Logo"
                    width={200}
                    height={70}
                  />
              </Link> 
            </div>
            <p className="text-sm text-muted-foreground">
              Reimagine the Healthcare IT by using our SaaS product. CordeLiaKare is a scalable product for all different sizes of healthcare providers to manage the operations in a patient centric way.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-sm flex items-center space-x-2"><FaPhoneAlt /><span> +91 96110 11381</span></p>
            <p className="text-sm flex items-center space-x-2 "><FaMapMarkerAlt /><span> GF13 Ajantha Meadows, Third Cross, <br></br>AkshayaNagar, Bangalore - 560068, Karnataka, India</span></p>
            <p className="text-sm flex items-center space-x-2"><FaEnvelope /><span> support@cordeliatech.atlassian.net</span></p>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4 text-xl text-muted-foreground">
              <a href="https://www.facebook.com/profile.php?id=61550846105323" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <FaFacebookF />
              </a>
              <a href="https://x.com/test?lang=en" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/p/C8JQm-ESn1q/?igsh=MTRqdXB1MjkydXZsag%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/cordelia-technology/posts" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom links */}
        <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm ">
          <a href="/pricing" className="hover:underline">Pricing</a>
          <a href="https://prod.cordeliakare.com/hospitals" target="_blank" rel="noopener noreferrer" className="hover:underline">Our Customers</a>
          <a href="/partner" className="hover:underline">Be a Partner</a>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm ">
          © {new Date().getFullYear()} Cordeliatech Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>

    </div>
  )
}
