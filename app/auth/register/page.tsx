"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneVerification from "./steps/phone-verification";
import CompleteProfile from "./steps/complete-profile";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import PublicRoute from "@/components/auth/PublicRoute";

export default function IndianRegistration() {
  const [step, setStep] = useState<number>(1);
  const [phone, setPhone] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme } = useTheme();

  // Ensure component is mounted before using theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to light theme during SSR to avoid hydration mismatch
  const isDark = mounted ? theme === "dark" : false;

  const handlePhoneVerified = (verifiedPhone: string) => {
    setPhone(verifiedPhone);
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
                Indian Patient Registration
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
                  <PhoneVerification
                    onVerified={handlePhoneVerified}
                    isDark={isDark}
                  />
                </div>
              )}
              {step === 2 && verified && (
                <CompleteProfile phone={phone} isDark={isDark} />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PublicRoute>
  );
}
