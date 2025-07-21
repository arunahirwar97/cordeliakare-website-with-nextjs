"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

interface EmailVerificationProps {
  onVerified: (email: string) => void;
  isDark: boolean;
}

export default function EmailVerification({
  onVerified,
  isDark,
}: EmailVerificationProps) {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sendEmailRegistrationOtp, verifyEmailRegistrationOtp } = useAuth();
  const [timer, setTimer] = useState<number>(60);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleResendOtp = async () => {
    setTimer(60);
    setIsLoading(true);
    try {
      await sendEmailRegistrationOtp(email, "patient");
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

  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const result = await sendEmailRegistrationOtp(email, "patient");
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
    setIsLoading(true);
    try {
      const result = await verifyEmailRegistrationOtp(email, otp, "patient");
      // console.log(result)
      if (result.success) {
        onVerified(email);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border ${
            isDark
              ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
              : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          }`}
          placeholder="your@email.com"
          disabled={otpSent}
        />
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

          {/* ✅ TIMER/RESEND BLOCK  */}
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
            disabled={!email || isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              !email || isLoading
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
              Change Email Address
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
