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
import toast from "react-hot-toast";

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
interface Salutation {
  name: string;
  id: number;
}

// Context value type
interface AuthContextType {
  user: User | null;
  setUser: any;
  setToken: any;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  otpExpired: boolean;
  salutations:any;
  isLoadingSalutations:any;
  sendOtp: (
    phone: string,
    loginType: string
  ) => Promise<{ success: boolean; error?: string }>;
  sendEmailOtp: (
    email: string,
    loginType: string
  ) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (
    phone: string,
    otp: string,
    loginType: string
  ) => Promise<{ success: boolean; error?: string }>;
  verifyEmailOtp: (
    email: string,
    otp: string,
    loginType: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearError: () => void;
  clearOtpState: () => void;
  sendRegistrationOtp: (
    phone: string,
    role: string
  ) => Promise<{ success: boolean; error?: string }>;
  sendEmailRegistrationOtp: (
    email: string,
    role: string
  ) => Promise<{ success: boolean; error?: string }>;
  verifyRegistrationOtp: (
    phone: string,
    otp: string,
    role: string
  ) => Promise<{ success: boolean; error?: string; data?: any }>;
  verifyEmailRegistrationOtp: (
    email: string,
    otp: string,
    role: string
  ) => Promise<{ success: boolean; error?: string; data?: any }>;
}

// Create context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [salutations, setSalutations] = useState<Salutation[]>([]);
  const [isLoadingSalutations, setIsLoadingSalutations] = useState(true);
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
        // console.log("token===>", token);
        if (storedToken && storedUser) {
          setToken(storedToken);
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
    fetchSalutations();
  }, [token]);

  const sendRegistrationOtp = useCallback(
    async (
      phone: string,
      role: string
    ): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);
      setError(null);
      setOtpSent(false);
      setOtpExpired(false);

      try {
        const formattedPhoneNumber = phone.replace(/\s/g, "");
        const response = await axios.post<OtpResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/registrationotp`,
          {
            phone: formattedPhoneNumber,
            login_type: role,
            prefix_code: "91",
          }
        );
        // console.log(response)
        if (response.status === 200) {
          setOtpSent(true);
          toast.success(response.data.data.message);
          console.log(response);
          return { success: true };
        } else {
          const errorMsg =
            response.data.message || "Failed to send registration OTP";
          setError(errorMsg);
          toast.error(errorMsg);
          return { success: false, error: errorMsg };
        }
      } catch (err: any) {
        let errorMsg = "Failed to send registration OTP";

        if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        }
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const verifyRegistrationOtp = useCallback(
    async (
      phone: string,
      otp: string,
      role: string
    ): Promise<{ success: boolean; error?: string; data?: any }> => {
      setLoading(true);
      setError(null);
      setOtpExpired(false);

      try {
        // Remove all non-digit characters from phone number
        const formattedPhone = phone.replace(/\D/g, "");

        const response = await axios.post<VerifyOtpResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otpverification`,
          {
            phone: formattedPhone,
            confirmation_type: "patient",
            otp: otp,
            type: "register",
            prefix_code: "91",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        //  console.log("RESPONSE===>", response);
        if (response.status === 200 || response.status === 201) {
          // Clear OTP state
          setOtpSent(false);
          toast.success(response.data.message!);

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
          toast.error("OTP has expired. Please request a new OTP.");
          setError("OTP has expired. Please request a new OTP.");
          return {
            success: false,
            error: "OTP has expired. Please request a new OTP.",
          };
        } else {
          const errorMsg = response.data.message || "OTP verification failed";
          toast.error(errorMsg);
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
        toast.error(errorMsg);
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const sendEmailRegistrationOtp = useCallback(
    async (
      email: string,
      role: string
    ): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);
      setError(null);
      setOtpSent(false);
      setOtpExpired(false);

      try {
        const response = await axios.post<OtpResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/registrationotp`,
          {
            email: email,
            login_type: role,
            login_method: "email",
          }
        );
        // console.log(response)
        if (response.status === 200) {
          setOtpSent(true);
          toast.success(response.data.data.message);
          console.log(response);
          return { success: true };
        } else {
          const errorMsg =
            response.data.message || "Failed to send registration OTP";
          setError(errorMsg);
          toast.error(errorMsg);
          return { success: false, error: errorMsg };
        }
      } catch (err: any) {
        let errorMsg = "Failed to send registration OTP";

        if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        }
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const verifyEmailRegistrationOtp = useCallback(
    async (
      email: string,
      otp: string,
      role: string
    ): Promise<{ success: boolean; error?: string; data?: any }> => {
      setLoading(true);
      setError(null);
      setOtpExpired(false);
      console.log("Verify otp called step 1")
      try {
        const response = await axios.post<VerifyOtpResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otpverification`,
          {
            email: email,
            confirmation_type: role,
            otp: otp,
            type: "register",
            login_method: "email",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        //  console.log("RESPONSE===>", response);
        if (response.status === 200 || response.status === 201) {
          // Clear OTP state
          setOtpSent(false);
          toast.success(response.data.message!);

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
          toast.error("OTP has expired. Please request a new OTP.");
          setError("OTP has expired. Please request a new OTP.");
          return {
            success: false,
            error: "OTP has expired. Please request a new OTP.",
          };
        } else {
          const errorMsg = response.data.message || "OTP verification failed";
          toast.error(errorMsg);
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
        toast.error(errorMsg);
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const sendOtp = useCallback(
    async (
      phone: string,
      loginType: string
    ): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);
      setError(null);
      setOtpSent(false);
      setOtpExpired(false);

      try {
        const response = await axios.post<OtpResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
          {
            phone: phone,
            login_type: loginType,
            prefix_code: "91",
          }
        );

        if (response.status === 200) {
          setOtpSent(true);
          // console.log(response);
          toast.success(response.data.data.message);
          return { success: true };
        } else {
          const errorMsg = response.data.message || "Failed to send OTP";
          setError(errorMsg);
          toast.error(errorMsg);
          return { success: false, error: errorMsg };
        }
      } catch (err: any) {
        let errorMsg = "Failed to send OTP";

        if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        } else if (err.response?.data?.user_id) {
          errorMsg = "Account inactive. Please contact support.";
        }
        toast.error(errorMsg);
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const sendEmailOtp = useCallback(
    async (
      email: string,
      loginType: string
    ): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);
      setError(null);
      setOtpSent(false);
      setOtpExpired(false);

      try {
        const response = await axios.post<OtpResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
          {
            email: email,
            login_type: loginType,
            login_method: "email",
          }
        );

        if (response.status === 200) {
          setOtpSent(true);
          // console.log(response);
          toast.success(response.data.data.message);
          return { success: true };
        } else {
          const errorMsg = response.data.message || "Failed to send OTP";
          setError(errorMsg);
          toast.error(errorMsg);
          return { success: false, error: errorMsg };
        }
      } catch (err: any) {
        let errorMsg = "Failed to send OTP";

        if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        } else if (err.response?.data?.user_id) {
          errorMsg = "Account inactive. Please contact support.";
        }
        toast.error(errorMsg);
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const verifyOtp = useCallback(
    async (
      phone: string,
      otp: string,
      loginType: string
    ): Promise<{ success: boolean; error?: string }> => {
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
            prefix_code: "91",
          }
        );
        if (response.status === 200) {
          // console.log("response---==", response);
          if (response.data.token && response.data.user) {
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", "patient");

            // Redirect based on role
            // const redirectPath =
            //   loginType === "doctor" ? "/doctor/dashboard" : "/";
            // router.push(redirectPath);
            toast.success(response.data.message!);
            router.back();

            return { success: true };
          } else {
            const errorMsg = "Invalid response from server";
            setError(errorMsg);
            toast.error(errorMsg);
            return { success: false, error: errorMsg };
          }
        } else {
          const errorMsg = response.data.message || "OTP verification failed";
          setError(errorMsg);
          toast.error(errorMsg);
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
        toast.error(errorMsg);
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const verifyEmailOtp = useCallback(
    async (
      email: string,
      otp: string,
      loginType: string
    ): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);
      setError(null);
      setOtpExpired(false);

      try {
        const response = await axios.post<VerifyOtpResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otpverification`,
          {
            email: email,
            confirmation_type: loginType,
            otp: otp,
            type: "login",
            login_method: "email",
          }
        );
        if (response.status === 200) {
          // console.log("response---==", response);
          if (response.data.token && response.data.user) {
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", "patient");

            // Redirect based on role
            // const redirectPath =
            //   loginType === "doctor" ? "/doctor/dashboard" : "/";
            // router.push(redirectPath);
            toast.success(response.data.message!);
            router.back();

            return { success: true };
          } else {
            const errorMsg = "Invalid response from server";
            setError(errorMsg);
            toast.error(errorMsg);
            return { success: false, error: errorMsg };
          }
        } else {
          const errorMsg = response.data.message || "OTP verification failed";
          setError(errorMsg);
          toast.error(errorMsg);
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
        toast.error(errorMsg);
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
    router.push("/");
  }, [router]);

  const fetchSalutations = async () => {
    try {
      setIsLoadingSalutations(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get/salutation`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch salutations");
      }
      const data = await response.json();
      setSalutations(data.data);
      setIsLoadingSalutations(false);
    } catch (error) {
      console.error("Error fetching salutations:", error);
    }
  };

  const clearError = useCallback((): void => setError(null), []);

  const clearOtpState = useCallback((): void => {
    setOtpSent(false);
    setOtpExpired(false);
  }, []);

  const isAuthenticated = !!user && !!token;

  const value: AuthContextType = {
    user,
    setUser,
    setToken,
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
    salutations,
    isLoadingSalutations,
    sendEmailOtp,
    verifyEmailOtp,
    sendEmailRegistrationOtp,
    verifyEmailRegistrationOtp
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
