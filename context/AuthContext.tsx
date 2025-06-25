// context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// User type definition
interface User {
  id: string;
  phone: string;
  role: string;
  name?: string;
  email?: string;
  // Add other user properties as needed
}

// API response types
interface OtpResponse {
  success: boolean;
  message?: string;
}

interface VerifyOtpResponse {
  success: boolean;
  token?: string;
  user?: User;
  data?: any;
  message?: string;
}

interface ApiErrorResponse {
  message?: string;
  user_id?: string;
}

// Context value type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  otpExpired: boolean;
  sendOtp: (phone: string, loginType: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (phone: string, otp: string, loginType: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearError: () => void;
  clearOtpState: () => void;
  sendRegistrationOtp: (phone: string, role: string) => Promise<{ success: boolean; error?: string }>;
  verifyRegistrationOtp: (phone: string, otp: string, role: string) => Promise<{ success: boolean; error?: string; data?: any }>;
}

// Create context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpExpired, setOtpExpired] = useState<boolean>(false);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser) as User);
        }
      } catch (err) {
        console.error("Failed to initialize auth", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const sendRegistrationOtp = useCallback(
    async (phone: string, role: string): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);
      setError(null);
      setOtpSent(false);
      setOtpExpired(false);

      try {
        const formattedPhoneNumber = phone.replace(/\D/g, "");
        const response = await axios.post<OtpResponse>(
          `https://dev.cordeliakare.com/api/registrationotp`,
          {
            phone: formattedPhoneNumber,
            login_type: role,
            prefix_code: "91",
          }
        );

        if (response.status === 200) {
          setOtpSent(true);
          return { success: true };
        } else {
          const errorMsg =
            response.data.message || "Failed to send registration OTP";
          setError(errorMsg);
          return { success: false, error: errorMsg };
        }
      } catch (err: any) {
        let errorMsg = "Failed to send registration OTP";

        if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        }

        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const verifyRegistrationOtp = useCallback(
    async (phone: string, otp: string, role: string): Promise<{ success: boolean; error?: string; data?: any }> => {
      setLoading(true);
      setError(null);
      setOtpExpired(false);

      try {
        // Remove all non-digit characters from phone number
        const formattedPhone = phone.replace(/\D/g, "");

        if (!otp.trim()) {
          setError("OTP is invalid");
          return { success: false, error: "OTP is invalid" };
        }

        const response = await axios.post<VerifyOtpResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otpverification`,
          {
            phone: formattedPhone,
            confirmation_type: role,
            otp: otp,
            type: "register",
            prefix_code: "91",
          }
        );

        if (response.status === 200 || response.status === 201) {
          // Clear OTP state
          setOtpSent(false);

          // Return success with response data
          return {
            success: true,
            data: response.data,
          };
        } else if (
          response.status === 400 &&
          response.data.message === "Your Otp Expired!!!"
        ) {
          setOtpExpired(true);
          setError("OTP has expired. Please request a new OTP.");
          return {
            success: false,
            error: "OTP has expired. Please request a new OTP.",
          };
        } else {
          const errorMsg = response.data.message || "OTP verification failed";
          setError(errorMsg);
          return { success: false, error: errorMsg };
        }
      } catch (err: any) {
        let errorMsg = "Invalid OTP";

        if (err.response?.data?.message === "Your Otp Expired!!!") {
          setOtpExpired(true);
          errorMsg = "OTP expired. Please request a new one.";
        } else if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        } else if (err.message) {
          errorMsg = err.message;
        }

        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    []
  );

    const sendOtp = useCallback(async (phone: string, loginType: string): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);
      setError(null);
      setOtpSent(false);
      setOtpExpired(false);

      try {
        const response = await axios.post<OtpResponse>(
          "https://dev.cordeliakare.com/api/login",
          {
            phone: phone,
            login_type: loginType,
            prefix_code: "91",
          }
        );

        if (response.status === 200) {
          setOtpSent(true);
          return { success: true };
        } else {
          const errorMsg = response.data.message || "Failed to send OTP";
          setError(errorMsg);
          return { success: false, error: errorMsg };
        }
      } catch (err: any) {
        let errorMsg = "Failed to send OTP";

        if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        } else if (err.response?.data?.user_id) {
          errorMsg = "Account inactive. Please contact support.";
        }

        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    }, []);

  const verifyOtp = useCallback(
    async (phone: string, otp: string, loginType: string): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);
      setError(null);
      setOtpExpired(false);

      try {
        const response = await axios.post<VerifyOtpResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otpverification`,
          {
            phone: phone.replace(/\D/g, ""),
            confirmation_type: loginType,
            otp: otp,
            type: "login",
            prefix_code: "+91",
          }
        );

        if (response.status === 200) {
          if (response.data.token && response.data.user) {
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // Redirect based on role
            const redirectPath =
              loginType === "doctor" ? "/doctor/dashboard" : "/dashboard";
            router.push(redirectPath);

            return { success: true };
          } else {
            const errorMsg = "Invalid response from server";
            setError(errorMsg);
            return { success: false, error: errorMsg };
          }
        } else {
          const errorMsg = response.data.message || "OTP verification failed";
          setError(errorMsg);
          return { success: false, error: errorMsg };
        }
      } catch (err: any) {
        let errorMsg = "Invalid OTP";

        if (err.response?.data?.message === "Your Otp Expired!!!") {
          setOtpExpired(true);
          errorMsg = "OTP expired. Please request a new one.";
        } else if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        }

        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback((): void => {
    setUser(null);
    setToken(null);
    setOtpSent(false);
    setOtpExpired(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }, [router]);

  const clearError = useCallback((): void => setError(null), []);

  const clearOtpState = useCallback((): void => {
    setOtpSent(false);
    setOtpExpired(false);
  }, []);

  const isAuthenticated = !!user && !!token;

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    otpSent,
    otpExpired,
    sendOtp,
    verifyOtp,
    logout,
    clearError,
    clearOtpState,
    sendRegistrationOtp,
    verifyRegistrationOtp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}