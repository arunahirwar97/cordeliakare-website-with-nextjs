"use client";

import { motion } from "framer-motion";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "@/components/loading/LoadingComponent";
import toast from "react-hot-toast";
import { useMVT } from "@/context/MVT_Context";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { testMvtPackages, SearchData, PackageWithDistance } from "./Data";

// Declare Google Maps types
declare global {
  interface Window {
    google: any;
  }
}

const DoctorResults = () => {
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const initialLocation: any = searchParams?.get("location");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [packagesWithDistance, setPackagesWithDistance] = useState<
    PackageWithDistance[]
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { getMvtPackages, mvtPackages, error, loading: apiLoading } = useMVT();
  const [filterText, setFilterText] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // Sort packages based on search relevance instead of filtering
  const sortedPackages = useMemo(() => {
    if (!filterText.trim()) {
      return packagesWithDistance;
    }

    const searchTerm = filterText.toLowerCase();

    return [...packagesWithDistance].sort((a, b) => {
      const aTitle = a.surgery.title.toLowerCase();
      const bTitle = b.surgery.title.toLowerCase();

      const aMatches = aTitle.includes(searchTerm);
      const bMatches = bTitle.includes(searchTerm);

      // If only one matches, prioritize it
      if (aMatches && !bMatches) return -1;
      if (bMatches && !aMatches) return 1;

      // If both match, sort by relevance
      if (aMatches && bMatches) {
        // Exact match comes first
        if (aTitle === searchTerm && bTitle !== searchTerm) return -1;
        if (bTitle === searchTerm && aTitle !== searchTerm) return 1;

        // Starts with search term
        if (aTitle.startsWith(searchTerm) && !bTitle.startsWith(searchTerm))
          return -1;
        if (bTitle.startsWith(searchTerm) && !aTitle.startsWith(searchTerm))
          return 1;

        // Sort by position of match
        return aTitle.indexOf(searchTerm) - bTitle.indexOf(searchTerm);
      }

      // If neither matches, maintain original order
      return 0;
    });
  }, [packagesWithDistance, filterText, setFilterText]);

  // Use refs to prevent unnecessary re-renders
  const hasInitialized = useRef(false);
  const hasProcessedPackages = useRef(false);
  const googleMapsLoaded = useRef(false);

  // Load Google Maps API
  const loadGoogleMapsAPI = useCallback(() => {
    if (googleMapsLoaded.current || window.google) {
      console.log("🗺️ Google Maps API already loaded");
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      console.log("🔄 Loading Google Maps API...");

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log("✅ Google Maps API loaded successfully");
        googleMapsLoaded.current = true;
        resolve();
      };

      script.onerror = () => {
        console.error("❌ Failed to load Google Maps API");
        reject(new Error("Failed to load Google Maps API"));
      };

      document.head.appendChild(script);
    });
  }, []);

  // Function to calculate road distance using Google Maps Distance Matrix API
  const calculateRoadDistance = useCallback(
    async (
      originLat: number,
      originLng: number,
      destinationLat: number,
      destinationLng: number
    ): Promise<number | null> => {
      console.log("🚗 Starting road distance calculation...");
      console.log("🚗 Origin:", { lat: originLat, lng: originLng });
      console.log("🚗 Destination:", {
        lat: destinationLat,
        lng: destinationLng,
      });

      // Validate coordinates
      if (
        isNaN(originLat) ||
        isNaN(originLng) ||
        isNaN(destinationLat) ||
        isNaN(destinationLng)
      ) {
        console.error("❌ Invalid coordinates provided");
        return null;
      }

      // Check if coordinates are within reasonable bounds
      if (
        Math.abs(originLat) > 90 ||
        Math.abs(destinationLat) > 90 ||
        Math.abs(originLng) > 180 ||
        Math.abs(destinationLng) > 180
      ) {
        console.error("❌ Coordinates out of bounds");
        return null;
      }

      try {
        const response = await fetch(
          `/api/distance-matrix?origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}`
        );

        if (!response.ok) {
          console.error(`❌ HTTP error! status: ${response.status}`);
          return null;
        }

        const data = await response.json();
        console.log("🚗 Distance Matrix API Response:", data);

        if (data.status !== "OK") {
          console.error("❌ Distance Matrix API error:", data.status);
          if (data.error_message) {
            console.error("❌ Error message:", data.error_message);
          }
          return null;
        }

        const element = data.rows[0]?.elements[0];
        if (!element) {
          console.error("❌ No element found in response");
          return null;
        }

        console.log("🚗 Element status:", element.status);

        if (element.status === "ZERO_RESULTS") {
          console.warn(
            "⚠️ No route found between locations, trying alternative approach"
          );
          return null;
        }

        if (element.status !== "OK") {
          console.error("❌ Distance calculation failed:", element.status);
          return null;
        }

        const distanceInKm = element.distance.value / 1000;
        console.log("✅ Road distance calculated:", distanceInKm, "km");
        return distanceInKm;
      } catch (error) {
        console.error("❌ Distance calculation error:", error);
        return null;
      }
    },
    []
  );

  // Function to calculate straight-line distance as fallback
  const calculateStraightLineDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      console.log("📏 Calculating straight-line distance as fallback...");
      console.log("📏 Point 1:", { lat: lat1, lng: lon1 });
      console.log("📏 Point 2:", { lat: lat2, lng: lon2 });

      const R = 6371; // Radius of the earth in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      console.log("📏 Straight-line distance:", distance, "km");
      return distance;
    },
    []
  );

  // Memoized geocoding function with caching
  const geocodeCache = useRef<Map<string, { lat: number; lng: number } | null>>(
    new Map()
  );

  const geocodeHospitalAddress = useCallback(
    async (address: string): Promise<{ lat: number; lng: number } | null> => {
      const trimmedAddress = address.trim();
      console.log(
        "🏥 Starting geocoding for hospital address:",
        trimmedAddress
      );

      if (!trimmedAddress) {
        console.warn("⚠️ Empty address provided");
        return null;
      }

      // Check cache first
      if (geocodeCache.current.has(trimmedAddress)) {
        const cachedResult = geocodeCache.current.get(trimmedAddress);
        console.log(
          "💾 Using cached result for:",
          trimmedAddress,
          cachedResult
        );
        return cachedResult;
      }

      try {
        console.log("🔍 Calling Google Geocoding API for:", trimmedAddress);
        const results = await getGeocode({ address: trimmedAddress });
        console.log("📍 Geocoding API results:", results);

        if (!results || results.length === 0) {
          console.warn("⚠️ No geocoding results found for:", trimmedAddress);
          geocodeCache.current.set(trimmedAddress, null);
          return null;
        }

        const { lat, lng } = await getLatLng(results[0]);
        console.log("📍 Extracted coordinates:", { lat, lng });

        if (isNaN(lat) || isNaN(lng)) {
          console.warn("⚠️ Invalid coordinates received:", { lat, lng });
          geocodeCache.current.set(trimmedAddress, null);
          return null;
        }

        // Validate coordinate bounds
        if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
          console.warn("⚠️ Coordinates out of bounds:", { lat, lng });
          geocodeCache.current.set(trimmedAddress, null);
          return null;
        }

        const coords = { lat, lng };
        geocodeCache.current.set(trimmedAddress, coords);
        console.log("✅ Successfully geocoded:", trimmedAddress, "→", coords);
        return coords;
      } catch (error) {
        console.error("❌ Geocoding error for", trimmedAddress, ":", error);
        geocodeCache.current.set(trimmedAddress, null);
        return null;
      }
    },
    []
  );

  const handleBookNow = useCallback(
    (packageId: string) => {
      const token = localStorage.getItem("token");
      if (!token) {
        setSelectedPackage(packageId);
        if (initialLocation === "Abroad") {
          router.push(`/auth/abroad/login?redirect=/surgical-care/search`);
        } else {
          router.push(`/auth/login?redirect=/surgical-care/search`);
        }
      } else {
        router.push(`/surgical-care/booking/${packageId}`);
      }
    },
    [router]
  );

  // Initialize data only once
  useEffect(() => {
    if (hasInitialized.current) return;

    const initializeData = async () => {
      hasInitialized.current = true;

      // Load Google Maps API first
      try {
        await loadGoogleMapsAPI();
      } catch (error) {
        console.error("❌ Failed to load Google Maps API:", error);
        toast.error(
          "Failed to load maps. Distance calculation may not work properly."
        );
      }

      const savedData = sessionStorage.getItem("surgicalSearchData");
      if (!savedData) {
        router.push("/surgical-care/search");
        toast.error("No search data found - please search again");
        return;
      }

      try {
        const parsedData: SearchData = JSON.parse(savedData);
        console.log("📱 Loaded search data from sessionStorage:", parsedData);
        console.log(
          "🗺️ User coordinates from session:",
          parsedData.coordinates
        );
        console.log("📍 User location from session:", parsedData.location);
        console.log("🏥 Surgery type from session:", parsedData.surgeryType);

        setSearchData(parsedData);

        if (parsedData.surgeryType) {
          console.log(
            "🔄 Fetching MVT packages for surgery type:",
            parsedData.surgeryType
          );
          await getMvtPackages(parsedData.surgeryType);
        } else {
          console.warn("⚠️ No surgery type found in session data");
        }
      } catch (error) {
        console.error("❌ Failed to load data:", error);
        toast.error("Failed to load search results");
      }
    };

    initializeData();
  }, [getMvtPackages, router, loadGoogleMapsAPI]);

  // Optimized distance calculation per hospital
  useEffect(() => {
    if (
      !mvtPackages?.hospitals?.length ||
      !searchData ||
      hasProcessedPackages.current ||
      isProcessing
    ) {
      return;
    }

    const processPackages = async () => {
      setIsProcessing(true);
      hasProcessedPackages.current = true;

      console.log("🔄 Starting optimized package processing...");
      console.log(
        "🏥 Total hospitals to process:",
        mvtPackages.hospitals.length
      );
      console.log("🗺️ User coordinates available:", !!searchData.coordinates);

      try {
        // Step 1: Calculate distances for unique hospitals only
        const hospitalDistances = new Map<string, number | undefined>();

        if (searchData.coordinates) {
          console.log("📍 User location coordinates:", searchData.coordinates);

          // Get unique hospitals
          const uniqueHospitals = new Map<string, any>();
          mvtPackages.hospitals.forEach((hospitalData: any) => {
            const hospital = hospitalData.hospital;
            if (!uniqueHospitals.has(hospital.tenant_id)) {
              uniqueHospitals.set(hospital.tenant_id, hospital);
            }
          });

          console.log("🏥 Unique hospitals found:", uniqueHospitals.size);

          // Calculate distance for each unique hospital
          let hospitalIndex = 0;
          for (const [tenantId, hospital] of uniqueHospitals) {
            hospitalIndex++;
            console.log(
              `\n🏥 Processing hospital ${hospitalIndex}/${uniqueHospitals.size}:`,
              hospital.name
            );

            const hospitalAddress = hospital.address;
            console.log("🏥 Hospital address:", hospitalAddress);

            if (!hospitalAddress) {
              console.warn("⚠️ No hospital address found");
              hospitalDistances.set(tenantId, undefined);
              continue;
            }

            const hospitalCoords = await geocodeHospitalAddress(
              hospitalAddress
            );
            if (!hospitalCoords) {
              console.warn("⚠️ Failed to geocode hospital address");
              hospitalDistances.set(tenantId, undefined);
              continue;
            }

            console.log("📍 Hospital coordinates:", hospitalCoords);

            // Try to calculate road distance first
            let distance = await calculateRoadDistance(
              searchData.coordinates.lat,
              searchData.coordinates.lng,
              hospitalCoords.lat,
              hospitalCoords.lng
            );

            // If road distance fails, use straight-line distance
            if (distance === null) {
              console.log(
                "⚠️ Road distance calculation failed, using straight-line distance"
              );
              distance = calculateStraightLineDistance(
                searchData.coordinates.lat,
                searchData.coordinates.lng,
                hospitalCoords.lat,
                hospitalCoords.lng
              );
            }

            console.log(
              "✅ Distance calculated for",
              hospital.name,
              ":",
              distance,
              "km"
            );
            hospitalDistances.set(tenantId, distance);
          }

          console.log(
            "📊 Hospital distances calculated:",
            Array.from(hospitalDistances.entries()).map(([id, dist]) => ({
              hospitalId: id,
              distance: dist,
            }))
          );
        } else {
          console.log(
            "⚠️ No user coordinates available, skipping distance calculation"
          );
        }

        // Step 2: Flatten packages and apply hospital distances
        const flattenedPackages: PackageWithDistance[] = [];

        mvtPackages.hospitals.forEach((hospitalData: any) => {
          const hospital = hospitalData.hospital;
          const packages = hospitalData.packages;
          const hospitalDistance = hospitalDistances.get(hospital.tenant_id);

          packages.forEach((packageData: any) => {
            flattenedPackages.push({
              surgery: packageData.surgery,
              department: packageData.department,
              packages: packageData.packages,
              hospital: hospital,
              distance: hospitalDistance,
            });
          });
        });

        console.log("📦 Total flattened packages:", flattenedPackages.length);

        // Step 3: Sort by distance (closest first)
        const sortedPackages = flattenedPackages.sort((a, b) => {
          if (a.distance === undefined && b.distance === undefined) return 0;
          if (a.distance === undefined) return 1;
          if (b.distance === undefined) return -1;
          return a.distance - b.distance;
        });

        console.log(
          "🎯 Packages sorted by distance:",
          sortedPackages.slice(0, 5).map((p) => ({
            hospital: p.hospital.name,
            surgery: p.surgery.title,
            distance: p.distance,
          }))
        );

        setPackagesWithDistance(sortedPackages);
      } catch (error) {
        console.error("❌ Error processing packages:", error);

        // Fallback to packages without distance
        const flattenedPackages: PackageWithDistance[] = [];

        mvtPackages.hospitals.forEach((hospitalData: any) => {
          const hospital = hospitalData.hospital;
          const packages = hospitalData.packages;

          packages.forEach((packageData: any) => {
            flattenedPackages.push({
              surgery: packageData.surgery,
              department: packageData.department,
              packages: packageData.packages,
              hospital: hospital,
              distance: undefined,
            });
          });
        });

        setPackagesWithDistance(flattenedPackages);
      } finally {
        setIsProcessing(false);
        console.log("✅ Optimized package processing completed");
      }
    };

    processPackages();
  }, [
    mvtPackages,
    searchData,
    calculateRoadDistance,
    calculateStraightLineDistance,
    geocodeHospitalAddress,
    isProcessing,
  ]);

  const renderPackageCard = useCallback(
    (item: PackageWithDistance) => (
      <motion.div
        key={`${item.surgery.id}-${item.hospital.tenant_id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {item.hospital.name || "Hospital Name Not Available"}
            </h3>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full"
            >
              {item.department.department_name}
            </motion.span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {item.surgery.title}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-2 text-yellow-500">⭐</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  4.8 (120 reviews)
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-blue-500">📍</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item.distance !== undefined
                    ? `${item.distance.toFixed(1)} km away`
                    : "Distance not available"}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-2 text-green-500">💰</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  ₹{item.surgery.price} (Estimated)
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-purple-500">📅</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item.hospital.working_time} Open
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleBookNow(item.packages[0]?.id || "")}
            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <span>Book Now</span>
          </button>
        </div>
      </motion.div>
    ),
    []
  );

  const isLoading = apiLoading || isProcessing;
  const showResults =
    packagesWithDistance.length > 0 ||
    (mvtPackages?.hospitals?.length > 0 && !isProcessing);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => router.push("/surgical-care/search")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Header Row - Title + Filter Button */}
          <div className="flex justify-between items-center mb-4">
            {/* Empty div for balance (pushes title to center) */}
            <div className="w-10"></div>

            {/* Responsive Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center flex-grow">
              Available Packages
            </h1>

            {/* Responsive Filter Button */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center justify-center p-2 sm:px-4 sm:py-2 
             bg-sky-500 hover:bg-sky-600 
             dark:bg-sky-600 dark:hover:bg-sky-700 
             text-white dark:text-sky-50 
             rounded-lg transition-colors 
             focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 
             dark:focus:ring-sky-300 dark:focus:ring-offset-gray-800
             shadow-sm hover:shadow-md"
            >
              <span>🔍</span>
              <span className="hidden sm:inline ml-2">Filter</span>
            </button>
          </div>

          {showFilter && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search surgery name..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={() => {
                    setShowFilter(false);
                    setFilterText("");
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {showResults ? (
                <>
                  {sortedPackages.length}{" "}
                  {sortedPackages.length === 1 ? "package" : "packages"} found
                  {searchData?.location && ` near ${searchData.location}`}
                </>
              ) : (
                "Loading packages..."
              )}
            </p>
          </div>
        </motion.div>

        {showResults ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
            {sortedPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full max-w-md"
              >
                {renderPackageCard(pkg)}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No packages found matching your criteria
            </p>
            <button
              onClick={() => router.push("/surgical-care/search")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Modify Search
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DoctorResults;
