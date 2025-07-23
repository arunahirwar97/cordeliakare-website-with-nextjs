"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Individual FAQ Item Component
const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: any;
  answer: any;
  isOpen: boolean;
  onClick: any;
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:shadow-lg ${
        isOpen ? "shadow-xl" : ""
      }`}
    >
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full p-6 text-left focus:outline-none group"
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {question}
        </h3>

        <div className="flex-shrink-0 ml-4 p-2 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-teal-100 dark:group-hover:bg-teal-800 transition-all duration-300">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-8 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How much can I save with medical tourism?",
      answer:
        "Patients typically save 60-80% compared to prices in Western countries. This significant saving remains even after factoring in travel and accommodation costs. The exact amount depends on the specific procedure and your home country's healthcare pricing.",
    },
    {
      question: "Are the hospitals and doctors qualified?",
      answer:
        "Absolutely. We partner exclusively with internationally accredited hospitals (JCI or equivalent) that adhere to the highest global standards. Many of our surgeons and specialists are US/UK trained and board-certified, bringing world-class expertise to your treatment.",
    },
    {
      question: "How will I handle communication and language barriers?",
      answer:
        "We ensure a seamless communication experience. Most doctors are fluent in English, and all our partner hospitals provide professional, medically-trained interpreters for your consultations and hospital stay, ensuring you understand every step of your care.",
    },
    {
      question: "What does a typical medical tourism package include?",
      answer:
        "Our goal is to provide an end-to-end service. Packages typically include the full cost of the procedure (surgeon fees, anesthesia, hospital stay), airport transfers, local transportation for appointments, accommodation coordination, and a dedicated personal care manager.",
    },
    {
      question: "How long is the recovery period abroad?",
      answer:
        "The required stay varies by procedure. For minor surgeries, it might be a few days, while complex treatments could require 3-4 weeks. We provide a detailed, personalized timeline during your initial consultation, ensuring a safe recovery before you travel home.",
    },
  ];

  const handleToggle = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Title and Subtitle for better context */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Your Questions, Answered
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Everything you need to know before starting your medical journey.
            </p>
          </div>

          {/* Mapping the cards with a gap between them */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
