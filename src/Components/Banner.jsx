import React from 'react';
import { motion } from 'framer-motion';
import image from '../assets/image.jpeg';

const Banner = () => {
  return (
    <div
      className="hero md:min-h-[80vh]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-neutral-content text-center">
        <motion.div
          className="max-w-xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="mb-5 text-4xl md:text-6xl font-bold font-[Suse]"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Fuel Your Mind with Quality Blogs
          </motion.h1>

          <motion.p
            className="mb-5 font-[mulish] font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover insightful articles and stories to inspire and inform.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label className="input bg-white text-red-500 font-bold shadow-2xl rounded-lg  w-88 h-12 md:w-120 md:h-16 flex items-center gap-2 px-4 mx-auto">
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
                className="bg-transparent outline-none w-full text-black placeholder-red-400"
              />
            </label>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
