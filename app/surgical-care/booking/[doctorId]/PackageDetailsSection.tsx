import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface PackageBedDetail {
  id: number;
  bed_type: string;
  bed_type_id: number;
  duration: string;
  original_amount: number;
  amount: number;
  final_amount: number;
}

interface PackageServiceDetail {
  id: number;
  service_id: number;
  service_name: string;
  quantity: string;
  amount: number;
  final_amount: number;
  gst: string;
}

interface PackageSurgeryDetail {
  id: number;
  surgery_id: number;
  surgery_name: string;
  description: string | null;
  original_amount: number;
  amount: number;
  final_amount: number;
}

interface PackageMedicineDetail {
  id: number;
  package_id: number;
  category_id: number;
  amount: number;
  final_amount: number;
}

interface PackageImplantDetail {
  package_implant_items_id: number;
  package_implant_id: number;
  implant_name: string;
  quantity: string;
  original_amount: number;
  amount: number;
  final_amount: number;
}

interface PackageDetails {
  package_id: number;
  package_name: string;
  total_amount: number;
  bed_details: PackageBedDetail[];
  service_details: PackageServiceDetail[];
  surgery_details: PackageSurgeryDetail[];
  medicine_details: PackageMedicineDetail[];
  implant_details: PackageImplantDetail[];
}

interface PackageDetailsSectionProps {
  packageDetails: PackageDetails | any;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

export const PackageDetailsSection = ({
  packageDetails,
  expandedSections,
  toggleSection,
}: PackageDetailsSectionProps) => {
  // Safe array access with fallbacks
  const bedDetails = packageDetails.bed_details || [];
  const serviceDetails = packageDetails.service_details || [];
  const surgeryDetails = packageDetails.surgery_details || [];
  const medicineDetails = packageDetails.medicine_details || [];
  const implantDetails = packageDetails.implant_details || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <h2 className="text-lg md:text-2xl  font-bold text-gray-900 dark:text-white mb-6">
        Package: {packageDetails.package_name}
      </h2>

      {/* Total Amount */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 border border-blue-100 dark:border-blue-800">
        <div className="flex justify-between items-center">
          <span className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
            Total Package Amount:
          </span>
          <span className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400">
            ₹{packageDetails.total_amount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Bed Details */}
      <motion.div
        className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
        initial={false}
        animate={{ height: expandedSections.bed ? "auto" : "64px" }}
        transition={{ type: "spring", damping: 25 }}
      >
        <button
          onClick={() => {
            packageDetails?.bed_details?.length > 0 ? toggleSection("bed") : "";
          }}
          className="w-full flex justify-between items-center text-left"
        >
          <div>
            <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
              Bed Details
            </h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {bedDetails.length} bed type(s) included
            </p>
          </div>
          <motion.div
            animate={{ rotate: expandedSections.bed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {packageDetails?.bed_details?.length > 0 ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <></>
            )}
          </motion.div>
        </button>

        {expandedSections.bed && bedDetails.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-4 space-y-4"
          >
            {bedDetails.map((bed: any) => (
              <div
                key={bed.id}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Bed Type
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      {bed.bed_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Duration
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      {bed.duration} day(s)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{bed.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Final Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{bed.final_amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Service Details */}
      <motion.div
        className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
        initial={false}
        animate={{ height: expandedSections.services ? "auto" : "64px" }}
      >
        <button
          onClick={() => {
            packageDetails?.service_details?.length > 0
              ? toggleSection("services")
              : "";
          }}
          className="w-full flex justify-between items-center text-left"
        >
          <div>
            <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
              Service Details
            </h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {serviceDetails.length} service(s) included
            </p>
          </div>
          {packageDetails?.service_details?.length > 0 ? (
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                expandedSections.services ? "rotate-180" : ""
              }`}
            />
          ) : (
            <></>
          )}
        </button>

        {expandedSections.services && serviceDetails.length > 0 && (
          <div className="mt-4 space-y-4">
            {serviceDetails.map((service: any) => (
              <div
                key={service.id}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Service
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      {service.service_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Quantity
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      {service.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{service.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      GST
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      {service.gst}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Surgery Details */}
      <motion.div
        className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
        initial={false}
        animate={{ height: expandedSections.surgeries ? "auto" : "64px" }}
      >
        <button
          onClick={() => {
            packageDetails?.surgery_details?.length > 0
              ? toggleSection("surgeries")
              : "";
          }}
          className="w-full flex justify-between items-center text-left"
        >
          <div>
            <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
              Surgery Details
            </h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {surgeryDetails.length} surgery(ies) included
            </p>
          </div>
          {packageDetails?.surgery_details?.length > 0 ? (
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                expandedSections.surgeries ? "rotate-180" : ""
              }`}
            />
          ) : (
            <></>
          )}
        </button>

        {expandedSections.surgeries && surgeryDetails.length > 0 && (
          <div className="mt-4 space-y-4">
            {surgeryDetails.map((surgery: any) => (
              <div
                key={surgery.id}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <h4 className="text-sm md:text-base font-medium mb-2">
                  {surgery.surgery_name}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Original Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{surgery.original_amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Discounted Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{surgery.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Final Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{surgery.final_amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                {surgery.description && (
                  <div className="mt-2">
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Description
                    </p>
                    <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                      {surgery.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Medicine Details */}
      <motion.div
        className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
        initial={false}
        animate={{ height: expandedSections.medicines ? "auto" : "64px" }}
      >
        <button
          onClick={() => {
            packageDetails?.medicine_details?.length > 0
              ? toggleSection("medicines")
              : "";
          }}
          className="w-full flex justify-between items-center text-left"
        >
          <div>
            <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
              Medicine Details
            </h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {medicineDetails.length} medicine(s) included
            </p>
          </div>
          {packageDetails?.medicine_details?.length > 0 ? (
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                expandedSections.medicines ? "rotate-180" : ""
              }`}
            />
          ) : (
            <></>
          )}
        </button>

        {expandedSections.medicines && medicineDetails.length > 0 && (
          <div className="mt-4 space-y-4">
            {medicineDetails.map((medicine: any) => (
              <div
                key={medicine.id}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Category ID
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      {medicine.category_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{medicine.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Final Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{medicine.final_amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Implant Details */}
      <motion.div
        className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
        initial={false}
        animate={{ height: expandedSections.implants ? "auto" : "64px" }}
      >
        <button
          onClick={() => {
            packageDetails?.implant_details?.length > 0
              ? toggleSection("implants")
              : "";
          }}
          className="w-full flex justify-between items-center text-left"
        >
          <div>
            <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
              Implant Details
            </h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {implantDetails.length} implant(s) included
            </p>
          </div>
          {packageDetails?.implant_details?.length > 0 ? (
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                expandedSections.implants ? "rotate-180" : ""
              }`}
            />
          ) : (
            <></>
          )}
        </button>

        {expandedSections.implants && implantDetails.length > 0 && (
          <div className="mt-4 space-y-4">
            {implantDetails.map((implant: any) => (
              <div
                key={implant.package_implant_items_id}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <h4 className="text-sm md:text-base font-medium mb-2">
                  {implant.implant_name}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Quantity
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      {implant.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Original Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{implant.original_amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Discounted Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{implant.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Final Amount
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      ₹{implant.final_amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
