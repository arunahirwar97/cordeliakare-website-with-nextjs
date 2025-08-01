"use client";

import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Network as NetworkIcon,
  Image as ImageIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  hospitals,
  loginOptions,
  appointments,
  mvts,
  plateforms,
  headersolutions,
} from "@/constants/navConstants";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    solutions: false,
    platform: false,
    surgical: false,
    appointments: false,
    hospitals: false,
  });
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { logout, user, token, setToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (token || localStorage.getItem("token")) {
      setIsLoggedIn(true);
      setIsMenuOpen(false);
    } else {
      setIsLoggedIn(false);
      setIsMenuOpen(false);
    }
  }, [user, token, setToken]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const buildLoginUrl = (baseUrl: string) => {
    if (typeof window === "undefined") {
      return baseUrl;
    }
    const currentPathname = window.location.pathname;
    const existingRedirect = new URLSearchParams(window.location.search).get(
      "redirect"
    );
    if (existingRedirect && !existingRedirect.includes("/auth")) {
      return `${baseUrl}?redirect=${existingRedirect}`;
    }
    if (currentPathname?.includes("/auth") || currentPathname === baseUrl) {
      return baseUrl;
    }
    return `${baseUrl}?redirect=${currentPathname}`;
  };

  const toggleMobileDropdown = (dropdown: any) => {
    setMobileDropdowns((prev: any) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleLogout = () => {
    logout();
    setToken(null);
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b h-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href="/">
              {theme === "dark" ? (
                <Image
                  src="/dark5.jpg"
                  alt="Logo"
                  width={95}
                  height={55}
                  className=""
                />
              ) : (
                <Image
                  src="/cordelia-logo.png"
                  alt="Logo"
                  width={95}
                  height={55}
                  className=""
                />
              )}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 mb-2">
            {/* SOLUTIONS */}
            <div className="relative group">
              <button className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                Solutions <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {headersolutions.map((solution, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-muted rounded-lg cursor-pointer"
                    onClick={() =>
                      router.push(`/solutions?section=${solution.s_id}`)
                    }
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
                    onClick={() =>
                      router.push(`/platform?section=${solution.id}`)
                    }
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
                Medical Tourism <ChevronDown className="ml-1 h-4 w-4" />
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
                        <Link href={`${solution.slug}`}>
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
              <button
                onClick={() => router.push("/appointments")}
                className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Appointments <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {appointments.map((solution, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(solution.url)}
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
                  return (
                    <div
                      key={index}
                      className="p-3 hover:bg-muted rounded-lg cursor-pointer"
                      onClick={()=>{solution.slug ? router.push(solution.slug) : solution.url()}}
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

            {/* Replace the login button with this conditional rendering */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted"
                >
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="hidden text-white md:inline-flex mb-3 bg-red-500 dark:bg-red-700 mt-4 hover:bg-red-700 dark:hover:bg-red-500"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="relative group hidden md:block">
                {/* Desktop Login Button & Dropdown */}
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-1"
                  >
                    Login{" "}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </Link>
                </Button>

                {/* Desktop Dropdown - Hover-based */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  {loginOptions.map((option) => (
                    <Link
                      key={option.title}
                      href={buildLoginUrl(option.url)}
                      className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors border-b last:border-b-0"
                    >
                      <div
                        className={`p-2 ${option.color} rounded-lg flex-shrink-0`}
                      >
                        <option.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{option.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

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
              className="md:hidden bg-background border-t max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Solutions Dropdown */}
                <div>
                  <button
                    onClick={() => toggleMobileDropdown("solutions")}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-blue-600 transition-colors"
                  >
                    Solutions
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        mobileDropdowns.solutions ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileDropdowns.solutions && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-2 space-y-2 max-h-64 overflow-y-auto"
                      >
                        {headersolutions.map((solution, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div
                              className="flex items-center space-x-3"
                              onClick={() =>
                                router.push(
                                  `/solutions?section=${solution.s_id}`
                                )
                              }
                            >
                              <div
                                className={`w-6 h-6 ${solution.color} rounded-lg flex items-center justify-center`}
                              >
                                <solution.icon className="h-3 w-3 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-xs">
                                  {solution.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {solution.description}
                                </div>
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
                    onClick={() => toggleMobileDropdown("platform")}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-blue-600 transition-colors"
                  >
                    Platform
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        mobileDropdowns.platform ? "rotate-180" : ""
                      }`}
                    />
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
                          <div
                            key={index}
                            className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                            onClick={() => {
                              setIsMenuOpen(false);
                              router.push(`/platform?section=${solution.id}`);
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-6 h-6 ${solution.color} rounded-lg flex items-center justify-center`}
                              >
                                <solution.icon className="h-3 w-3 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-xs">
                                  {solution.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {solution.description}
                                </div>
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
                    onClick={() => toggleMobileDropdown("surgical")}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-blue-600 transition-colors"
                  >
                    Surgical Care
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        mobileDropdowns.surgical ? "rotate-180" : ""
                      }`}
                    />
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
                          <div
                            key={index}
                            className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Link href={`${solution.slug}`}>
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
                                  <div
                                    className={`w-6 h-6 ${solution.color} rounded-lg flex items-center justify-center`}
                                  >
                                    <solution.icon className="h-3 w-3 text-white" />
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium text-xs">
                                    {solution.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground ">
                                    {solution.description}
                                  </div>
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
                    onClick={() => toggleMobileDropdown("appointments")}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-blue-600 transition-colors"
                  >
                    Appointments
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        mobileDropdowns.appointments ? "rotate-180" : ""
                      }`}
                    />
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
                          <div
                            key={index}
                            className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                            onClick={() => {
                              setIsMenuOpen(false);
                              router.push(solution.url);
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-6 h-6 ${solution.color} rounded-lg flex items-center justify-center`}
                              >
                                <solution.icon className="h-3 w-3 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-xs">
                                  {solution.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {solution.description}
                                </div>
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
                    onClick={() => toggleMobileDropdown("hospitals")}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-blue-600 transition-colors"
                  >
                    Hospitals
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        mobileDropdowns.hospitals ? "rotate-180" : ""
                      }`}
                    />
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
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setIsMenuOpen(false);
                                solution.slug ? router.push(solution.slug) : solution.url();
                              }}
                              className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-6 h-6 ${solution.color} rounded-lg flex items-center justify-center`}
                                >
                                  <solution.icon className="h-3 w-3 text-white" />
                                </div>
                                <div>
                                  <div className="font-medium text-xs">
                                    {solution.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {solution.description}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {isLoggedIn ? (
                  <Button
                    className="w-full bg-red-500 dark:bg-red-700 dark:text-white mt-4 hover:bg-red-700 dark:hover:bg-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button
                      className="w-full text-white bg-blue-600 hover:bg-blue-700 justify-center"
                      onClick={() => setIsLoginMenuOpen(!isLoginMenuOpen)}
                    >
                      Login
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isLoginMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Button>

                    {/* Login options dropdown */}
                    {isLoginMenuOpen && (
                      <div className="mt-2 space-y-2 pl-4 border-l-2 border-muted">
                        {loginOptions.map((option) => (
                          <Link
                            key={option.title}
                            href={buildLoginUrl(option.url)}
                            onClick={() => {
                              setIsLoginMenuOpen(false);
                              setIsMenuOpen(false);
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors"
                          >
                            <div className={`p-1.5 ${option.color} rounded-md`}>
                              <option.icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm">{option.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
