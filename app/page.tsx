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

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const solutions = [
    {
      title: "Digital Discovery",
      description: "Guide patients to the right care, at the right location, right now.",
      icon: Search,
      color: "bg-blue-500",
    },
    {
      title: "Care Navigation",
      description: "Streamline patient journeys with intelligent routing and scheduling.",
      icon: Stethoscope,
      color: "bg-green-500",
    },
    {
      title: "Smart Scheduling",
      description: "Reduce booking friction with automated appointment management.",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "Virtual Delivery",
      description: "Expand your digital borders with telehealth capabilities.",
      icon: Monitor,
      color: "bg-orange-500",
    },
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
      ],
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Doctors",
      subtitle: "Why digital health records are the future of efficient clinical practice",
      points: [
        "Managing patients with multiple chronic conditions",
        "Balancing patient care with administrative responsibilities",
        "Effectively communicating with patients and families",
      ],
      icon: Stethoscope,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Hospital/Network Hospitals",
      subtitle: "Streamlined hospital operations and enhanced patient care",
      points: [
        "Patients demand high service quality and shorter wait times",
        "High competition forces hospitals to enhance patient satisfaction",
        "Administrative effort needed for insurance claims affects efficiency",
      ],
      icon: Building2,
      gradient: "from-purple-500 to-violet-500",
    },
    {
      title: "Data Security and Privacy",
      subtitle: "Crucial protection for the future of digital health records",
      points: [
        "Increased exposure to cyber threats and legal liability",
        "Hospitals targeted by ransomware due to high-value patient data",
        "Data breaches result in severe legal consequences under HIPAA",
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
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <Link href="/">
                <Image
                  src="/cordeliakare_logo.png" // Make sure logo.png is inside the /public folder
                  alt="Logo"
                  width={80}
                  height={50}
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
        />

        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              HELLO! MEET THE
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            The{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">capacity</span>
            <br />
            to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">care</span>{" "}
            for
            <br />
            more{" "}
            <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">people.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Our HIMS System brings Hospitals and patients on one platform.
            <br />
            More care and less stress — simplify access, free up clinicians, and watch your system grow.
          </motion.p>

          <motion.div
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
          </motion.div>
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
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              About Cordeliakare
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Welcome to Cordeliakare - Transforming Healthcare with Innovation. In the ever-evolving world of digital
              health, Cordeliakare stands as a beacon of innovation, bringing together a complete digital health
              ecosystem.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Suite */}
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
              Solutions Suite
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
                  "Expand your digital borders",
                  "Effortlessly guide patients to care",
                  "Reduce booking friction",
                  "Offload and create capacity",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6">
                Request A Demo
              </Button>
            </motion.div>

            {/* Right Image - Doctor with Mobile Interface */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Placeholder for doctor image with mobile interface */}
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-8 text-center">
                  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full flex items-center justify-center mb-4">
                    <Stethoscope className="h-24 w-24 text-blue-600" />
                  </div>
                  <p className="text-muted-foreground">Doctor using mobile platform interface</p>
                </div>

                {/* Floating appointment cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">CS</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Dr. Chris Smith</p>
                      <p className="text-xs text-muted-foreground">9:00 AM</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  className="absolute top-1/2 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">TL</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Dr. Tina Lopez</p>
                      <p className="text-xs text-muted-foreground">10:30 AM</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Solutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
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
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${solution.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <solution.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                    <p className="text-muted-foreground text-sm">{solution.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Use Our Platform Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              Who Can Use Our Platform
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Patients",
                description:
                  "Access to digital prescriptions, appointment booking, health records, and reminders — all in one app. Seamlessly manage your health from home.",
                buttonText: "Install Now",
                buttonVariant: "default" as const,
              },
              {
                title: "Specialists",
                description:
                  "Simplified patient scheduling, digital reports, and AI-powered insights to improve consultations and save time.",
                buttonText: "Install Now",
                buttonVariant: "default" as const,
              },
              {
                title: "Clinics",
                description:
                  "Digital queue management, prescription writing, patient database and more to boost productivity and satisfaction.",
                buttonText: "Learn More",
                buttonVariant: "default" as const,
              },
              {
                title: "Diagnosis Centre",
                description:
                  "Easy test scheduling, report upload, and integration with hospitals and patients. Reduce manual work and errors.",
                buttonText: "View Demo",
                buttonVariant: "default" as const,
              },
              {
                title: "Hospitals & Network Hospitals",
                description:
                  "End-to-end hospital solution: OPD/IPD management, doctor-patient scheduling, record tracking, insurance integration & more.",
                buttonText: "View Demo",
                buttonVariant: "default" as const,
              },
            ].map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-4">{platform.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{platform.description}</p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full" size="sm">
                      {platform.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              Key Challenges in the Healthcare Ecosystem
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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

                    <div className="space-y-2 mb-6">
                      {challenge.points.map((point, pointIndex) => (
                        <motion.div
                          key={pointIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + pointIndex * 0.1 }}
                          className="flex items-start space-x-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs leading-relaxed">{point}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
                variant="outline"
                className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-blue-600"
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                cordeliakare
              </span>
            </div>
            <div className="text-sm text-muted-foreground">© 2024 Cordeliakare. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
