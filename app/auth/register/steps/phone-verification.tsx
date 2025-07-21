"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface PhoneVerificationProps {
  onVerified: (phone: string) => void;
  isDark: boolean;
}

export default function PhoneVerification({
  onVerified,
  isDark,
}: PhoneVerificationProps) {
  const { sendRegistrationOtp, verifyRegistrationOtp } = useAuth();
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);

  // Ensure component is mounted before showing dynamic content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    // Cleanup the interval
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) return;

    setIsLoading(true);
    try {
      const result = await sendRegistrationOtp(phone, "patient");
      if (result.success) {
        setOtpSent(true);
      } else {
        // Handle error (result.error contains the error message)
        console.error("OTP send failed:", result.error);
      }
    } catch (error: any) {
      console.error("Error sending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    // if (!otp || otp.length !== 5) return;

    setIsLoading(true);
    try {
      const result = await verifyRegistrationOtp(phone, otp, "user");
      // console.log(result)
      if (result.success) {
        onVerified(phone);
      } else {
        // Handle error (result.error contains the error message)
        // console.error('OTP verification failed:', result);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setTimer(60);
    setIsLoading(true);
    try {
      await sendRegistrationOtp(phone, "patient");
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeEmail = () => {
    setOtpSent(false);
    setOtp("");
    setTimer(60);
  };

  // Don't render dynamic content until mounted
  if (!isMounted) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label
            className={`block text-sm font-medium mb-1 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Indian Mobile Number
          </label>
          <div className="flex">
            <span
              className={`inline-flex items-center px-3 rounded-l-md border border-r-0 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              }`}
            >
              +91
            </span>
            <input
              type="tel"
              value=""
              className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                  : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              }`}
              placeholder="9876543210"
              maxLength={10}
              disabled
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <button
            disabled
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              isDark
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            } transition-colors`}
          >
            Send OTP
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <label
          className={`block text-sm font-medium mb-1 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Indian Mobile Number
        </label>
        <div className="flex">
          <span
            className={`inline-flex items-center px-3 rounded-l-md border border-r-0 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-gray-100 border-gray-300 text-gray-500"
            }`}
          >
            +91
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            }`}
            placeholder="9876543210"
            maxLength={10}
            disabled={otpSent}
          />
        </div>
      </motion.div>

      {otpSent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label
            className={`block text-sm font-medium mb-1 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            OTP Verification Code
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            }`}
            placeholder="Enter 5-digit OTP"
            maxLength={5}
          />

          {/* ✅ TIMER/RESEND BLOCK */}
          <div className="text-center mt-4">
            {timer > 0 ? (
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                Resend OTP in <span className="font-medium">{timer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className={`font-medium transition-colors ${
                  isLoading
                    ? "text-gray-500 cursor-not-allowed"
                    : isDark
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-800"
                }`}
              >
                Resend OTP
              </button>
            )}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-4"
      >
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={!phone || phone.length !== 10 || isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              !phone || phone.length !== 10 || isLoading
                ? isDark
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                : isDark
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            } transition-colors`}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        ) : (
          <>
            <button
              onClick={handleVerifyOtp}
              disabled={!otp || otp.length !== 5 || isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                !otp || otp.length !== 5 || isLoading
                  ? isDark
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : isDark
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              } transition-colors`}
            >
              {isLoading ? "Verifying..." : "Verify OTP & Continue"}
            </button>

            <button
              type="button"
              onClick={handleChangeEmail}
              disabled={isLoading}
              className={`w-full text-center text-sm mt-4 font-medium transition-colors ${
                isDark
                  ? "text-purple-400 hover:text-purple-300"
                  : "text-purple-600 hover:text-purple-800"
              }`}
            >
              Change Phone Number
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
