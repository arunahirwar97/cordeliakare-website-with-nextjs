"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

// Types (could also be in a separate types.ts file)
type MvtApiResponse = {
  success: boolean;
  data: any;
};

type Doctor = {
  doctor_id: number;
  first_name: string;
  last_name: string;
  email: string;
  qualification: string;
  specialist: string;
  total_experience: string | null;
  address: {
    address1: string;
    address2: string | null;
    city: string;
    zip: string;
    state: string;
    country: string;
  } | null;
};

type DoctorsByDepartment = {
  [department: string]: Doctor[];
};

type DoctorsByTenantResponse = {
  success: boolean;
  data: DoctorsByDepartment;
  message?: string;
};

type MVTContextType = {
  loading: boolean;
  error: string | null;
  mvtPackages: any;
  galleryImages: GalleryItem[];
  getMvtPackages: (departmentName: string) => Promise<void>;
  getHospitalByPackage: (packageId: any) => Promise<any>;
  getPackageAmount: (packageId: number) => Promise<any>; // Add this line
  getDoctorsByTenant: (packageId: number) => Promise<DoctorsByTenantResponse>;
  getGalleryImages: (packageId: number) => Promise<GalleryResponse>;
};

type GalleryItem = {
  id: number;
  name: string | null;
  description: string | null;
  image_url: string;
  hospital_info: {
    hospital_name: string;
    tenant_id: string;
  };
  media: {
    id: number;
    url: string;
    mime_type: string;
    size: number;
    created_at: string;
  }[];
};

type GalleryResponse = {
  success: boolean;
  data: GalleryItem[];
  message?: string;
};

const MVTContext = createContext<MVTContextType | undefined>(undefined);

export const MVTProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mvtPackages, setMvtPackages] = useState<any>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);

  const getMvtPackages = async (departmentName: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post<MvtApiResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surgeries/by-department`,
        {
          department_name: departmentName,
        }
      );

      if (response.data.success) {
        console.log(response);
        setMvtPackages(response.data);
      } else {
        throw new Error("Failed to fetch packages");
      }
    } catch (err) {
      console.error(err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Failed to fetch packages"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getHospitalByPackage = async (packageId: any) => {
    try {
      setLoading(true);
      setError(null);

      // Ensure packageId is properly converted to number
      const numericPackageId =
        typeof packageId === "string" ? parseInt(packageId, 10) : packageId;

      if (isNaN(numericPackageId)) {
        throw new Error("Invalid package ID");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surgeries/hospital`,
        {},
        {
          params: { package_id: numericPackageId },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch hospital data"
        );
      }
    } catch (err) {
      console.log(err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Failed to fetch hospital data"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPackageAmount = async (packageId: number) => {
    try {
      setLoading(true);
      setError(null);

      const numericPackageId =
        typeof packageId === "string" ? parseInt(packageId, 10) : packageId;

      if (isNaN(numericPackageId)) {
        throw new Error("Invalid package ID");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surgeries/package-amount`,
        {
          package_id: numericPackageId,
        }
      );

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch package amount"
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Failed to fetch package amount"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getDoctorsByTenant = async (
    packageId: number
  ): Promise<DoctorsByTenantResponse> => {
    try {
      setLoading(true);
      setError(null);

      const numericPackageId =
        typeof packageId === "string" ? parseInt(packageId, 10) : packageId;

      if (isNaN(numericPackageId)) {
        throw new Error("Invalid package ID");
      }

      const response = await axios.post<DoctorsByTenantResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surgeries/getdoctorsbytenant`,
        {
          package_id: numericPackageId,
        }
      );

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch doctors data"
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Failed to fetch doctors data"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getGalleryImages = async (packageId: number) => {
    try {
      setLoading(true);
      setError(null);

      const numericPackageId =
        typeof packageId === "string" ? parseInt(packageId, 10) : packageId;

      if (isNaN(numericPackageId)) {
        throw new Error("Invalid package ID");
      }

      const response = await axios.post<GalleryResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surgeries/gallery`,
        {
          package_id: numericPackageId,
        }
      );

      if (response.data.success) {
        setGalleryImages(response.data.data);
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch gallery images"
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Failed to fetch gallery images"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: MVTContextType = {
    loading,
    error,
    mvtPackages,
    getMvtPackages,
    getHospitalByPackage,
    getPackageAmount,
    getDoctorsByTenant,
    galleryImages,
    getGalleryImages,
  };

  return <MVTContext.Provider value={value}>{children}</MVTContext.Provider>;
};

export const useMVT = (): MVTContextType => {
  const context = useContext(MVTContext);
  if (context === undefined) {
    throw new Error("useMVT must be used within a MVTProvider");
  }
  return context;
};
