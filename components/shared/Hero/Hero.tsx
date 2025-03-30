"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import mascotgroup from "@/public/assets/images/mascots/mascots.png";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white py-16">
      {/* Subtle background elements to add some visual interest */}
      <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-indigo-100 blur-3xl"></div>
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-indigo-50 blur-3xl"></div>
      
      <div className="container relative z-10 flex flex-col items-center gap-12 md:flex-row">
        {/* Left section - Text Content */}
        <div className="w-full space-y-6 text-center md:w-1/2 md:text-left">
          <div className="inline-block rounded-full bg-indigo-100 px-4 py-1">
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-900">UNAS FEST 2024</span>
          </div>
          
          <motion.h1 
            className="font-bungee text-4xl font-bold uppercase leading-tight tracking-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-indigo-900">Sign Up Now</span>
            <span className="block text-indigo-700">for the competition</span>
          </motion.h1>
          
          <motion.p 
            className="mx-auto text-lg text-gray-600 font-medium md:mx-0 md:w-11/12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            The Universitas Nasional Festival 2024 (UNAS FEST 2024) is one of the
            annual events held to commemorate and celebrate the 75th anniversary
            of Dies Natalis Universitas Nasional.
          </motion.p>
          
          <motion.div 
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="#activity-slider-section">
              <Button className="group relative h-14 w-full overflow-hidden rounded-lg bg-indigo-900 text-lg font-medium uppercase tracking-wide text-white transition-all hover:bg-indigo-800 hover:shadow-lg hover:shadow-indigo-900/20 sm:w-auto sm:px-8">
                <span className="relative z-10">Explore Events</span>
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Right section - Image */}
        <motion.div 
          className="relative w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Decorative circle behind mascot */}
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100 blur-md"></div>
          
          <motion.div 
            className="relative mx-auto w-4/5"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={mascotgroup}
              alt="UNAS FEST 2024 Mascots"
              width={500}
              height={400}
              className="h-auto w-full drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom decorative wave - keeping this for visual separation */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#f8f5e6"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,128C672,117,768,139,864,144C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;