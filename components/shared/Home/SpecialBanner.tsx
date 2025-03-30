"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import SpecialBannerImage from "@/public/assets/images/SI-Banner.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const SpecialBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Track when element is in view
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

  return (
    <div 
      ref={containerRef}
      className="mx-auto my-12 w-full max-w-7xl px-4 sm:px-6 md:px-8"
    >
      <motion.div 
        className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center justify-between gap-8 p-6 lg:flex-row lg:p-12">
          {/* Image Container */}
          <div className="flex w-full max-w-lg items-center justify-center lg:w-1/2">
            <motion.div 
              className="w-full"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="relative">
                {/* Subtle shadow for depth */}
                <div className="absolute -bottom-4 left-0 right-0 h-4 w-full translate-y-2 blur-xl opacity-30"></div>
                
                {/* Main image */}
                <Image
                  src={SpecialBannerImage}
                  alt="International Seminar"
                  className="h-auto w-full rounded-lg object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
          
          {/* Content Container */}
          <div className="flex w-full flex-col items-center space-y-6 text-center lg:w-1/2 lg:items-start lg:text-left">
            <motion.span 
              className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-wider text-pink-200 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Special Event
            </motion.span>
            
            <motion.h2 
              className="font-bungee text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              International<br />Seminar
            </motion.h2>
            
            <motion.p 
              className="max-w-md text-lg text-indigo-100"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Explore groundbreaking topics and network with global experts at our exclusive international seminar. Join us for insightful discussions.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-2"
            >
              <Link href="/activities/international-seminar">
                <Button className="bg-white px-8 py-3 text-lg font-medium text-indigo-900 transition-all hover:bg-opacity-90">
                  See More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative bottom stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-pink-500 to-indigo-500"></div>
      </motion.div>
    </div>
  );
};

export default SpecialBanner;