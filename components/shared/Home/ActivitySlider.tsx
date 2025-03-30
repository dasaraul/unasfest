"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Prop = {
  index: number;
  image: string;
  name: string;
  path: string;
};

type Props = Prop[];

type PropsTypes = {
  props: Props;
};

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

const ActivityCard = ({ item }: { item: Prop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  
  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -8;
    const rotationY = (offsetX / (rect.width / 2)) * 8;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    scale.set(1.05);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="relative h-full w-full overflow-visible [perspective:800px]"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={item.path}>
        <motion.div
          className="relative h-full [transform-style:preserve-3d]"
          style={{
            rotateX,
            rotateY,
            scale,
          }}
        >
          <Card className="h-full overflow-hidden rounded-xl border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardContent className="flex h-full flex-col justify-between p-0">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={650}
                  className="h-auto w-full object-contain"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="font-bungee text-xl font-medium text-white">{item.name}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const ActivitySlider: React.FC<PropsTypes> = ({ props }) => {
  const [slidesPerView, setSlidesPerView] = useState<number | "auto">("auto");
  
  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-bungee text-3xl uppercase text-indigo-900">
            Event Activities
          </h2>
          <p className="mt-1 text-gray-600">
            Explore our exciting competitions and events
          </p>
        </div>
        
        <div className="hidden sm:flex">
          <button className="navigation-prev mr-2 rounded-full bg-indigo-100 p-2 text-indigo-900 transition-all hover:bg-indigo-200">
            <ChevronLeft size={24} />
          </button>
          <button className="navigation-next rounded-full bg-indigo-100 p-2 text-indigo-900 transition-all hover:bg-indigo-200">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={20}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 25,
          },
          1440: {
            slidesPerView: 4.2,
            spaceBetween: 30,
          },
        }}
        navigation={{
          nextEl: ".navigation-next",
          prevEl: ".navigation-prev",
        }}
        modules={[Pagination, Navigation]}
        className="activity-swiper !overflow-visible px-1 py-4"
      >
        {props.map((item) => (
          <SwiperSlide key={item.index} className="!h-auto">
            <div className="h-full pb-10 pt-2">
              <ActivityCard item={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="mt-4 flex items-center justify-center md:justify-start">
        <div className="custom-pagination"></div>
        
        <div className="ml-4 flex sm:hidden">
          <button className="navigation-prev mr-2 rounded-full bg-indigo-100 p-2 text-indigo-900">
            <ChevronLeft size={20} />
          </button>
          <button className="navigation-next rounded-full bg-indigo-100 p-2 text-indigo-900">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivitySlider;