// context/UserContext.tsx
"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  gender?: number;
  owner?: {
    address?: {
      zip?: string;
      address1?: string;
      city?: string;
      state?: string;
      country?: string;
    };
    patient_unique_id?: string;
  };
}

interface UserContextType {
  userData: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  getUserData: () => Promise<void>;
  updateProfile: (userInfo: UpdateProfileData) => Promise<void>;
  deleteAccount: () => Promise<void>;
  clearMessages: () => void;
}

interface UpdateProfileData {
  selectedGender: "Male" | "Female" | "Others";
  editFirstName: string;
  editLastName: string;
  editEmail: string;
  displayDOB: string;
  premises: string;
  zipCode: string;
  locality: string;
  userState: string;
  userCountry: string;
  imageInfo?: {
    path: string;
  };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const getUserData = async () => {
    const token = getToken();
    if (!token) {
      setError("No authentication token found");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  console.log("USERDATA contxt===>",response)
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userInfo: UpdateProfileData) => {
    const token = getToken();
    if (!token) {
      setError("No authentication token found");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    let genderValue: number;
    switch (userInfo.selectedGender) {
      case "Male":
        genderValue = 0;
        break;
      case "Female":
        genderValue = 1;
        break;
      case "Others":
        genderValue = 2;
        break;
      default:
        genderValue = 2;
    }

    formData.append("register_type", "patient");
    formData.append("first_name", userInfo.editFirstName);
    formData.append("last_name", userInfo.editLastName);
    formData.append("email", userInfo.editEmail);
    formData.append("dob", userInfo.displayDOB);
    formData.append("gender", genderValue.toString());
    formData.append("registration_type", "1");
    formData.append("prefix_code", "91");
    formData.append("address1", userInfo.premises);
    formData.append("address2", "");
    formData.append("zip", userInfo.zipCode);
    formData.append("city", userInfo.locality);
    formData.append("state", userInfo.userState);
    formData.append("country", userInfo.userCountry);
    formData.append("referrel", "");

    if (userInfo.imageInfo) {
      // In Next.js/React, you'll typically have a File object instead of URI
      // You might need to convert the image URI to a File object first
      // This is a placeholder - implementation depends on your image picker
      const file = await uriToFile(userInfo.imageInfo.path);
      formData.append("image", file);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profileupdate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.message);
      await getUserData(); // Refresh user data
    } catch (err) {
      console.error("Profile update failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    const token = getToken();
    if (!token) {
      setError("No authentication token found");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deleteaccount`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Clear user data and token
        setUserData(null);
        localStorage.removeItem("token");
        router.push("/login");
        setSuccessMessage("Account deleted successfully");
      }
    } catch (err) {
      console.error("Account deletion failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to delete account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        error,
        successMessage,
        getUserData,
        updateProfile,
        deleteAccount,
        clearMessages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Helper function to convert URI to File object
async function uriToFile(uri: string): Promise<File> {
  // Implementation depends on how you're getting the image
  // This is a placeholder - you'll need to adapt it to your image picker
  const response = await fetch(uri);
  const blob = await response.blob();
  return new File([blob], "profile-image.png", { type: "image/png" });
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
