"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  CheckCircle,
  ArrowRight,
  Phone,
  MapPin,
  Video as VideoIcon,
  Building2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/LoginModal";
import {
  carePath,
  comprehensiveServices,
  dummyTestimonials,
  RupeeIcon,
  services,
  treatments,
} from "@/constants/constants";
import toast from "react-hot-toast";
import { FAQ } from "@/components/FAQ/FAQ";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function MedicalTourismPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { scrollYProgress } = useScroll();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("international");

  const loginToPlatformHandler = () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      toast.success("You are already logged In");
    } else {
      router.push("/auth/abroad/login");
    }
  };

  const registerToPlatformHandler = () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      toast.success("You are already logged In");
    } else {
      router.push("/auth/abroad/register");
    }
  };

  const handleNavigationToSearchPage = () => {
    router.push("/surgical-care/search?location=Abroad");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:to-blue-900/20">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/images/medical-pattern.svg')] opacity-10 dark:opacity-5" />

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 opacity-20 dark:opacity-30"
        >
          <Building2 className="h-32 w-32 text-blue-400" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 opacity-20 dark:opacity-30"
        >
          <Stethoscope className="h-32 w-32 text-purple-400" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <Badge
                variant="outline"
                className="mb-4 py-2 px-4 bg-blue-100 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800"
              >
                <span className="text-blue-600 dark:text-blue-300 font-semibold">
                  World-Class Surgical Care
                </span>
              </Badge>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Medical Tourism
                </span>{" "}
                <br />
                Redefined
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Exceptional surgical care at 40-60% lower costs than Western
                countries
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  onClick={handleNavigationToSearchPage}
                  size="lg"
                  className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-2 border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  onClick={() =>
                    document
                      .getElementById("procedure-selector")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Procedures
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-12 grid grid-cols-3 sm:grid-cols-3 gap-4"
              >
                {[
                  {
                    value: "100%",
                    label: "Patient Satisfaction",
                    icon: CheckCircle,
                  },
                  { value: "24/7", label: "Patient Support", icon: Phone },
                  { value: "60%", label: "Cost Savings", icon: RupeeIcon },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center">
                      <stat.icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <p className="font-bold text-lg">{stat.value}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <Image
                src="/healthcare1.png"
                alt="Medical Tourism - International Patients"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl shadow-2xl border-8 border-white dark:border-gray-800"
              />
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mr-3">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold">No Waiting Lists</p>
                    <p className="text-sm text-muted-foreground">
                      Immediate Treatment
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Why Choose Medical Tourism?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            >
              Medical Value Tourism (MVT) is revolutionizing healthcare by
              offering patients across the globe access to high-quality medical
              services at affordable prices.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              At our core, we aim to bridge the gap between top-tier medical
              expertise and international patients looking for cost-effective,
              timely, and specialized treatments.
            </motion.p>
          </motion.div>

          {/* Who We Are Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-16"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">Who We Are?</h3>
            <p className="text-muted-foreground text-center">
              At the core of CordeLiakare, we deliver a seamless experience that
              addresses all your medical treatment needs and supports a swift
              recovery. We serve international patients from the SAARC region,
              Africa (including Nigeria, Ethiopia, Tanzania, Kenya, Uganda, and
              Ghana), Southeast Asia, the Middle East/GCC, and developed
              countries, ensuring that every treatment is conducted in
              internationally accredited hospitals by certified specialists.
            </p>
          </motion.div>

          {/* SERVICES SECTION */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div
                      className={`w-14 h-14 ${feature.color} bg-opacity-10 rounded-full flex items-center justify-center mb-6`}
                    >
                      <div className="flex items-center">
                        <feature.icon className="h-12 w-12 mr-2" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Procedure Selector */}
      <section
        id="procedure-selector"
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Our Surgical Specialties
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              World-class surgical procedures with cutting-edge technology and
              expert surgeons
            </motion.p>
          </motion.div>

          {/* Procedures Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((procedure, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={procedure.image}
                      alt={procedure.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-green-600 hover:bg-green-700">
                      {procedure.savings}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 mr-4`}
                      >
                        <procedure.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold">{procedure.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {procedure.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Care Path Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Your Care Path
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-blue-200 dark:bg-blue-900/50 -ml-0.5" />

            <div className="space-y-10 lg:space-y-6">
              {carePath.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative lg:flex ${
                    item.side === "left" ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  <div
                    className={`lg:w-1/2 p-6 ${
                      item.side === "left" ? "lg:pr-12" : "lg:pl-12"
                    }`}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white mr-6">
                            <item.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Comprehensive Services
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              End-to-end support for your complete medical journey
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comprehensiveServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 mr-4">
                        <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Patient Success Stories
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Hear from our international patients about their experiences
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mr-4">
                          <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.country}
                          </p>
                        </div>
                      </div>
                      <p className="italic mb-4">"{testimonial.quote}"</p>
                      <Badge
                        variant="outline"
                        className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
                      >
                        {testimonial.treatment}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <FAQ />
      </section>

      {/* CTA Section */}
      <section
        id="get-started"
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Begin Your Medical Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Sign up to our platform and start your medical tourism with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={registerToPlatformHandler}
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg"
              >
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={loginToPlatformHandler}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg bg-transparent text-white border-white hover:bg-white hover:text-blue-600"
              >
                Login
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} /> */}
    </div>
  );
}
