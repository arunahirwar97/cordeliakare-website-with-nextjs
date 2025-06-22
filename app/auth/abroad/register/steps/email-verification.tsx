'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface EmailVerificationProps {
  onVerified: (email: string) => void;
  isDark: boolean;
}

export default function EmailVerification({ onVerified, isDark }: EmailVerificationProps) {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      toast.success('OTP sent successfully!');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      onVerified(email);
      toast.success('Email verified successfully!');
    } catch (error) {
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border ${
            isDark
              ? 'bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500'
              : 'bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500'
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
          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            OTP Verification Code
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500'
                : 'bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500'
            }`}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
          />
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
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : isDark
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            } transition-colors`}
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            disabled={!otp || otp.length !== 6 || isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              !otp || otp.length !== 6 || isLoading
                ? isDark
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : isDark
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            } transition-colors`}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP & Continue'}
          </button>
        )}
      </motion.div>
    </div>
  );
}