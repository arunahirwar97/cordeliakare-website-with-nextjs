// app/(auth)/login/page.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import Turnstile from "react-turnstile";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/loading/LoadingComponent";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const [loginType, setLoginType] = useState("patient");
  const searchParams: any = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const [timer, setTimer] = useState(60);


  // Use auth context
  const {
    otpSent,
    otpExpired,
    loading,
    error,
    sendOtp,
    verifyOtp,
    clearError,
    clearOtpState,
  } = useAuth();

  // Cloudflare Turnstile site key (replace with your own)
  const TURNSTILE_SITE_KEY = "1x00000000000000000000AA";

  useEffect(() => {
    setMounted(true);
    clearOtpState()
    clearError()
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    // Cleanup the interval when the component unmounts or timer reaches 0
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  if (!mounted) {
    return null; // Avoid flash of incorrect theme
  }

  // Determine the current theme (handles system preference)
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await sendOtp(phone, loginType);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const response = await verifyOtp(phone, otp, loginType);
    if (response.success) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.back();
      }
    }
  };

  const handleRegisterRedirect = () => {
    const baseRegisterUrl = "/auth/register";
    if (redirectUrl) {
      router.push(`${baseRegisterUrl}?redirect=${redirectUrl}`);
    } else {
      router.push(baseRegisterUrl);
    }
  };

  const handleResendOtp = async () => {
    clearError();
    // clearOtpState();
    setTimer(6);
    await sendOtp(phone, loginType);
  };

  const handleChangeNumber = () => {
    setOtp("");
    clearOtpState();
    clearError();
  };

   if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } p-4`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl shadow-xl overflow-hidden ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                {otpSent
                  ? "Verify OTP"
                  : `Welcome ${loginType === "doctor" ? "Doctor" : ""}`}
              </motion.h1>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                {otpSent
                  ? `Enter OTP sent to +91 ${phone}`
                  : "Sign in with your mobile number"}
              </p>
            </div>

            {/* Login type selector */}
            {/* <div className="flex justify-center mb-6">
              <div
                className={`inline-flex rounded-md shadow-sm ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
                role="group"
              >
                <button
                  type="button"
                  onClick={() => setLoginType("patient")}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                    loginType === "patient"
                      ? isDark
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-purple-600 text-white border-purple-600"
                      : isDark
                      ? "bg-transparent text-gray-300 border-gray-600 hover:bg-gray-600"
                      : "bg-transparent text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType("doctor")}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                    loginType === "doctor"
                      ? isDark
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-purple-600 text-white border-purple-600"
                      : isDark
                      ? "bg-transparent text-gray-300 border-gray-600 hover:bg-gray-600"
                      : "bg-transparent text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Doctor
                </button>
              </div>
            </div> */}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-md mb-4 text-sm ${
                  isDark
                    ? "bg-red-900/30 text-red-300"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {error}
              </motion.div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label
                    htmlFor="phone"
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Mobile Number
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
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      className={`flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-md border ${
                        isDark
                          ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                          : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                      }`}
                      placeholder="9876543210"
                      maxLength={10}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Turnstile
                    sitekey={TURNSTILE_SITE_KEY}
                    onVerify={setCaptchaToken}
                    theme={isDark ? "dark" : "light"}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={loading || phone.length !== 10 || !captchaToken}
                    className={`w-full py-3 px-4 rounded-lg font-semibold shadow-md transition-all duration-300 flex items-center justify-center ${
                      loading || phone.length !== 10 || !captchaToken
                        ? isDark
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : isDark
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </motion.div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label
                    htmlFor="otp"
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    5-digit OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 5))
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                        : "bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                    placeholder="Enter 5-digit OTP"
                    maxLength={5}
                    required
                  />
                </motion.div>

                {otpExpired && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-3 rounded-md text-sm ${
                      isDark
                        ? "bg-yellow-900/30 text-yellow-300"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <p>OTP expired. </p>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className={`mt-1 font-medium ${
                        isDark
                          ? "text-yellow-400 hover:text-yellow-300"
                          : "text-yellow-700 hover:text-yellow-800"
                      }`}
                    >
                      Resend OTP
                    </button>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-4 mb-2"
                >
                  {otpExpired && !loading && (
                    <p
                      className={`text-sm mb-2 ${
                        isDark ? "text-yellow-300" : "text-yellow-700"
                      }`}
                    >
                      OTP has expired.
                    </p>
                  )}
                  {timer > 0 ? (
                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                      Resend OTP in{" "}
                      <span className="font-medium">
                        {String(Math.floor(timer / 60)).padStart(2, "0")}:
                        {String(timer % 60).padStart(2, "0")}s
                      </span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className={`font-medium transition-colors ${
                        loading
                          ? "text-gray-500 cursor-not-allowed"
                          : isDark
                          ? "text-purple-400 hover:text-purple-300"
                          : "text-purple-600 hover:text-purple-800"
                      }`}
                    >
                      {loading ? "Sending..." : "Resend OTP"}
                    </button>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 5}
                    className={`w-full py-3 px-4 rounded-lg font-semibold shadow-md transition-all duration-300 flex items-center justify-center ${
                      loading || otp.length !== 5
                        ? isDark
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : isDark
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Sign In"
                    )}
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center"
                >
                  <button
                    type="button"
                    onClick={handleChangeNumber}
                    className={`text-sm ${
                      isDark
                        ? "text-purple-400 hover:text-purple-300"
                        : "text-purple-600 hover:text-purple-800"
                    } font-medium transition-colors`}
                  >
                    Change Mobile Number
                  </button>
                </motion.div>
              </form>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center"
            >
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                Don't have an account?{" "}
                <button
                  onClick={handleRegisterRedirect}
                  className={`font-medium transition-colors ${
                    isDark
                      ? "text-purple-400 hover:text-purple-300"
                      : "text-purple-600 hover:text-purple-800"
                  }`}
                >
                  Register here
                </button>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
