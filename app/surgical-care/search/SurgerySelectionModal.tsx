import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";

interface SurgeryOption {
  value: string;
  label: string;
}

interface SurgerySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  surgeryOptions: SurgeryOption[];
  onSelect: (option: SurgeryOption) => void;
  selectedValue: string;
}

export default function SurgerySelectionModal({
  isOpen,
  onClose,
  surgeryOptions,
  onSelect,
  selectedValue,
}: SurgerySelectionModalProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredOptions, setFilteredOptions] = React.useState(surgeryOptions);

  // Filter options based on search term
  React.useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredOptions(surgeryOptions);
    } else {
      const filtered = surgeryOptions.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, surgeryOptions]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSelect = (option: SurgeryOption) => {
    onSelect(option);
    onClose();
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.3,
        bounce: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Select Surgery Type
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search surgery types..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  autoFocus
                />
              </div>
            </div>

            {/* Options List */}
            <div className="flex-1 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                <div className="p-2">
                  {filteredOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.02 }
                      }}
                      onClick={() => handleSelect(option)}
                      className={`w-full text-left p-3 rounded-lg mb-1 transition-all duration-150 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-[1.02] ${
                        selectedValue === option.value
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-200 dark:ring-blue-700"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    No surgery types found matching "{searchTerm}"
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl">
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {filteredOptions.length} option{filteredOptions.length !== 1 ? 's' : ''} available
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}