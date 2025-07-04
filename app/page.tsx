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
  Users,
  Building2,
  Shield,
  Calendar,
  CheckCircle,
  ArrowRight,
  Play,
  Search,
  Stethoscope,
  Building2Icon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function CordeliakarePage() {
  const { scrollYProgress } = useScroll();
  const [expandedCards, setExpandedCards] = useState({});
  const [openCardsHealth, setOpenCardsHealth] = useState([]);
  const [popupData, setPopupData] = useState(null);

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const testimonials = [
    {
      name: "Dr. Debadarshi Rath, MD, MCh — Senior Urologist Consultant",
      description:
        "Dr. Debadarshi Rath holds an MD degree and a super-specialty MCh qualification, reflecting extensive training and expertise in both medicine and advanced surgical procedures. As a senior urologist consultant, Dr. Debadarshi Rath brings a wealth of clinical experience and in-depth knowledge, dedicated to delivering high-quality patient care and innovative treatment solutions in urology.",
      imgSrc: "/dr_images/dr_debadarshi_rath.jpg",
      alt: "Dr. Debadarshi Rath, MD, MCh — Senior Urologist Consultant",
      buttons: [
        {
          url: "https://prod.cordeliakare.com/hims/UNCEHOSPITAL/appointment?doctor_id=373&department_id=259",
          label: "Hospital Consultation",
        },
        {
          url: "https://prod.cordeliakare.com/hims/UNCEHOSPITAL/appointment?doctor_id=373&department_id=259",
          label: "Online",
        },
      ],
    },
    {
      name: "Dr. Sangam Garg, MCh in Orthopedics",
      description:
        "Dr. Sangam Garg is a highly skilled orthopedic surgeon with an MS degree and a super-specialty MCh in Orthopedics. With comprehensive expertise in diagnosing and treating musculoskeletal disorders, Dr. Sangam Garg combines advanced surgical skills with compassionate patient care to restore mobility and improve quality of life.",
      imgSrc: "/dr_sangam_image.png",
      alt: "Dr. Nadeem Vaidya Testimonial",
      buttons: [
        {
          url: "https://prod.cordeliakare.com/hims/jiviyathehos/appointment",
          label: "Hospital Consultation",
        },
        { url: "", label: "Contact Us" }, // will NOT render
      ],
    },
    {
      name: "Dr. Kanhu Charan Digal, MBBS, MD Pediatrics, DM Neonatology — Neonatologist & Paediatrician",
      description:
        "Dr. Kanhu Charan Digal holds an MBBS degree, along with an MD in Pediatrics and a super-specialty DM in Neonatology, reflecting advanced training in child and newborn care. As a dedicated neonatologist and paediatrician, Dr. Kanhu Charan Digal brings comprehensive clinical expertise and compassion to ensure the health and well-being of infants and children at every stage of development.",
      imgSrc: "/dr_images/Kanhu_Charan_Digal.jpg",
      alt: "Kanhu Charan Digal,  MBBS, MD Pediatrics, DM Neonatology — Neonatologist & Paediatricia",
      buttons: [
        {
          url: "https://prod.cordeliakare.com/hims/UNCEHOSPITAL/appointment?doctor_id=373&department_id=259",
          label: "Hospital Consultation",
          label: "Online",
        },
      ],
    },
    {
      name: "Dr. Poornima RN, MBBS, DNB, FAPE — Paediatrician & Paediatric Endocrinologist",
      description:
        "Dr. Poornima RN holds an MBBS degree, a Diplomate of National Board (DNB), and a Fellowship in Paediatric Endocrinology (FAPE), showcasing her advanced training and specialization in child health and hormonal disorders. As a dedicated paediatrician and paediatric endocrinologist, she brings a wealth of clinical expertise and compassionate care, focused on supporting healthy growth and development in children.",
      imgSrc: "/dr_images/poornima.jpg",
      alt: "Kanhu Charan Digal,  MBBS, MD Pediatrics, DM Neonatology — Neonatologist & Paediatricia",
      buttons: [
        {
          url: "https://prod.cordeliakare.com/hims/UNCEHOSPITAL/appointment?doctor_id=373&department_id=259",
          label: "Hospital Consultation",
          label: "Online",
        },
      ],
    },
    {
      name: "Dr. Sohandas Shetty, MBBS, DDVL — Dermatologist & Cosmetologist",
      description:
        "Dr. Sohandas Shetty holds an MBBS degree and a Diploma in Dermatology, Venereology, and Leprosy (DDVL), reflecting his specialized training in skin health and cosmetic treatments. As an experienced dermatologist and cosmetologist, he is committed to providing expert care and advanced solutions for a wide range of skin and aesthetic concerns.",
      imgSrc: "/dr_images/Sohandas.jpg",
      alt: "Kanhu Charan Digal,  MBBS, MD Pediatrics, DM Neonatology — Neonatologist & Paediatricia",
      buttons: [
        {
          url: "https://prod.cordeliakare.com/hims/UNCEHOSPITAL/appointment?doctor_id=373&department_id=259",
          label: "Hospital Consultation",
          label: "Online",
        },
      ],
    },
    {
      name: "Dr. Subhash Yadav, MBBS, MD Medicine — General Medicine Specialist",
      description:
        "Dr. Subhash Yadav holds an MBBS degree and an MD in Medicine, with expertise in managing blood pressure, thyroid disorders, diabetes, headaches, and infections. Committed to comprehensive patient care, he provides accurate diagnosis and effective treatment for a wide range of medical conditions.",
      imgSrc: "/dr_images/Subhash.jpg",
      alt: "Kanhu Charan Digal,  MBBS, MD Pediatrics, DM Neonatology — Neonatologist & Paediatricia",
      buttons: [
        {
          url: "https://prod.cordeliakare.com/hims/UNCEHOSPITAL/appointment?doctor_id=373&department_id=259",
          label: "Hospital Consultation",
          label: "Online",
        },
      ],
    },
    {
      name: "Dr. SWAPNA M, MD, DNB, CCEBDM — Preventive Medicine Specialist",
      description:
        "Dr. SWAPNA M holds an MD, Diplomate of National Board (DNB), and a Certification in Evidence-Based Diabetes Management (CCEBDM), highlighting her advanced expertise in preventive medicine. Specializing in diabetes care and allergy management, she is dedicated to proactive healthcare approaches that improve long-term patient outcomes.",
      imgSrc: "/dr_images/SWAPNA.jpg",
      alt: "Kanhu Charan Digal,  MBBS, MD Pediatrics, DM Neonatology — Neonatologist & Paediatricia",
      buttons: [
        {
          url: "https://prod.cordeliakare.com/hims/UNCEHOSPITAL/appointment?doctor_id=373&department_id=259",
          label: "Hospital Consultation",
          label: "Online",
        },
      ],
    },
    {
      name: "Dr. Talleen Pardhan, BDS — Dental Surgeon",
      description:
        "Dr. Talleen Pardhan holds a Bachelor of Dental Surgery (BDS) degree, specializing in dental care and oral health. As a skilled dental surgeon, Dr. Pardhan is committed to providing comprehensive treatment and promoting optimal dental wellness for patients.",
      imgSrc: "/dr_images/Talleen.jpg",
      alt: "Kanhu Charan Digal,  MBBS, MD Pediatrics, DM Neonatology — Neonatologist & Paediatricia",
      buttons: [
        {
          url: "https://prod.cordeliakare.com/hims/UNCEHOSPITAL/appointment?doctor_id=373&department_id=259",
          label: "Hospital Consultation",
          label: "Online",
        },
      ],
    },
    {
      name: "Dr. Sohandas Shetty, MBBS, DDVL — Dermatologist & Cosmetologist",
      description:
        "Dr. Sohandas Shetty holds an MBBS degree and a Diploma in Dermatology, Venereology, and Leprosy (DDVL), reflecting his specialized training in skin health and cosmetic treatments. As an experienced dermatologist and cosmetologist, he is committed to providing expert care and advanced solutions for a wide range of skin and aesthetic concerns.",
      imgSrc: "/dr_images/Sohandas.jpg",
      alt: "Kanhu Charan Digal,  MBBS, MD Pediatrics, DM Neonatology — Neonatologist & Paediatricia",
      buttons: [
        {
          url: "https://prod.cordeliakare.com/hims/UNCEHOSPITAL/appointment?doctor_id=373&department_id=259",
          label: "Hospital Consultation",
          label: "Online",
        },
      ],
    },
    {
      name: "Dr. Sohandas Shetty, MBBS, DDVL — Dermatologist & Cosmetologist",
      description:
        "Dr. Sohandas Shetty holds an MBBS degree and a Diploma in Dermatology, Venereology, and Leprosy (DDVL), reflecting his specialized training in skin health and cosmetic treatments. As an experienced dermatologist and cosmetologist, he is committed to providing expert care and advanced solutions for a wide range of skin and aesthetic concerns.",
      imgSrc: "/dr_images/Sohandas.jpg",
      alt: "Kanhu Charan Digal,  MBBS, MD Pediatrics, DM Neonatology — Neonatologist & Paediatricia",
      buttons: [
        {
          url: "https://prod.cordeliakare.com/hims/UNCEHOSPITAL/appointment?doctor_id=373&department_id=259",
          label: "Hospital Consultation",
          label: "Online",
        },
      ],
    },
  ];

  const { name, description, imgSrc, alt, buttons } =
    testimonials[currentIndex];

  const toggleCard = (index: any) => {
    setExpandedCards((prev: any) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleCard1 = (index: any) => {
    setOpenCardsHealth((prev: any) =>
      prev.includes(index)
        ? prev.filter((i: any) => i !== index)
        : [...prev, index]
    );
  };

  const openPopup = (challenge) => {
    setPopupData(challenge);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const solutions = [
    {
      title: "Enabling Remote care delivery",
      description: [
        "Patient mHealth app is connected with HMS system for care delivery",
        "Appointment Booking & Management",
        "Telemedicine / Virtual Consultations",
        "Electronic Health Records (EHR) Access",
        "Prescription & Medication Tracking",
        "View and pay hospital bills",
        "Hospital Navigation & Information",
        "Emergency & Support Features",
      ],
      icon: Search,
      color: "bg-blue-500",
      image_name: "/images/remote_care.png",
    },
    {
      title: "Intelligent Referral Management",
      description: [
        "Consultation and review of the case history",
        "Post-treatment Follow-up",
        "Discover top-rated surgeons and hospitals, along with treatment costs and reviews.",
        "Book an appointment for pre-consultation, post surgery consultation, diet consultation and ambulatory services.",
        "mHealth platform is collaborated with leading hospitals for providing intelligent platform for referring surgical cases in India and abroad.",
        "Medical Tourism Referral",
      ],
      icon: Stethoscope,
      color: "bg-green-500",
      image_name: "/images/intellegent_referral_management.png",
    },
    {
      title: "Advanced Hospital Management System (HMS)",
      description: [
        "Integrated Electronic Health Records (EHR/EMR)",
        "Revenue Cycle Management (RCM)",
        "Designed for large or technology-forward hospitals and healthcare networks",
        "Inventory & Pharmacy Management",
        "Radiology/Lab & PACS Integration",
        "OPD / IPD Workflow Management",
        "Feedback & Grievance Module",
        "Cloud-Based: Yes",
        "On-premise: Yes",
        "ABDM-Ready: Yes",
        "Used By: Private hospitals, diagnostics chains",
        "Multi-location & Multi-specialty Support: Yes",
      ],
      icon: Calendar,
      color: "bg-purple-500",
      image_name: "/images/advanced_hims.png",
    },
    // {
    //   title: "Virtual Delivery",
    //   description: "Expand your digital borders with telehealth capabilities.",
    //   icon: Monitor,
    //   color: "bg-orange-500",
    // },
  ];

  const challenges = [
    {
      title: "Patients",
      subtitle:
        "Digital health records give patients quick, easy access to their medical history",
      points: [
        "Lack of Access to Trusted Healthcare Providers",
        "Lack of Awareness & Understanding of disease and management",
        "Delays in Diagnosis or Scheduling",
        "Cost & Affordability",
        "Emotional and Mental Stress due to costly and complex surgical procedure",
        "Complex Documentation & Paperwork",
        "Lack of Continuity in Care",
        "Trust & Safety Concerns",
        "Post-Procedure Recovery Challenges",
        "Transportation & Logistics",
        "Queues for registration and doctor consultation",
        "Commute problem for differently abled and chronic disease management",
        "Hassles in carrying medical reports and prescriptions",
        "Difficulty in rescheduling or refund in case of unforeseen circumstances",
      ],
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Doctors",
      subtitle:
        "Why digital health records are the future of efficient clinical practice",
      points: [
        "Managing patients with multiple chronic conditions.",
        "Balancing patient care with administrative responsibilities.",
        "Effectively communicating with patients and families.",
        "Navigating the complexities of the healthcare system.",
      ],
      icon: Stethoscope,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Hospital/Network Hospitals",
      subtitle: "Streamlined hospital operations and enhanced patient care",
      points: [
        "Patients increasingly demand high service quality, shorter wait times, and billing transparency.",
        "High competition forces hospitals to enhance patient satisfaction or risk losing business to competitors.",
        "Significant administrative effort is needed for insurance claims, affecting efficiency.",
        "Lacks in overseas patients approachability.",
        "Ensuring uniform quality, patient experience, and clinical standards across the network is challenging.",
        "High cost of digital transformation: Implementing hospital information systems (HIS), EMRs, and telehealth is expensive.",
        "Poor interoperability: Lack of seamless integration between departments, especially in multi-site networks.",
      ],
      icon: Building2Icon,
      gradient: "from-purple-500 to-violet-500",
    },
    {
      title: "Data Security and Privacy",
      subtitle: "Crucial protection for the future of digital health records",
      points: [
        "Increased exposure to cyber threats and legal liability for data breaches.",
        "Hospitals are increasingly targeted by ransomware and cybercriminals due to the high value of patient data on the black market.",
        "Data breaches can result in severe legal consequences, including penalties under HIPAA and other regional healthcare compliance laws.",
        "Internet-connected medical devices often lack proper security protocols, becoming easy entry points for attackers.",
        "Without strict access control policies, unauthorized staff may access sensitive data, increasing the risk of internal breaches.",
      ],
      icon: Shield,
      gradient: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
        />

        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Transforming{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Healthcare
            </span>
            <br />
            with{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-1 max-w-3xl mx-auto"
          >
            Our comprehensive mHealth integrated solution with HMS enables
            <br />
            healthcare providers to deliver patient-centric, efficient, and
            high-quality care. By leveraging mobile technologies, data
            analytics, and AI-driven insights, we can improve patient outcomes,
            enhance the patient experience, and optimize healthcare operations
          </motion.p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20"
        />
      </section>

      {/* About Section */}
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
              About CordeLiakare
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                Welcome to Cordeliakare - Transforming Healthcare with
                Innovation. In the ever-evolving world of digital health,
                Cordeliakare stands as a beacon of innovation, bringing together
                a complete digital health ecosystem.
              </p>
            </div>

            {/* Video Testimonial */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
            >
              <Image
                src="https://dev.cordeliakare.com/cordelia/assets/images/Frame_5.png"
                alt="Dr. Nadeem Vaidya Testimonial"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Link
                    href="https://hm-cordelia-s3-dev.s3.ap-south-1.amazonaws.com/about_us_video.mp4"
                    target="_blank"
                  >
                    <Play className="h-8 w-8 text-white ml-1" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 mt-5">
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
              className="text-3xl md:text-4xl font-bold mb-6 mt-6"
            >
              Insights into challenges of Healthcare Ecosystem
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, i) => {
              const index = i + 10; // Unique index offset
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${challenge.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <challenge.icon className="h-8 w-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold mb-3">
                        {challenge.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        {challenge.subtitle}
                      </p>

                      <div className="space-y-2 mb-4">
                        {challenge.points
                          .slice(
                            0,
                            openCardsHealth.includes(index)
                              ? challenge.points.length
                              : 3
                          )
                          .map((point, pointIndex) => (
                            <motion.div
                              key={pointIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 + pointIndex * 0.1 }}
                              className="flex items-start space-x-2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-xs leading-relaxed">
                                {point}
                              </span>
                            </motion.div>
                          ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <Button
                          variant="ghost"
                          className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700 text-sm"
                          onClick={() => toggleCard1(index)}
                        >
                          {openCardsHealth.includes(index)
                            ? "Show Less"
                            : "Read More"}
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Popup Modal */}
        {popupData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-3xl w-full relative shadow-lg">
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
              <Image
                src="/images/qr_code_image.jpg"
                alt="Dr. Nadeem Vaidya Testimonial"
                width={300}
                height={100}
                className="rounded-lg w-full object-contain mb-4"
              />
            </div>
          </div>
        )}
      </section>

      {/* Solutions Suite */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16 mt-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Your Trusted Health Platform for Hospitals and Patients
            </motion.h2>
          </motion.div>

          {/* Main Solutions Feature */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold">
                The real-time digital front door
              </h3>
              <p className="text-lg text-muted-foreground">
                Guide patients to the right care, at the right location, right
                now.
              </p>

              <div className="space-y-4">
                {[
                  "Streamline Patient Referrals",
                  "Enhancing Patient Care",
                  "Streamlined Operations",
                  "Empowering Medical Teams",
                  "Improve Patient Outcomes",
                  "Improve Revenue Streams",
                  "Enhanced Accessibility",
                  "Better Decision-Making",
                  "Improved Patient Engagement",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Image - Doctor with Mobile Interface */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="/images/helth_care.png"
                alt="Dr. Nadeem Vaidya Testimonial"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who Can Use Our Platform Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Solutions Grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-10 mt-10"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Our Healthcare Solutions
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-3">
            {solutions.map((solution, index) => {
              const showAll = expandedCards[index] || false;
              const visibleBenefits = showAll
                ? solution.description
                : solution.description.slice(0, 2);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center flex flex-col justify-between h-full">
                      <div>
                        {solution.image_name && (
                          <img
                            src={solution.image_name}
                            alt={solution.title}
                            className="mt-4 w-full h-32 object-cover rounded-xl"
                          />
                        )}
                        <h3 className="text-xl font-bold mb-3 mt-3">
                          {solution.title}
                        </h3>

                        <div className="space-y-4 mb-4">
                          {Array.isArray(solution.description) &&
                            visibleBenefits.map((benefit_sol, i) => (
                              <motion.div
                                key={i}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-left space-x-3 text-left"
                              >
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>{benefit_sol}</span>
                              </motion.div>
                            ))}
                        </div>

                        {solution.description.length > 2 && (
                          <button
                            className="text-sm text-blue-500 hover:underline"
                            onClick={() => toggleCard(index)}
                          >
                            {showAll ? "Show Less" : "Read More"}
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Empowering Doctors Everyday
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            className="h-1 bg-blue-600 mx-auto mb-8"
          />
        </div>

        {/* Container with relative positioning for arrows */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 z-10"
            aria-label="Previous testimonial"
          >
            &#8592;
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 z-10"
            aria-label="Next testimonial"
          >
            &#8594;
          </button>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-12 items-center"
          >
            {/* Text Content */}
            <div className="space-y-6 max-w-full">
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="text-lg text-muted-foreground text-justify">{description}</p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                {buttons.map(
                  (btn, idx) =>
                    btn.url && (
                      <div key={idx}>
                        <a
                          key={idx}
                          onClick={() => openPopup(btn.label)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto"
                        >
                          {["Online"].includes(btn.label) && (
                            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                              Online Consultation
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          )}
                        </a>
                        <a
                          key={idx + 1}
                          href={btn.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto"
                        >
                          {["Hospital Consultation"].includes(btn.label) && (
                            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                              {btn.label}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          )}
                        </a>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* Video Testimonial */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
            >
              <Image
                src={imgSrc}
                alt={alt}
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Healthcare System?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join thousands of healthcare providers who trust Cordeliakare to
              deliver exceptional patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg"
              >
                <Link
                  href="https://prod.cordeliakare.com/login"
                  className="flex items-center"
                >
                  Request A Demo
                </Link>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  href="https://prod.cordeliakare.com/login"
                  className="flex items-center"
                >
                  Login to Platform
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
