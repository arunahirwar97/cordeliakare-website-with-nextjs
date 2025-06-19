"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  Shield,
  Calendar,
  ChevronDown,
  Menu,
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
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

const headersolutions = [
  {
    id: "Patients",
    title: "Patients",
    description:
      "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
    icon: UserPlus,
    color: "bg-blue-500",
    image_name: "/images/rem/patients.png",
  },
  {
    id: "Specialist",
    title: "Specialist",
    description:
      "Solutions for payers focused on cost management, analytics, and improving member engagement.",
    icon: Stethoscope,
    color: "bg-green-500",
    image_name: "/images/rem/specialist.png",
  },
  {
    id: "Clinics",
    title: "Clinics",
    description:
      "Our platform supports providers with patient engagement, workflow optimization, and seamless integrations.",
    icon: BuildingHospital,
    color: "bg-purple-500",
    image_name: "/images/rem/clinics.png",
  },
  {
    id: "Diagnosis_centre",
    title: "Diagnosis Centre",
    description:
      "Our platform supports providers with patient engagement, workflow optimization, and seamless integrations.",
    icon: Microscope,
    color: "bg-red-500",
    image_name: "/images/rem/diagnosis.png",
  },
  {
    id: "network_hospitals",
    title: "Hospitals and Network Hospitals",
    description:
      "Our platform supports providers with patient engagement, workflow optimization, and seamless integrations.",
    icon: NetworkIcon,
    color: "bg-yellow-500",
    image_name: "/images/rem/hospitals.png",
  },
];

const plateforms = [
  {
    title: "Product",
    description:
      "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
    icon: PackageSearch,
    color: "bg-teal-500",
  },
  {
    title: "Features",
    description:
      "Solutions for payers focused on cost management, analytics, and improving member engagement.",
    icon: Sliders,
    color: "bg-pink-500",
  },
];

const mvts = [
  {
    title: "Patient in India",
    slug: "india",
    description:
      "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
    icon: Flag,
    color: "bg-red-500",
  },
  {
    title: "Patient in Abroad",
    slug: "abroad",
    description:
      "Solutions for payers focused on cost management, analytics, and improving member engagement.",
    icon: Globe,
    color: "bg-yellow-500",
  },
];

const appointments = [
  {
    title: "Teleconsultation",
    description:
      "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
    icon: Video,
    color: "bg-indigo-500",
  },
  {
    title: "Hospital Appointments",
    description:
      "Solutions for payers focused on cost management, analytics, and improving member engagement.",
    icon: Calendar,
    color: "bg-cyan-500",
  },
];

