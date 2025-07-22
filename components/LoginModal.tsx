"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Globe, X } from "lucide-react";
import Link from "next/link";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            className="bg-background rounded-2xl shadow-2xl w-full max-w-lg p-8 relative border border-border"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold text-center mb-2">Login As</h2>
            <p className="text-center text-muted-foreground mb-8">
              Please select your location to proceed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient in India */}
              <Link href="/auth/login" passHref>
                <motion.div
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                  className="p-6 border border-border rounded-lg text-center cursor-pointer transition-shadow"
                >
                  <Users className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold">Patient in India</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    For residents within India.
                  </p>
                </motion.div>
              </Link>

              {/* Patient in Abroad */}
              <Link href="/auth/abroad/login" passHref>
                <motion.div
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                  className="p-6 border border-border rounded-lg text-center cursor-pointer transition-shadow"
                >
                  <Globe className="mx-auto h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold">Patient in Abroad</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    For international patients.
                  </p>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
