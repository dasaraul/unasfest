"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight, Calendar, Clock } from "lucide-react";
import { timelinesHome } from "@/constants/Timeline";

const TimelineEvent = ({ event, index, isActive, onClick }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  
  // Use date directly from the event object without parsing
  // This prevents "Invalid Date" issues when the format is non-standard
  const displayDate = event.date;
  
  // Extract month and day display if needed
  // Using a simple approach that doesn't rely on Date parsing
  const month = event.month || "Dec"; // Default or from data
  const day = event.day || index + 1; // Default or from data
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative flex cursor-pointer ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} items-center md:mx-0`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(index)}
    >
      {/* Date Circle */}
      <div
        className={`z-10 flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-full ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-lg' 
            : 'bg-indigo-100 text-indigo-900'
        } transition-all duration-300 md:h-20 md:w-20`}
      >
        <span className="text-xs font-bold uppercase md:text-sm">{month}</span>
        <span className="text-xl font-bold md:text-2xl">{day}</span>
      </div>
      
      {/* Line connector */}
      <div className="absolute left-1/2 top-8 z-0 h-full w-0.5 -translate-x-1/2 bg-indigo-200 md:top-10"></div>
      
      {/* Content card */}
      <motion.div 
        className={`relative mx-4 w-full max-w-md rounded-xl ${
          isActive 
            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg' 
            : 'bg-white text-gray-800 shadow'
        } p-6 transition-all duration-300 md:mx-8`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Status indicator */}
        <div className="absolute -right-2 -top-2 rounded-full bg-white p-1">
          <CheckCircle2 
            className={`h-5 w-5 ${
              index < 2 // Example logic for completed events
                ? 'text-green-500' 
                : 'text-gray-300'
            }`} 
          />
        </div>
        
        <h3 className="mb-2 font-bungee text-lg md:text-xl">{event.title}</h3>
        
        <div className="mb-4 mt-3 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
            <Calendar className="h-3 w-3" />
            <span>{displayDate}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
              <Clock className="h-3 w-3" />
              <span>{event.time}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm opacity-90 md:text-base">{event.description}</p>
        
        {event.link && (
          <a 
            href={event.link}
            className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${
              isActive ? 'text-white' : 'text-indigo-600'
            }`}
          >
            Learn More <ArrowRight className="h-3 w-3" />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
};

const Timeline = () => {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [timelines, setTimelines] = useState(timelinesHome || []);
  
  // Use raw data without sorting
  useEffect(() => {
    setTimelines(timelinesHome);
  }, []);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden py-24"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-indigo-50/50"></div>
      <motion.div 
        className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl"
        style={{ y }}
      ></motion.div>
      <motion.div 
        className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      ></motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium uppercase tracking-wider text-indigo-800">
            Event Schedule
          </span>
          <h2 className="mt-4 font-bungee text-3xl uppercase text-indigo-900 sm:text-4xl md:text-5xl">
            Activity Timeline
          </h2>
          <p className="mt-6 text-gray-600">
            Pay attention to the time and date to make sure you don't miss any of our exciting events!
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative mx-auto max-w-6xl pb-20">
          {/* Center line for large screens */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-indigo-200 md:block"></div>
          
          {/* Timeline events */}
          <div className="space-y-16 md:space-y-24">
            {timelines.map((timeline, index) => (
              <TimelineEvent
                key={index}
                event={timeline}
                index={index}
                isActive={activeEventIndex === index}
                onClick={setActiveEventIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;