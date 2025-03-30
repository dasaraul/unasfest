"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Prop = {
  icon: string;
  text: string;
};

type PropType = {
  props: Prop;
};

const InfiniteSlidingComponent: React.FC<PropType> = ({ props }) => {
  // Create multiple items with different animations
  const announcements = [
    { id: 1, text: props.text, icon: props.icon },
    { id: 2, text: "Register Now!", icon: props.icon },
    { id: 3, text: "Prizes Worth 20M+", icon: props.icon },
    { id: 4, text: "Join The Community", icon: props.icon },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Auto-advance timer
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isHovered, announcements.length]);
  
  // Handle manual navigation
  const goToAnnouncement = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div 
        className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-900 to-indigo-800 shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background elements */}
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-pink-500/20 blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col items-center px-4 py-3 sm:flex-row sm:justify-between sm:py-4 md:px-6">
          {/* Left side: Animated announcements */}
          <div className="relative h-12 w-full overflow-hidden sm:w-3/4 md:h-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex h-full items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md sm:h-10 sm:w-10 md:h-12 md:w-12">
                    <Image
                      src={announcements[currentIndex].icon}
                      alt="icon"
                      width={40}
                      height={40}
                      className="h-5 w-5 object-contain sm:h-6 sm:w-6 md:h-7 md:w-7"
                    />
                  </div>
                  <span className="font-bungee text-lg font-medium text-white sm:text-xl md:text-2xl">
                    {announcements[currentIndex].text}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right side: Navigation dots + CTA button */}
          <div className="mt-2 flex items-center gap-3 sm:mt-0">
            {/* Navigation dots */}
            <div className="hidden items-center space-x-1.5 sm:flex">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToAnnouncement(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? "bg-white" 
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Announcement ${index + 1}`}
                />
              ))}
            </div>
            
            {/* CTA Button - only on larger screens */}
            <a
              href="#register"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-900 shadow-md transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg sm:block md:px-5 md:py-2.5 md:text-base"
            >
              Register Now
            </a>
          </div>
        </div>
        
        {/* Mobile navigation dots */}
        <div className="flex items-center justify-center space-x-1.5 border-t border-white/10 pb-2 pt-2 sm:hidden">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => goToAnnouncement(index)}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "bg-white" 
                  : "bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Announcement ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteSlidingComponent;