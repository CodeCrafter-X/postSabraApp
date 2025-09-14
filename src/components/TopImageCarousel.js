'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const TopImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [progress, setProgress] = useState(0);

  // Images from public/campus/ folder
  const images = [
    {
      src: '/campus/campus1.jpg',
      alt: 'SUSL Main Campus Building',
    },
    {
      src: '/campus/campus2.jpg',
      alt: 'SUSL Academic Complex',
    },
    {
      src: '/campus/campus3.jpg',
      alt: 'SUSL Library and Research Center',
    },
    {
      src: '/campus/campus4.jpg',
      alt: 'SUSL Student Activities',
    },
    {
      src: '/campus/campus5.jpg',
      alt: 'SUSL Natural Campus Environment',
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setProgress(0); // Reset progress when image changes
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 0.25; // Increment progress every 10ms for smooth animation
      });
    }, 10); // Update progress every 10ms

    return () => clearInterval(progressInterval);
  }, [currentImage]);

  return (
    <div className="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden">
      {/* Background Images with fade animation */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0} // Only priority for first image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div className="relative z-10 px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            Sabaragamuwa University
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl opacity-90 drop-shadow-md mb-6">
            Official Notice Board
          </p>
          <p className="text-lg md:text-xl opacity-80 drop-shadow-sm">
            Stay updated with the latest campus announcements and events
          </p>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImage(index);
              setProgress(0);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/30">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{ 
            width: `${progress}%`
          }}
        />
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => {
          setCurrentImage((currentImage - 1 + images.length) % images.length);
          setProgress(0);
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all z-20"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => {
          setCurrentImage((currentImage + 1) % images.length);
          setProgress(0);
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all z-20"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default TopImageCarousel;