"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import agricinema from "@/public/assets/images/home/moviePosters/PosterSinarSuryauntukHarapanPetanicompressed_page-0001.jpg";
import dibalikkandang from "@/public/assets/images/home/moviePosters/PosterDiBalikKandangPolimedia_page-0001.jpg";
import greenbusiness from "@/public/assets/images/home/moviePosters/PosterChargeTheSunTelkomUniversityJakarta_page-0001.jpg";
import Link from "next/link";
import { ExternalLink, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";

// Import config from config.ini (you would need to set this up)
import { ANIMATION_SETTINGS } from "@/config";

const FinalistCard = ({ image, title, team, link, isActive = false }) => {
  return (
    <motion.div 
      className={`group relative flex w-full flex-col gap-4 ${isActive ? 'z-10' : 'opacity-80'}`}
      whileHover={{ scale: isActive ? 1.02 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={link}>
        <div className="relative mx-auto w-full overflow-hidden rounded-xl bg-[#f8f5e6] p-2 shadow-md transition-all hover:shadow-xl sm:p-3">
          <div className="relative">
            {/* Using object-contain to ensure the poster is shown completely without cropping */}
            <div className="relative h-auto w-full">
              <Image
                src={image}
                alt={title}
                width={350}
                height={525}
                className="h-auto w-full object-contain"
              />
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-indigo-900/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
              <motion.div 
                className="flex items-center justify-center gap-2 rounded-full bg-[#f8f5e6] px-4 py-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-5 w-5 fill-indigo-900 text-indigo-900" />
                <span className="text-sm font-semibold text-indigo-900">Watch Movie</span>
              </motion.div>
            </div>
          </div>
          
          {/* Title and team info below the poster */}
          <div className="mt-3 p-1 text-center">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{team}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const FinalisSMC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  const finalists = [
    {
      image: agricinema,
      title: "Sinar Surya untuk Harapan Petani",
      team: "Agricinema",
      link: "https://youtu.be/X_Q9og7gHtA"
    },
    {
      image: dibalikkandang,
      title: "Di Balik Kandang",
      team: "Politeknik Negeri Media Kreatif Jakarta",
      link: "https://drive.google.com/file/d/1p4I995Havbhyiyy7FPUPnMRTLthf_XCg/view?usp=sharing"
    },
    {
      image: greenbusiness,
      title: "Charge The Sun",
      team: "Green Business",
      link: "https://youtu.be/4_eYDbkEZ4M?si=hnfjYMAsmGLV6-WA"
    }
  ];

  // Intersection observer to check when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Handle next/prev navigation
  const handleNext = () => {
    setActiveIndex((prev) => (prev === finalists.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? finalists.length - 1 : prev - 1));
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-16"
    >
      {/* Changed background to match ActivitySlider's styling */}
      <div className="absolute inset-0 -z-10 bg-cream"></div>
      
      <div className="container">
        {/* Header with styling similar to ActivitySlider */}
        <motion.div 
          className="mb-12 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-bungee text-3xl uppercase text-indigo-900 sm:text-4xl">
            Finalist Short Movie Competition
          </h2>
          <p className="mt-1 text-gray-600">
            3 finalists with the best short movies
          </p>
        </motion.div>

        {/* Navigation buttons similar to ActivitySlider */}
        <div className="mb-6 flex items-center justify-between">
          <div></div>
          <div className="hidden sm:flex">
            <button 
              onClick={handlePrev}
              className="mr-2 rounded-full bg-indigo-100 p-2 text-indigo-900 transition-all hover:bg-indigo-200"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext}
              className="rounded-full bg-indigo-100 p-2 text-indigo-900 transition-all hover:bg-indigo-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Mobile View (Stack) */}
        <div className="md:hidden">
          <motion.div 
            className="flex flex-col gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {finalists.map((finalist, index) => (
              <div key={index} className="w-full max-w-sm mx-auto">
                <FinalistCard {...finalist} isActive={true} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Tablet/Desktop View (Side by Side) */}
        <motion.div 
          className="hidden md:block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {finalists.map((finalist, index) => (
              <div key={index} className="w-full">
                <FinalistCard {...finalist} isActive={true} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile navigation buttons - similar to ActivitySlider */}
        <div className="mt-4 flex items-center justify-center md:justify-start">
          <div className="ml-4 flex sm:hidden">
            <button 
              onClick={handlePrev}
              className="mr-2 rounded-full bg-indigo-100 p-2 text-indigo-900"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="rounded-full bg-indigo-100 p-2 text-indigo-900"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalisSMC;