"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Konstanta
const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const GAP = 32;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

// FAQ data
const faqsData = [
  {
    question: "How do I register for the competition of UNAS FEST?",
    answer: "Visit the caturnawa.unasfest.com, choose one of the Competition 'Kompetisi Debat Bahasa Indonesia', click 'Register Now', fill the form, review, and make the payment",
    category: "Registration"
  },
  {
    question: "How do I register for the competition of UNAS FEST?",
    answer: "Click the posters at the top of the homepage to register for the competition or click the 'Register' button on the activity page",
    category: "Registration"
  },
  {
    question: "How much is the registration fee for the UNAS FEST competition?",
    answer: "The registration fees vary across competitions, starting from Rp 300,000 to Rp 550,000",
    category: "Fees"
  },
  {
    question: "What is the deadline for registration for the UNAS FEST competition?",
    answer: "The deadline for registration for the Kompetisi Debat Bahasa Indonesia (KDBI) is August 30, 2024.",
    category: "Deadlines"
  },
  {
    question: "When will the winners be announced?",
    answer: "The winners will be announced on October 17, 2024, after the final round sessions",
    category: "Results"
  },
  {
    question: "Where can I see the winner announcement?",
    answer: "The winner announcement will be available on this caturnawa.unasfest.com",
    category: "Results"
  },
  {
    question: "Is there an age limit for participants?",
    answer: "Yes, participants must be university students between 18-25 years old with a valid student ID.",
    category: "Eligibility"
  },
  {
    question: "Can international students participate?",
    answer: "Yes, international students enrolled in Indonesian universities are eligible to participate.",
    category: "Eligibility"
  },
  {
    question: "How many team members are allowed for each competition?",
    answer: "The team size varies by competition. For debates, 3-5 members are allowed. For short film competitions, teams can have up to 8 members.",
    category: "Teams"
  },
  {
    question: "Are there any accommodation arrangements for participants?",
    answer: "Participants are responsible for their own accommodation. However, we provide a list of recommended hotels near the venue with special rates for UNAS FEST participants.",
    category: "Logistics"
  }
];

const Faq = ({ title }) => {
  // State dasar
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(600);
  
  // Referensi dan motion values
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  // Menyesuaikan ukuran berdasarkan layar
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setItemWidth(window.innerWidth - 64);
      } else if (window.innerWidth < 1024) {
        setItemWidth(600);
      } else {
        setItemWidth(650);
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Track offset
  const trackItemOffset = itemWidth + GAP;

  // Fungsi navigasi
  const goNext = () => {
    if (currentIndex < faqsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  
  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(faqsData.length - 1);
    }
  };
  
  // Drag handling
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      goNext();
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      goPrev();
    }
  };

  // Handle touch for swipe
  const handleTouchStart = useRef({ x: 0 });
  const handleTouchMove = useRef({ x: 0 });
  
  const touchStart = (e) => {
    handleTouchStart.current.x = e.touches[0].clientX;
  };
  
  const touchMove = (e) => {
    handleTouchMove.current.x = e.touches[0].clientX;
  };
  
  const touchEnd = () => {
    const diff = handleTouchStart.current.x - handleTouchMove.current.x;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden py-20 bg-gradient-to-b from-indigo-50/50 to-white"
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
    >
      <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-indigo-100/40 blur-3xl"></div>
      <div className="absolute bottom-40 -right-20 w-64 h-64 rounded-full bg-purple-100/30 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-4 py-1 text-sm font-medium uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bungee uppercase text-indigo-900">
            {title || "Frequently Asked Questions"}
          </h2>
          <p className="mt-6 text-gray-600">
            Geser ke kiri atau kanan untuk melihat pertanyaan dan jawaban lainnya
          </p>
        </motion.div>

        {/* Carousel FAQ */}
        {faqsData.length > 0 ? (
          <div className="relative">
            <div 
              className="relative mx-auto overflow-hidden"
              style={{ width: `${itemWidth}px` }}
            >
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ 
                  left: -trackItemOffset * (faqsData.length - 1), 
                  right: 0 
                }}
                style={{
                  width: itemWidth,
                  gap: `${GAP}px`,
                  x,
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(currentIndex * trackItemOffset) }}
                transition={SPRING_OPTIONS}
              >
                {faqsData.map((faq, index) => {
                  // Efek 3D untuk setiap item
                  const range = [
                    -(index + 1) * trackItemOffset,
                    -index * trackItemOffset,
                    -(index - 1) * trackItemOffset,
                  ];
                  const outputRange = [5, 0, -5]; // Subtle rotation
                  const rotateY = useTransform(x, range, outputRange, { clamp: false });
                  
                  // Efek scale untuk current item
                  const scaleRange = [
                    -(index + 0.5) * trackItemOffset,
                    -index * trackItemOffset,
                    -(index - 0.5) * trackItemOffset,
                  ];
                  const scaleOutput = [0.9, 1, 0.9];
                  const scale = useTransform(x, scaleRange, scaleOutput, { clamp: false });
                  
                  // Efek opacity untuk item di luar view
                  const opacityRange = [
                    -(index + 1) * trackItemOffset,
                    -index * trackItemOffset,
                    -(index - 1) * trackItemOffset,
                  ];
                  const opacityOutput = [0.5, 1, 0.5];
                  const opacity = useTransform(x, opacityRange, opacityOutput, { clamp: false });
                  
                  return (
                    <motion.div
                      key={index}
                      className="flex-shrink-0 bg-indigo-600 text-white rounded-xl shadow-lg overflow-hidden"
                      style={{
                        width: itemWidth,
                        rotateY,
                        scale,
                        opacity,
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div className="flex flex-col h-full p-6 md:p-8">
                        <div className="flex items-start gap-2 mb-4">
                          <span className="text-2xl">&ldquo;</span>
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold mb-4">
                              {faq.question}
                            </h3>
                            
                            <p className="text-base text-white/90">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                        
                        {faq.category && (
                          <span className="mt-auto self-end inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                            {faq.category}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
            
            {/* Navigasi */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-indigo-50 transition-all"
                aria-label="Pertanyaan sebelumnya"
              >
                <ChevronLeft className="w-5 h-5 text-indigo-700" />
              </button>
              
              <div className="flex items-center space-x-1">
                {faqsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === index ? "w-8 bg-indigo-600" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Pertanyaan ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-indigo-50 transition-all"
                aria-label="Pertanyaan berikutnya"
              >
                <ChevronRight className="w-5 h-5 text-indigo-700" />
              </button>
            </div>
            
            {/* Instruksi drag */}
            <div className="mt-4 text-center text-sm text-gray-500">
              Swipe atau drag untuk navigasi
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tidak ada pertanyaan
            </h3>
            <p className="text-gray-600">
              Tidak ada pertanyaan untuk ditampilkan saat ini.
            </p>
          </div>
        )}

        {/* CTA Bantuan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl mx-auto mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            Masih punya pertanyaan?
          </h3>
          <p className="mb-6">
            Belum menemukan jawaban yang Anda cari? Silakan hubungi tim bantuan kami.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-indigo-700 font-medium rounded-full px-6 py-3 shadow-md hover:bg-indigo-50 transition-all"
          >
            Hubungi Kami
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;