const hospitals = [
  {
    title: "Search Hospitals",
    description:
      "We provide comprehensive tools tailored for hospitals and health systems to improve care coordination and patient outcomes.",
    icon: Hospital,
    color: "bg-rose-500",
    url: "https://prod.cordeliakare.com/hospitals",
  },
  {
    title: "Hospital With Surgical Cacilities",
    description:
      "Solutions for payers focused on cost management, analytics, and improving member engagement.",
    icon: ScissorsSquareDashedBottom,
    color: "bg-amber-500",
  },
  {
    title: "Gallery",
    description:
      "Solutions for payers focused on cost management, analytics, and improving member engagement.",
    icon: ImageIcon,
    color: "bg-lime-500",
    url: "https://prod.cordeliakare.com/gallery",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    solutions: false,
    platform: false,
    surgical: false,
    appointments: false,
    hospitals: false,
  });
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileDropdown = (dropdown) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b h-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/">
              <Image
                src="/cordeliakare_logo.png"
                alt="Logo"
                width={120}
                height={65}
                className="dark:bg-gray-200 rounded-full "
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 mb-2">
            <div className="relative group">
              <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                Solutions <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {headersolutions.map((solution, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-muted rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}
                      >
                        <solution.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {solution.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {solution.description}
                        </div>
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
                  <div
                    key={index}
                    className="p-3 hover:bg-muted rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}
                      >
                        <solution.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {solution.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {solution.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                Surgical Care <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {mvts.map((solution, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-muted rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      {solution.slug === "india" ? (
                        <Image
                          src="/images/indian-flag.png"
                          alt="Indian Flag"
                          width={24}
                          height={26}
                          className="mb-10"
                        />
                      ) : (
                        <div
                          className={`w-10 h-8 ${solution.color} rounded-lg flex items-center justify-center`}
                        >
                          <solution.icon className="h-4 w-6 text-white" />
                        </div>
                      )}
                      <div>
                        <Link href={`/surgical-care/${solution.slug}`}>
                          <div className="font-medium text-sm">
                            {solution.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {solution.description}
                          </div>
                        </Link>
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
                  <div
                    key={index}
                    className="p-3 hover:bg-muted rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}
                      >
                        <solution.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {solution.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {solution.description}
                        </div>
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
                {hospitals.map((solution, index) => {
                  const Wrapper = solution.url ? "a" : "div";
                  return (
                    <Wrapper
                      key={index}
                      href={solution.url || undefined}
                      target={solution.url ? "_blank" : undefined}
                      rel={solution.url ? "noopener noreferrer" : undefined}
                      className="block"
                    >
                      <div className="p-3 hover:bg-muted rounded-lg cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 ${solution.color} rounded-lg flex items-center justify-center`}
                          >
                            <solution.icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {solution.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {solution.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-2">
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

            <Button
              asChild
              className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700"
            >
              <Link href="https://prod.cordeliakare.com/login">Login</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
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
                {/* Solutions Dropdown */}
                <div>
                  <button 
                    onClick={() => toggleMobileDropdown('solutions')}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-blue-600 transition-colors"
                  >
                    Solutions 
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${mobileDropdowns.solutions ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileDropdowns.solutions && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-2 space-y-2"
                      >
                        {headersolutions.map((solution, index) => (
                          <div key={index} className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 ${solution.color} rounded-lg flex items-center justify-center`}>
                                <solution.icon className="h-3 w-3 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-xs">{solution.title}</div>
                                <div className="text-xs text-muted-foreground line-clamp-2">{solution.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Platform Dropdown */}
                <div>
                  <button 
                    onClick={() => toggleMobileDropdown('platform')}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-blue-600 transition-colors"
                  >
                    Platform 
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${mobileDropdowns.platform ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileDropdowns.platform && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-2 space-y-2"
                      >
                        {plateforms.map((solution, index) => (
                          <div key={index} className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 ${solution.color} rounded-lg flex items-center justify-center`}>
                                <solution.icon className="h-3 w-3 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-xs">{solution.title}</div>
                                <div className="text-xs text-muted-foreground line-clamp-2">{solution.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Surgical Care Dropdown */}
                <div>
                  <button 
                    onClick={() => toggleMobileDropdown('surgical')}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-blue-600 transition-colors"
                  >
                    Surgical Care 
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${mobileDropdowns.surgical ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileDropdowns.surgical && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-2 space-y-2"
                      >
                        {mvts.map((solution, index) => (
                          <div key={index} className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                            <Link href={`/surgical-care/${solution.slug}`}>
                              <div className="flex items-center space-x-3">
                                {solution.slug === "india" ? (
                                  <Image
                                    src="/images/indian-flag.png"
                                    alt="Indian Flag"
                                    width={20}
                                    height={20}
                                    className="rounded"
                                  />
                                ) : (
                                  <div className={`w-6 h-6 ${solution.color} rounded-lg flex items-center justify-center`}>
                                    <solution.icon className="h-3 w-3 text-white" />
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium text-xs">{solution.title}</div>
                                  <div className="text-xs text-muted-foreground line-clamp-2">{solution.description}</div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Appointments Dropdown */}
                <div>
                  <button 
                    onClick={() => toggleMobileDropdown('appointments')}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-blue-600 transition-colors"
                  >
                    Appointments 
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${mobileDropdowns.appointments ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileDropdowns.appointments && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-2 space-y-2"
                      >
                        {appointments.map((solution, index) => (
                          <div key={index} className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 ${solution.color} rounded-lg flex items-center justify-center`}>
                                <solution.icon className="h-3 w-3 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-xs">{solution.title}</div>
                                <div className="text-xs text-muted-foreground line-clamp-2">{solution.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hospitals Dropdown */}
                <div>
                  <button 
                    onClick={() => toggleMobileDropdown('hospitals')}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-blue-600 transition-colors"
                  >
                    Hospitals 
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${mobileDropdowns.hospitals ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileDropdowns.hospitals && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-2 space-y-2"
                      >
                        {hospitals.map((solution, index) => {
                          const Wrapper = solution.url ? "a" : "div";
                          return (
                            <Wrapper
                              key={index}
                              href={solution.url || undefined}
                              target={solution.url ? "_blank" : undefined}
                              rel={solution.url ? "noopener noreferrer" : undefined}
                              className="block"
                            >
                              <div className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-6 h-6 ${solution.color} rounded-lg flex items-center justify-center`}>
                                    <solution.icon className="h-3 w-3 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-xs">{solution.title}</div>
                                    <div className="text-xs text-muted-foreground line-clamp-2">{solution.description}</div>
                                  </div>
                                </div>
                              </div>
                            </Wrapper>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                >
                  <Link href="https://prod.cordeliakare.com/login">Login</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}