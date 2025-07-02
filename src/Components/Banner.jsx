import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = () => {
  
  const bannerData = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1200&h=800&fit=crop',
      title: 'Fuel Your Mind with Quality Blogs',
      subtitle:
        'Discover insightful articles and stories to inspire and inform.',
      gradient: 'from-purple-900/70 to-blue-900/70',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop',
      title: 'Technology & Innovation',
      subtitle: 'Explore the latest trends in tech and digital transformation.',
      gradient: 'from-indigo-900/70 to-cyan-900/70',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
      title: 'Creative Writing Hub',
      subtitle:
        'Unleash your creativity with our writing tips and inspiration.',
      gradient: 'from-pink-900/70 to-rose-900/70',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop',
      title: 'Business & Growth',
      subtitle: 'Strategic insights for entrepreneurs and business leaders.',
      gradient: 'from-emerald-900/70 to-teal-900/70',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % bannerData.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [bannerData.length, isAutoPlaying]);

  const goToSlide = index => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % bannerData.length);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + bannerData.length) % bannerData.length);
  };

  const currentBanner = bannerData[currentIndex];

  return (
    <div
      className="relative hero md:min-h-[80vh] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Images with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner.id}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${currentBanner.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <motion.div
        key={`gradient-${currentBanner.id}`}
        className={`absolute inset-0 bg-gradient-to-r ${currentBanner.gradient}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Main Content */}
      <div className="hero-content text-neutral-content text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner.id}
            className="max-w-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.h1
              className="mb-5 text-4xl md:text-6xl font-bold font-[Suse] drop-shadow-2xl"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {currentBanner.title}
            </motion.h1>

            <motion.p
              className="mb-8 font-[mulish] font-bold text-lg drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {currentBanner.subtitle}
            </motion.p>

            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <label className="input bg-white/95 backdrop-blur-sm text-red-500 font-bold shadow-2xl rounded-lg w-88 h-12 md:w-96 md:h-16 flex items-center gap-2 px-4 mx-auto hover:bg-white transition-all duration-300">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="text"
                  name="search"
                  required
                  placeholder="Search Articles..."
                  className="bg-transparent outline-none w-full text-black placeholder-red-400 font-medium"
                />
              </label>
            </motion.form>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          key={currentIndex}
          transition={{ duration: 4, ease: 'linear' }}
        />
      </div>

      
    </div>
  );
};

export default Banner;
