"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect, useMemo } from "react";
import { Play, Quote, Star, PlayCircle } from "lucide-react";

type Testimonial = {
  id: string;
  type: "video" | "text";
  name: string;
  role: string;
  content: string;
  rating?: number;
  videoUrl?: string;
  thumbnail?: string;
};

// Current testimonial data (only doctor video for now)
const doctorTestimonials = [
  {
    id: "doc1",
    type: "video",
    name: "Dr. Amrit Preetam Panda",
    role: "M.Ch(Urology), MS(Surgery), DNB, f.Mas, d.MAS",
    content: "The platform has transformed how I manage my consultations.",
    rating: 5,
    videoUrl: "https://drive.google.com/file/d/1ykuNBbITJ7BcbmNZkRPXH6051EN1eM4a/view?usp=drive_link",
  },
  {
    id: "doc2",
    type: "video",
    name: "Dr. Debadarshi Rath",
    role: "M.S,m.Ch (Urology), Senior Consultant Urologist",
    content: "The platform has transformed how I manage my consultations.",
    rating: 5,
    videoUrl: "https://drive.google.com/drive/folders/15ZMqzNz_YJBRFCF9zcjFf43ZdBYzFRsA",
  },
];

// Extract VideoTestimonial component to prevent re-creation on theme change
const VideoTestimonial = ({ testimonial, isDark }: { testimonial: Testimonial, isDark: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  // Memoize stream URL to prevent recalculations
  const streamUrl = useMemo(() => {
    const idMatch = testimonial.videoUrl?.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!idMatch) return testimonial.videoUrl;
    const fileId = idMatch[1];
    return `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
  }, [testimonial.videoUrl]);

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative group"
    >
      <div
        className={`relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm ${
          isDark
            ? "bg-gray-800/30 border border-gray-700/50"
            : "bg-white/80 border border-gray-200/50"
        } transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]`}
      >
        {/* Video Container */}
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          {hasError ? (
            <div
              className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden cursor-pointer"
              onClick={() => window.open(testimonial.videoUrl!, "_blank")}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full opacity-20 blur-xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full opacity-20 blur-xl"></div>
              </div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 bg-white/90 hover:bg-white text-blue-600 rounded-full p-6 shadow-2xl"
              >
                <PlayCircle size={48} className="drop-shadow-lg" />
              </motion.div>

              <div className="absolute top-4 left-4 right-4 bg-yellow-500/20 backdrop-blur-sm rounded-lg p-2 text-center">
                <p className="text-yellow-200 text-sm">Click to watch on Google Drive</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center z-10">
                  <div className="bg-white/90 rounded-full p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                </div>
              )}

              <video
                className="w-full h-full object-cover rounded-3xl"
                controls={showControls}
                preload="metadata"
                onLoadStart={() => setIsLoading(true)}
                onLoadedData={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:0.3'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:0.3'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='450' fill='url(%23bg)'/%3E%3C/svg%3E"
              >
                <source src={streamUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!showControls && !isLoading && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={(e) => {
                    const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                    video.play();
                    setShowControls(true);
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/90 hover:bg-white text-blue-600 rounded-full p-4 shadow-2xl"
                  >
                    <Play size={32} className="ml-1" />
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2">{testimonial.name}</h3>
            <p className="text-blue-200 mb-2">{testimonial.role}</p>
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < (testimonial.rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-200 text-sm opacity-90">{testimonial.content}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TextTestimonial = ({ testimonial, isDark }: { testimonial: Testimonial, isDark: boolean }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{ y: -5 }}
    className={`p-8 rounded-3xl h-full relative overflow-hidden backdrop-blur-sm transition-all duration-300 ${
      isDark
        ? "bg-gray-800/50 border border-gray-700/30 hover:bg-gray-800/70"
        : "bg-white/80 border border-gray-200/50 hover:bg-white/90"
    } shadow-xl hover:shadow-2xl`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
    <div className="relative z-10">
      <Quote className="h-10 w-10 text-blue-500 rotate-180 mb-6 opacity-80" />
      <p className={`text-lg leading-relaxed mb-8 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
        "{testimonial.content}"
      </p>
      <div className="flex items-center justify-between">
        <div>
          <h4 className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
            {testimonial.name}
          </h4>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {testimonial.role}
          </p>
        </div>
        {testimonial.rating && (
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < testimonial.rating!
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const TestimonialsPage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted ? resolvedTheme === "dark" : false;

  // Empty arrays for future content
  const [patientTestimonials] = useState<Testimonial[]>([]);
  const [writtenFeedbacks] = useState<Testimonial[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const renderTestimonialSection = (
    title: string,
    testimonials: Testimonial[],
    isVideo = false
  ) => (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-900/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {title}
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className={`text-xl max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {isVideo
              ? "Watch real experiences from healthcare professionals"
              : "Read what our clients have to say"}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className={`grid gap-8 ${
            isVideo ? "md:grid-cols-2 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full">
                {isVideo ? (
                  <VideoTestimonial testimonial={testimonial} isDark={isDark} />
                ) : (
                  <TextTestimonial testimonial={testimonial} isDark={isDark} />
                )}
              </div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full text-center py-20"
            >
              <div className={`text-2xl font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {title} coming soon
              </div>
              <div className={`text-lg mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                We're working on bringing you amazing{" "}
                {isVideo ? "video testimonials" : "stories"} from our clients
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
        : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
    }`}>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Client Testimonials
              </span>
            </motion.h1>

            <motion.p
              className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover how our platform transforms healthcare experiences for both
              <span className="text-blue-600 font-semibold"> doctors </span>
              and
              <span className="text-purple-600 font-semibold"> patients</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {renderTestimonialSection("Doctor Testimonials", doctorTestimonials, true)}
      {renderTestimonialSection("Patient Stories", patientTestimonials)}
      {renderTestimonialSection("Written Feedback", writtenFeedbacks)}
    </div>
  );
};

export default TestimonialsPage;