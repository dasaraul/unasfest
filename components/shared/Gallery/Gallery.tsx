"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { CirclePlay, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// Import images
import imgBottom from "@/public/assets/images/gallery/videotron-kdbi.png";
import imgTopRight from "@/public/assets/images/gallery/kompetisi-debat.png";
import imgBottomRight from "@/public/assets/images/gallery/juara-lomba.png";
import imgTopLeft from "@/public/assets/images/gallery/videotron-kdbi2.png";

const ImageContainer = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  return (
    <motion.div 
      ref={ref}
      className="overflow-hidden rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const Gallery = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [hoveredImage, setHoveredImage] = useState(null);
  
  // Handle responsive hover state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHoveredImage(null);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div ref={containerRef} className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 grid grid-cols-12 gap-4">
        {/* Header */}
        <motion.div 
          className="col-span-12 mb-8 md:col-span-10 md:col-start-2"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-bungee text-3xl uppercase text-indigo-900 sm:text-4xl md:text-5xl">
            Memories Gallery
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Flashbacks of the Universitas Nasional Festival competition held from December 4, 2023 to December 20, 2023.
          </p>
        </motion.div>
        
        {/* Top Row - 3 Images */}
        <div className="col-span-12 md:col-span-4">
          <ImageContainer delay={0.1}>
            <div 
              className="group relative cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredImage('topLeft')}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <Image
                src={imgTopLeft}
                alt="UNAS FEST Event"
                className="h-auto w-full transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-indigo-900/60 opacity-0 transition-opacity duration-300 ${hoveredImage === 'topLeft' ? 'opacity-100' : ''}`}>
                <div className="flex h-full items-center justify-center">
                  <CirclePlay className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </ImageContainer>
        </div>
        
        <div className="col-span-6 md:col-span-4">
          <ImageContainer delay={0.2}>
            <div 
              className="group relative h-full cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredImage('topMiddle')}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <Image
                src={imgBottom}
                alt="UNAS FEST Event"
                className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-indigo-900/60 opacity-0 transition-opacity duration-300 ${hoveredImage === 'topMiddle' ? 'opacity-100' : ''}`}>
                <div className="flex h-full items-center justify-center">
                  <CirclePlay className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </ImageContainer>
        </div>
        
        <div className="col-span-6 md:col-span-4">
          <ImageContainer delay={0.3}>
            <div 
              className="group relative cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredImage('topRight')}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <Image
                src={imgTopRight}
                alt="UNAS FEST Event"
                className="h-auto w-full transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-indigo-900/60 opacity-0 transition-opacity duration-300 ${hoveredImage === 'topRight' ? 'opacity-100' : ''}`}>
                <div className="flex h-full items-center justify-center">
                  <CirclePlay className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </ImageContainer>
        </div>
        
        {/* Bottom Row - Text & Image */}
        <div className="col-span-12 mt-4 md:col-span-8">
          <ImageContainer delay={0.4}>
            <div 
              className="group relative cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredImage('bottomLeft')}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <Image
                src={imgBottomRight}
                alt="UNAS FEST Event"
                className="h-auto w-full transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-indigo-900/60 opacity-0 transition-opacity duration-300 ${hoveredImage === 'bottomLeft' ? 'opacity-100' : ''}`}>
                <div className="flex h-full items-center justify-center">
                  <CirclePlay className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </ImageContainer>
        </div>
        
        <div className="col-span-12 flex flex-col md:col-span-4">
          <motion.div 
            className="flex h-full flex-col justify-between rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 p-6 md:p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div>
              <h3 className="font-bungee text-2xl uppercase text-indigo-900 md:text-3xl">
                Let's Join <br /> UNAS FEST <br /> Competition
              </h3>
              <p className="mt-4 text-indigo-700">
                Be part of this exciting annual event and showcase your talents and skills
              </p>
            </div>
            
            <div className="mt-8">
              <p className="text-sm uppercase text-indigo-900">UNAS FEST 2024</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* View Gallery Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex justify-center md:justify-start"
      >
        <Link href="/gallery">
          <Button className="group flex items-center gap-2 bg-indigo-600 px-6 py-3 text-base font-medium uppercase hover:bg-indigo-700 md:text-lg">
            <span>View Full Gallery</span>
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
      
      {/* Background decorative elements */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-200/30 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-200/20 blur-3xl"></div>
    </div>
  );
};

export default Gallery;