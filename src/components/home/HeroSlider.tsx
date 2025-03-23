"use client";

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';
import Link from 'next/link';

// Slider images from the site
const sliderImages = [
  {
    src: "https://ext.same-assets.com/2516256495/2266562338.jpeg",
    alt: "Krixies Shop Slide 1",
    link: "/category/dress"
  },
  {
    src: "https://ext.same-assets.com/2516256495/1256189392.jpeg",
    alt: "Krixies Shop Slide 2",
    link: "/category/dress"
  },
  {
    src: "https://ext.same-assets.com/2516256495/3370248854.jpeg",
    alt: "Krixies Shop Slide 3",
    link: "/category/dress"
  },
  {
    src: "https://ext.same-assets.com/2516256495/2708821348.jpeg",
    alt: "Krixies Shop Slide 4",
    link: "/category/dress"
  },
  {
    src: "https://ext.same-assets.com/2516256495/4200946407.jpeg",
    alt: "Krixies Shop Slide 5",
    link: "/category/dress"
  }
];

const HeroSlider = () => {
  return (
    <div className="w-full relative">
      <Carousel opts={{ loop: true, align: 'start' }} className="w-full">
        <CarouselContent>
          {sliderImages.map((slide, index) => (
            <CarouselItem key={index}>
              <Link href={slide.link}>
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    className="object-cover object-center"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 lg:left-4" />
        <CarouselNext className="right-2 lg:right-4" />
      </Carousel>
    </div>
  );
};

export default HeroSlider;
