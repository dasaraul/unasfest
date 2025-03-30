"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Phone, Mail } from "lucide-react";

import ContactImage from "@/public/assets/images/home/contactUs/homeContact.png";

const ContactItem = ({ icon: Icon, text, link, delay = 0 }) => {
  return (
    <motion.a
      href={link}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
        <Icon className="h-5 w-5" />
      </div>
      <span className="font-medium">{text}</span>
    </motion.a>
  );
};

const ContactHome = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  return (
    <div ref={containerRef} className="mx-auto mb-16 w-full max-w-screen-xl md:mb-24 lg:w-[90%]">
      <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-indigo-600 to-purple-700 p-0 shadow-2xl">
        <div className="relative">
          {/* Background image with overlay */}
          <div className="relative h-[220px] w-full sm:h-[280px] md:h-[320px] lg:h-[380px]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/80 to-purple-800/60 mix-blend-multiply"></div>
            <Image
              src={ContactImage}
              alt="Contact Us"
              className="h-full w-full object-cover opacity-90"
              fill
              sizes="100vw"
              priority
            />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="container px-6 sm:px-12 lg:px-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                {/* Left: Heading */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.7 }}
                  className="mb-8 max-w-xl md:mb-0 md:w-1/2"
                >
                  <h2 className="font-bungee text-3xl uppercase tracking-wide text-white md:text-4xl lg:text-5xl">
                    Can we help you?
                  </h2>
                  <p className="mt-4 text-lg text-white/90 md:text-xl">
                    Get in touch with our contact person and let us assist you with any questions about UNAS FEST 2024.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="https://wa.me/6285210637393">
                      <Button 
                        size="lg" 
                        className="group bg-white font-medium text-indigo-700 hover:bg-indigo-100"
                      >
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Contact Us
                        <motion.span 
                          className="ml-1 opacity-0 transition-all group-hover:ml-2 group-hover:opacity-100"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          →
                        </motion.span>
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* Right: Contact Methods */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="flex flex-col space-y-3 md:w-2/5"
                >
                  <ContactItem
                    icon={MessageSquare}
                    text="WhatsApp: +62 852-1063-7393"
                    link="https://wa.me/6285210637393"
                    delay={0.3}
                  />
                  <ContactItem
                    icon={Phone}
                    text="Call: +62 852-1063-7393"
                    link="tel:+6285210637393"
                    delay={0.4}
                  />
                  <ContactItem
                    icon={Mail}
                    text="Email: contact@unasfest.com"
                    link="mailto:contact@unasfest.com"
                    delay={0.5}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl"></div>
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"></div>
        </div>
      </Card>
    </div>
  );
};

export default ContactHome;