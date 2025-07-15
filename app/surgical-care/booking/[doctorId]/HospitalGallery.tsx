"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Maximize2 } from "lucide-react";

type GalleryItem = {
  id: number;
  image_url: string;
  hospital_info: {
    hospital_name: string;
  };
  media: {
    url: string;
  }[];
};

interface HospitalGalleryProps {
  galleryImages: GalleryItem[];
}

const HospitalGallery: React.FC<HospitalGalleryProps> = ({ galleryImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

  if (!galleryImages || galleryImages.length === 0) {
    return (
      <>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
          <h2 className="text-lg md:text-2xl  font-bold text-gray-900 dark:text-white">
            Hospital Facilities
          </h2>
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No gallery images available for this hospital
            </p>
          </div>
        </div>
      </>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const openImage = (index: number) => {
    setCurrentIndex(index);
    setIsFullscreenModalOpen(true);
  };

  return (
    <>
      {/* Main Gallery Grid */}
      <h2 className="text-lg md:text-2xl  font-bold text-gray-900 dark:text-white">
        Hospital Facilities
      </h2>
      <div className="grid grid-cols-2 gap-4 relative">
        {galleryImages.slice(0, 2).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="aspect-video relative rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => openImage(index)}
          >
            <Image
              src={item.image_url || item.media[0]?.url}
              alt={`Hospital facility ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}

        {galleryImages.length > 2 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsThumbnailModalOpen(true)}
            className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-1 shadow-md flex items-center"
          >
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              +{galleryImages.length - 2} more
            </span>
          </motion.button>
        )}
      </div>

      {/* Thumbnail Modal (Amazon-style) */}
      <AnimatePresence>
        {isThumbnailModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsThumbnailModalOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-white dark:bg-gray-900 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center z-10">
                <h3 className="text-lg font-semibold">Hospital Gallery</h3>
                <button
                  onClick={() => setIsThumbnailModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {galleryImages.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="aspect-video relative rounded-lg overflow-hidden group cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsThumbnailModalOpen(false);
                      setIsFullscreenModalOpen(true);
                    }}
                  >
                    <Image
                      src={item.image_url || item.media[0]?.url}
                      alt={`Hospital facility ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullscreenModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsFullscreenModalOpen(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <button
                onClick={() => setIsFullscreenModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-6xl h-full max-h-[90vh]"
              >
                <Image
                  src={
                    galleryImages[currentIndex].image_url ||
                    galleryImages[currentIndex].media[0]?.url
                  }
                  alt={`Hospital facility ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </motion.div>

              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-black/50 rounded-full px-3 py-1 flex items-center space-x-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex
                          ? "bg-white w-3 h-3"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HospitalGallery;
