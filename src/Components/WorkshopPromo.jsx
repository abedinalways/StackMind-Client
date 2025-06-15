import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import mascot from '../assets/mascot.png'
import { Link, useNavigate } from 'react-router';
import { FaLocationArrow } from 'react-icons/fa';
const WorkshopPromo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-gradient-to-b from-orange-400 to-orange-200 text-white py-10 px-4 md:px-20 text-center relative overflow-hidden font-[sora]">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="uppercase tracking-wider text-sm font-semibold"
        >
          Winter 2025-2026 • New Workshops
        </motion.p>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold my-4 py-6">
          <Typewriter
            words={['Boost Your Skills Online, On Front-End, Design & UX']}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/90 max-w-2xl mx-auto mb-6"
        >
          Meet{' '}
          <span
            onClick={() => navigate('/featuredBlogs')}
            className=" underline cursor-pointer font-bold text-red-950 text-xl"
          >
            StackMind Workshops
          </span>{' '}
          , with practical, actionable insights from experts — live. With
          interactive exercises, slides, video recordings and a friendly Q&A.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/blogs" className="btn mb-3 text-base font-bold flex items-center w-80 underline mx-auto">
            Explore all speakers and topics <FaLocationArrow />
          </Link>
        </motion.div>

        {/* Mascot Image */}
        <img
          src={mascot}
          alt="Mascot"
          className="w-40 mx-auto p-4 border bg-gray-100 shadow-5xl rounded-full drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default WorkshopPromo;