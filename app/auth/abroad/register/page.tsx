"use client";

import { useState, useEffect } from "react";
import EmailVerification from "./steps/email-verification";
import CompleteProfile from "./steps/complete-profile";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import PublicRoute from "@/components/auth/PublicRoute";

export default function InternationalRegistration() {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEmailVerified = (verifiedEmail: string) => {
    setEmail(verifiedEmail);
    setVerified(true);
    setStep(2);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Render a neutral version during SSR
  if (!mounted) {
    return (
      <PublicRoute>
        <div className="min-h-screen bg-gray-50">
          <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto space-y-8">
              {/* Simplified header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  International Patient Registration
                </h1>
                <div className="flex justify-center space-x-2 mb-6">
                  {[1, 2].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`h-2 w-8 rounded-full ${
                        step >= stepNumber ? "bg-purple-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Simplified content */}
              <div className="max-w-md mx-auto">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicRoute>
    );
  }

  // Full render with theme support after mount
  const isDark = theme === "dark";

  return (
    <PublicRoute>
      <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto space-y-8"
          >
            {/* Header */}
            <motion.div variants={containerVariants} className="text-center">
              <h1
                className={`text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-2`}
              >
                International Patient Registration
              </h1>
              <div className="flex justify-center space-x-2 mb-6">
                {[1, 2].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`h-2 w-8 rounded-full ${
                      step >= stepNumber
                        ? isDark
                          ? "bg-purple-500"
                          : "bg-purple-600"
                        : isDark
                        ? "bg-gray-700"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Step Content */}
            <motion.div
              key={step}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mx-auto"
            >
              {step === 1 && (
                <div className="max-w-md mx-auto">
                  <EmailVerification
                    onVerified={handleEmailVerified}
                    isDark={isDark}
                  />
                </div>
              )}
              {step === 2 && verified && (
                <CompleteProfile email={email} isDark={isDark} />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PublicRoute>
  );
}
