"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";

// Import icons
import certificate from "@/public/assets/images/home/certificate.png";
import money from "@/public/assets/images/home/money.png";
import merch from "@/public/assets/icons/benefit/merch.png";
import trophy from "@/public/assets/icons/benefit/trophy.png";
import plaque from "@/public/assets/icons/benefit/plaque.png";

const benefitData = [
  {
    icon: certificate,
    label: "Certificate & E-Certificate",
    description: "Receive official recognition of your participation and achievement"
  },
  {
    icon: money,
    label: "Cash Prize",
    description: "Win attractive cash prizes for your exceptional performance"
  },
  {
    icon: trophy,
    label: "Trophy",
    description: "Take home a prestigious trophy symbolizing your success"
  },
  {
    icon: plaque,
    label: "Plaque",
    description: "Display your accomplishment with a commemorative plaque"
  },
  {
    icon: merch,
    label: "Exclusive Merch",
    description: "Get exclusive UNAS FEST merchandise as a participant"
  }
];

const BenefitCard = ({ icon, label, description, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white p-1 shadow-lg transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ translateY: -10 }}
    >
      {/* Card background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50 opacity-80"></div>
      
      {/* Decorative elements */}
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-amber-400/10"></div>
      <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-amber-500/10"></div>
      
      <div className="relative flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        {/* Icon with animated background */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <motion.div 
            className="absolute inset-0 rounded-full bg-amber-100"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut"
            }}
          />
          <Image
            src={icon}
            alt={label}
            width={80}
            height={80}
            className="relative z-10 h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        {/* Label */}
        <h3 className="font-bungee text-lg text-amber-900 md:text-xl">
          {label}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-amber-700">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Benefit = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <div ref={containerRef} className="relative py-24">
      {/* Background with pattern and gradient */}
      <div className="absolute inset-0 bg-amber-400 opacity-10">
        <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] bg-repeat opacity-20"></div>
      </div>
      
      {/* Top wave */}
      <div className="absolute left-0 right-0 top-0 h-12 overflow-hidden">
        <svg
          className="absolute bottom-0 h-12 w-full fill-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block rounded-full bg-amber-200 px-4 py-1 text-sm font-medium uppercase tracking-wider text-amber-800">
            Why Join Us
          </span>
          <h2 className="mt-4 font-bungee text-3xl uppercase text-amber-900 sm:text-4xl md:text-5xl">
            Benefits of the UNAS FEST 2024 Competition
          </h2>
          <p className="mt-6 text-amber-800">
            Participate in UNAS FEST 2024 competitions and enjoy these amazing benefits
          </p>
        </motion.div>
        
        {/* Benefit Cards - Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {benefitData.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              label={benefit.label}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
        <svg
          className="absolute top-0 h-12 w-full fill-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" transform="rotate(180)"></path>
        </svg>
      </div>
    </div>
  );
};

export default Benefit;